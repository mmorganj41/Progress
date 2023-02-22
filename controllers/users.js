import User from '../models/user.js'
import Skill from '../models/skill.js'
import Subskill from '../models/subskill.js';

import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;

import Habit from '../models/habit.js';
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
import {s3} from '../config/s3-config.js'

import { v4 as uuidv4 } from 'uuid';
import user from '../models/user.js';

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
  try {
    const usernameP = User.exists({username: req.body.username});
    const emailP = User.exists({email: req.body.email});

    const [username, email] = await Promise.all([usernameP, emailP])
    console.log(username, email);
    if (username) return res.status(400).json({err: 'Username taken.'});
    if (email) return res.status(400).json({err: 'Email taken.'});
  
    const user = await User.create(req.body);

    await createExampleSkill(user);

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    console.log(err);
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

// Create example skill tree when signup as a tutorial
async function createExampleSkill(user) {
  try {
    const skill = await Skill.create({
      name: "Example Skill (Click Me or Drag Me)"
    });

    user.skills.splice(0,0, skill);

    const habitPromiseSkill = Habit.create({
      name: "Example Skill Habit (Click me)",
      description: "Habits can associated with either skills (like this one) or subskills (see below). \
                    Habits have a variable difficulty, a start date, an end date, and a section to show \
                    whether they repeat or not. Click on the circle to complete or uncomplete a habit. \
                    Watch for a notification and for the experience bar to change",
      username: user._id,
      repeatDays: 1,
    });

    const habitPromiseSubskill = Habit.create({
      name: "Example Subkill Habit (Click me)",
      description: "You can toggle the ability to add, edit, or delete skills, subskills, and habits by \
                    using one of the three buttons above in the middle of the screen. To add a skill or \
                    filter, you can use the search bar. Try creating your own skills, subskills, or habits \
                    to track your journey. You can also rearrange skills by dragging.",
      username: user._id,
      repeatDays: 1,
    });

    const subskillPromise = Subskill.create({
      name: "Example Subskill",
    });

    const [_, subskill, habitSkill, habitSubskill] = await Promise.all([
      user.save(), subskillPromise, habitPromiseSkill, habitPromiseSubskill]);

    skill.habits.splice(0,0, habitSkill);
    skill.subskills.splice(0,0, subskill);
    subskill.habits.splice(0,0, habitSubskill);

    await Promise.all([skill.save(), subskill.save()]);
  } catch(err) {
    console.log("error creating example skill");
  }
}