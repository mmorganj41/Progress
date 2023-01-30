import Habit from '../models/habit.js';
import Skill from '../models/skill.js';
import Subskill from '../models/subskill.js';

export default {
    create,
    getUserSkills,
};

async function create(req, res){
    try {
        const skill = await Skill.create({
            user: req.user._id,
            name: req.body.name,
            color: req.body.color,
        });

        res.status(201).json({skill});
    } catch(err) {
        res.status(400).json({err});
    }
}

async function getUserSkills(req, res) {
    try {
        const skills = await Skill.find({user: req.params.userId});
        res.status(200).json({skills});
    } catch(err) {
        res.status(400).json({err});
    }
}
