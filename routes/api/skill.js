import express from "express";
const router = express.Router();
import skillController  from '../../controllers/skill.js';

// router.get('/:date');
router.post('/', skillController.create);
router.get('/user/:userId', skillController.getUserSkills);
router.post('/:skillId', skillController.createSubskill);
router.post('/:skillId/habit', skillController.createSkillHabit);
router.post('/subskill/:subskillId/habit', skillController.createSubskillHabit);

export default router;