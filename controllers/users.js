import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;

import S3 from 'aws-sdk/clients/s3.js';
import Habit from '../models/habit.js';
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
const s3 = new S3();


export default {
  signup,
  login,
  reorderSkills,
  profile
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

    const habits = await Habit.find({$match: {username: user._id, $or: last14DaysQuery}});
  
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

async function reorderSkills(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, 
      {skills: req.body.skills}, {new: true});

      console.log(user);
    return res.status(200).json({user})
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


