import express from "express";
const router = express.Router();
import habitController from '../controllers/habit';

router.get('/:date');

export default router;