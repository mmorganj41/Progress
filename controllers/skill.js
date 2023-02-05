import User from '../models/user.js';
import Habit from '../models/habit.js';
import Skill from '../models/skill.js';
import Subskill from '../models/subskill.js';
import { experienceDictionary } from '../src/utils/leveling.js';

import S3 from 'aws-sdk/clients/s3.js';
// initialize the S3 constructor function to give us the object that can perform crud operations to aws
const s3 = new S3();

import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = process.env.BUCKET_NAME

export default {
    create,
    getUserSkills,
    createSubskill,
    createSkillHabit,
    createSubskillHabit,
    completeHabit, 
    uncompleteHabit,
    deleteSkill,
    deleteSubskill,
    deleteHabit,
    editSkill,
    editSubskill,
    editHabit,
};

async function create(req, res){
    try {
        const userPromise = User.findById(req.user._id);
        if (req.file) {
            
            const filePath = `progress/${uuidv4()}-${req.file.originalname}`;
            const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the actually from the form when it was sent to our express server
            // s3.upload is making the request to s3
            s3.upload(params, async function(err, data){ // < inside the function in the response from aws
                if(err){
                console.log('===============================')
                console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
                console.log('===============================')
                return;
                }
            
                const skillPromise = Skill.create({
                    name: req.body.name,
                    color: req.body.color,
                    photoUrl: data.Location
                });

                const [user, skill] = await Promise.all([userPromise, skillPromise]);

                user.skills.splice(0,0, skill);

                await user.save();
                res.status(201).json({skill});
            });
        } else {
                const skillPromise = Skill.create({
                    name: req.body.name,
                    color: req.body.color,
                });

                const [user, skill] = await Promise.all([userPromise, skillPromise]);

                user.skills.splice(0,0, skill);

                await user.save();
                res.status(201).json({skill});
        }        
    } catch(err) {
        console.log(err);
        res.status(400).json({err});
    }
}

async function getUserSkills(req, res) {
    try {
        const user = await User.findById(req.params.userId)
            .populate({
                path: 'skills',
                populate: [{
                    path: 'subskills',
                    model: 'Subskill',
                    populate: {
                        path: 'habits',
                        model: 'Habit'
                    }}, {
                        path: 'habits',
                         model: 'Habit'
                }]
            })
            .exec();

        res.status(200).json({skills: user.skills});
    } catch(err) {
        res.status(400).json({err});
    }
}

async function createSkillHabit(req, res) {
    try {
        const habitPromise = Habit.create({
            name: req.body.name,
            description: req.body.description,
            repeatDays: req.body.repeats ? req.body.repeatDays : 0,
            difficulty: req.body.difficulty,
            startDate: req.body.startDate,
            endDate: req.body.ends ? req.body.endDate : null,
            username: req.user._id,
        });

        const skillPromise = Skill.findById(req.params.skillId);

        const [skill, habit] = await Promise.all([skillPromise, habitPromise]);

        skill.habits.splice(0,0, habit);

        await skill.save();

        res.status(201).json({habit});
    } catch(err) {
        console.log(err);
        res.status(400).json({err});
    }
}

async function createSubskillHabit(req, res) {
    try {
        const habitPromise = Habit.create({
            name: req.body.name,
            description: req.body.description,
            repeatDays: req.body.repeats ? req.body.repeatDays : 0,
            difficulty: req.body.difficulty,
            startDate: req.body.startDate,
            endDate: req.body.ends ? req.body.endDate : null,
            username: req.user._id,
        })
        const subskillPromise = Subskill.findById(req.params.subskillId);

        const [subskill, habit] = await Promise.all([subskillPromise, habitPromise]);

        subskill.habits.splice(0,0, habit);

        await subskill.save();

        res.status(201).json({habit});
    } catch(err) {
        res.status(400).json({err});
    }
}

async function createSubskill(req, res) {
    try {
        const skillPromise = Skill.findById(req.params.skillId);
        const subskillPromise = Subskill.create({
            name: req.body.name,
        });

        const [skill, subskill] = await Promise.all([skillPromise, subskillPromise]);

        skill.subskills.splice(0,0, subskill);

        await skill.save();

        res.status(201).json({subskill});
    } catch(err) {
        console.log(err);
        res.status(400).json({err})
    }
}

async function completeHabit(req, res) {
    try {
        const habitP = Habit.findById(req.params.habitId);
        const skillP = Skill.findOne({'habits': req.params.habitId});
        const subskillP = Subskill.findOne({'habits': req.params.habitId});

        const [skill, subskill, habit] = await Promise.all([skillP, subskillP, habitP]);

        habit.completionDates.set(req.body.date, true);

        if (subskill) {
            const [skillNested] = await Promise.all([
                Skill.findOne({'subskills': subskill._id}),
                subskill.updateOne({$inc: {experience: experienceDictionary[habit?.difficulty]}}), 
            ])

            await skillNested.updateOne({$inc: {experience: experienceDictionary[habit?.difficulty]}});
        } else if (skill) {
            await skill.updateOne({$inc: {experience: experienceDictionary[habit?.difficulty]}})
        }      

        await habit.save();
        res.status(201).json({habit});
    } catch(err) {
        console.log(err);
        res.status(400).json({err})
    }
}

async function uncompleteHabit(req, res) {
    try {
        const habitP = Habit.findById(req.params.habitId);
        const skillP = Skill.findOne({'habits': req.params.habitId});
        const subskillP = Subskill.findOne({'habits': req.params.habitId});

        const [skill, subskill, habit] = await Promise.all([skillP, subskillP, habitP]);

        habit.completionDates.delete(req.body.date);

        if (subskill) {
            const [skillNested] = await Promise.all([
                Skill.findOne({'subskills': subskill._id}),
                subskill.updateOne({$inc: {experience: -experienceDictionary[habit?.difficulty]}}), 
            ])

            await skillNested.updateOne({$inc: {experience: -experienceDictionary[habit?.difficulty]}});
        } else if (skill) {
            await skill.updateOne({$inc: {experience: -experienceDictionary[habit?.difficulty]}})
        }      

        await habit.save();

        res.status(201).json({habit});
    } catch(err) {
        console.log(err);
        res.status(400).json({err})
    }
}

async function deleteSkill(req, res) {
    try {
        const skill = await Skill.findByIdAndRemove(req.params.skillId)

        if (skill.habits.length) {
            await Habit.deleteMany({"_id": {$in: skill.habits }});
        }
        
        if (skill.subskills.length) {
            const subskills = await Subskill.find({'_id': {$in: skill.subskills}});
            
            const habits = [];
            subskills.forEach(subskill => {
                if (subskill.habits.length) {
                    habits.push(Habit.deleteMany({"_id": {$in: subskill.habits}}));
                }
            });
            habits.push(Subskill.deleteMany({'_id': {$in: skill.subskills}}));
            await Promise.all(habits);

        }  User.findByIdAndUpdate(req.user._id, {$pull: {skill: skill._id}});
        await 

        res.status(201).json({skill});

    } catch(err) {
        console.log(err);
        res.status(400).json({err})
    }
}

async function deleteSubskill(req, res) {
    try {
        const subskill = await Subskill.findByIdAndRemove(req.params.subskillId);

        if (subskill.habits.length) {
            await Habit.deleteMany({"_id": {$in: subskill.habits }});
        }

        await Skill.findOneAndUpdate({subskills: subskill._id}, {$pull: {subskills: subskill._id}});
         
        res.status(201).json({subskill});

    } catch(err) {
        console.log(err);
        res.status(400).json({err})
    }
}

async function deleteHabit(req, res) {
    try {
        const habit = await Habit.findByIdAndRemove(req.params.habitId);

        const skillP = Skill.findOneAndUpdate({habits: habit._id}, {$pull: {habits: habit._id}});
        const subskillP = Skill.findOneAndUpdate({habits: habit._id}, {$pull: {habits: habit._id}});

        await Promise.all([skillP, subskillP]);

        res.status(201).json({habit});
    } catch(err) {
        console.log(err);
        res.status(400).json({err});
    }
}

async function editSkill(req, res) {
    try {
        let skill;
        if (req.file) {
            const filePath = `progress/${uuidv4()}-${req.file.originalname}`;
            const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the actually from the form when it was sent to our express server
            // s3.upload is making the request to s3
            s3.upload(params, async function(err, data){ // < inside the function in the response from aws
                if(err){
                console.log('===============================')
                console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
                console.log('===============================')
                return;
                }
                console.log('location', data.Location)
                skill = await Skill.findByIdAndUpdate(req.params.skillId,
                    {name: req.body.name,
                    color: req.body.color,
                    photoUrl: data.Location,
                    }, {new: true});
                console.log('skill', skill)
                res.status(201).json({skill});
            });

        } else {
            skill = await Skill.findByIdAndUpdate(req.params.skillId,
                {name: req.body.name,
                color: req.body.color,
                }, {new: true});
            res.status(201).json({skill});
        }
    } catch(err) {
        console.log(err);
        res.status(400).json({err});
    }
}

async function editSubskill(req, res) {
    try {
        const subskill = await Subskill.findByIdAndUpdate(req.params.subskillId, 
            {name: req.body.name}, {new: true})

        res.status(201).json({subskill});
    } catch(err) {
        console.log(err);
        res.status(400).json({err});
    }
}

async function editHabit(req, res) {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.habitId, 
            {name: req.body.name,
            description: req.body.description,
            repeatDays: req.body.repeats ? req.body.repeatDays : 0,
            difficulty: req.body.difficulty,
            startDate: req.body.startDate,
            endDate: req.body.ends ? req.body.endDate : null,}, {new: true});
            res.status(201).json({habit});
    } catch(err) {
        console.log(err);
        res.status(400).json({err});
    }
}

