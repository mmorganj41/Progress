import express from "express";
const router = express.Router();
import skillController  from '../../controllers/skill.js';

// router.get('/:date');
router.post('/', skillController.create);

export default router;