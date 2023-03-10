import express from "express";
const router = express.Router();
import skillController  from '../../controllers/skill.js';
import multer from 'multer'
const upload = multer()

// router.get('/:date');
router.post('/', upload.single('photo'), skillController.create);
router.get('/user/:userId', skillController.getUserSkills);
router.post('/habit/:habitId', skillController.completeHabit);
router.delete('/habit/:habitId/datesComplete', skillController.uncompleteHabit);
router.post('/subskill/:subskillId/habit', skillController.createSubskillHabit);
router.delete('/subskill/:subskillId', skillController.deleteSubskill);
router.delete('/habit/:habitId', skillController.deleteHabit);

router.put('/subskill/:subskillId', upload.single('photo'), skillController.editSubskill);
router.put('/habit/:habitId', skillController.editHabit);

router.post('/:skillId', skillController.createSubskill);
router.delete('/:skillId', skillController.deleteSkill);
router.post('/:skillId/habit', skillController.createSkillHabit);
router.put('/:skillId', upload.single('photo'), skillController.editSkill);


export default router;