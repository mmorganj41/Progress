import User from '../models/user.js';
import Habit from '../models/habit.js';
import Skill from '../models/skill.js';
import Subskill from '../models/subskill.js';

export default {
    create,
    getUserSkills,
    createSubskill,
    createSkillHabit,
    createSubskillHabit
};

async function create(req, res){
    try {
        const userPromise = User.findById(req.user._id);
        const skillPromise = Skill.create({
            name: req.body.name,
            color: req.body.color,
        });

        const [user, skill] = await Promise.all([userPromise, skillPromise]);

        user.skills.splice(0,0, skill);

        await user.save();

        res.status(201).json({skill});
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
            startDate: new Date(),
        })
        const skillPromise = Skill.findById(req.params.skillId);

        const [skill, habit] = await Promise.all([skillPromise, habitPromise]);

        skill.habits.splice(0,0, habit);

        await skill.save();

        res.status(201).json({habit});
    } catch(err) {
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
            startDate: new Date(),
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