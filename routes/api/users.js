import express from 'express';
import multer from 'multer';
const router = express.Router();
import usersCtrl  from '../../controllers/users.js';
const upload = multer()

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.put('/reorder', usersCtrl.reorderSkills);
router.get('/:username', usersCtrl.profile);
router.put('/', upload.single('photo'), usersCtrl.editProfile);


/*---------- Protected Routes ----------*/




export default router;