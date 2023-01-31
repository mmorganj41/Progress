import User from '../models/user.js';
import Habit from '../models/habit.js';
import Skill from '../models/skill.js';
import Subskill from '../models/subskill.js';

export default {
    create,
    getUserSkills,
    createSubskill,
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
                populate: {
                    path: 'subskills',
                    model: 'Subskill'
                }
            })
            .exec();

        res.status(200).json({skills: user.skills});
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

        console.log(skill, '<--- skill');
        skill.subskills.splice(0,0, subskill);

        await skill.save();

        res.status(201).json({subskill});
    } catch(err) {
        console.log(err);
        res.status(400).json({err})
    }
}