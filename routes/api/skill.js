import express from "express";
const router = express.Router();
import skillController  from '../../controllers/skill.js';

// router.get('/:date');
router.post('/', skillController.create);
router.get('/user/:userId', skillController.getUserSkills);
router.post('/habit/:habitId', skillController.completeHabit);
router.delete('/habit/:habitId/datesComplete', skillController.uncompleteHabit);
router.post('/subskill/:subskillId/habit', skillController.createSubskillHabit);
router.delete('/subskill/:subskillId', skillController.deleteSubskill);
router.delete('/habit/:habitId', skillController.deleteHabit);

router.put('/subskill/:subskillId', skillController.editSubskill);
router.put('/habit/:habitId', skillController.editHabit);

router.post('/:skillId', skillController.createSubskill);
router.delete('/:skillId', skillController.deleteSkill);
router.post('/:skillId/habit', skillController.createSkillHabit);
router.put('/:skillId', skillController.editSkill);


export default router;