import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;

import S3 from 'aws-sdk/clients/s3.js';
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
const s3 = new S3();


export default {
  signup,
  login,
  reorderSkills,
};


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


