import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;

import S3 from 'aws-sdk/clients/s3.js';
import Habit from '../models/habit.js';
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
const s3 = new S3();

import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = process.env.BUCKET_NAME

export default {
  signup,
  login,
  reorderSkills,
  profile,
  editProfile,
  changePassword,
  search
};

async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
      .populate({
                path: 'skills',
                populate: [{
                    path: 'subskills',
                    model: 'Subskill',}]}).exec();
    // Then find all the posts that belong to that user
    if(!user) return res.status(404).json({error: 'User not found'})

    const days = {};
    const last14DaysQuery = [...new Array(14)].map((e, i) => {
      const dateString = new Date(Date.now() - 86400000*i).toISOString().split('T')[0];
      days[dateString] = [];
      const key = `completionDates.${dateString}`;
      return {[key]: true}
    }); 

    const habits = await Habit.find({username: user._id, $or: last14DaysQuery});
  
    for (let key in days) {
      habits.forEach(e => {
        if (e.completionDates.get(key) === true) days[key].push(e)});
    }


    res.status(200).json({data: days, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({username: req.body.username});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.findById(req.user._id);

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        user.update({password: req.body.password});
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad password'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function editProfile(req, res) {
  try {
    let user;
    if (req.file) {
            const filePath = `progress/profile/${uuidv4()}-${req.file.originalname}`;
            const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the actually from the form when it was sent to our express server
            // s3.upload is making the request to s3
            s3.upload(params, async function(err, data){ // < inside the function in the response from aws
                if(err){
                console.log('===============================')
                console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
                console.log('===============================')
                return;
                }
            

            user = await User.findByIdAndUpdate(req.user._id , {
              bio: req.body.bio,
              photoUrl: data.Location
            }, {new: true}).populate({
                path: 'skills',
                populate: [{
                    path: 'subskills',
                    model: 'Subskill',}]}).exec();
            const token = createJWT(user);

            res.status(200).json({user, token});
                  
          });
          
    } else {
      user = await User.findByIdAndUpdate(req.user._id, {
        bio: req.body.bio,
      }, {new: true}).populate({
                path: 'skills',
                populate: [{
                    path: 'subskills',
                    model: 'Subskill',}]}).exec();

      const token = createJWT(user);

      res.status(200).json({user, token});
    }

  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

async function reorderSkills(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, 
      {skills: req.body.skills}, {new: true});

    return res.status(200).json({user})
  } catch(err) {
    console.log(err);
    return res.status(401).json(err);
  }
}

async function search(req, res) {
  try {

    if (!req.query.username) res.status(200).json({users: []});

    const regex = new RegExp(req.query.username);

    const users = await User.find({username: {$regex: regex, $options: 'i'}}).populate('skills').exec();

    return res.status(200).json({users})
  } catch(err) {
    console.log(err);
    return res.status(401).json(err);
  }  
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}


