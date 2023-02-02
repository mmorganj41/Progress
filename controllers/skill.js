import User from '../models/user.js';
import Habit from '../models/habit.js';
import Skill from '../models/skill.js';
import Subskill from '../models/subskill.js';

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
            startDate: req.body.startDate,
            endDate: req.body.ends ? req.body.endDate : null,
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
        const habit = await Habit.findById(req.params.habitId);

        habit.completionDates.set(req.body.date, true);

        await habit.save();

        res.status(201).json({habit});
    } catch(err) {
        console.log(err);
        res.status(400).json({err})
    }
}

async function uncompleteHabit(req, res) {
    try {
        const habit = await Habit.findById(req.params.habitId);

        habit.completionDates.delete(req.body.date);

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
            await Habit.remove({"_id": {$in: skill.habits }});
        }
        
        if (skill.subskills.length) {
            const subskills = await Subskill.find({'_id': {$in: skill.subskills}});
            
            subskills.forEach(async subskill => {
            if (subskill.habits.length) {
                const habitProm = await Habit.remove({"_id": {$in: subskill.habits}});
                console.log(habitProm)
            }
        })
        }  

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
            await Habit.remove({"_id": {$in: subskill.habits }});
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
        const skill = await Skill.findByIdAndUpdate(req.params.skillId,
            {name: req.body.name,
            color: req.body.color}, {new: true});

        res.status(201).json({skill});
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

