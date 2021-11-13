import express from 'express';
import controller from '../controllers/UserController';
import auth from '../auth/auth';

const router = express.Router();

router.post('/signIn', controller.signIn);
router.post('/register', controller.register);
router.post('/auth', auth, controller.auth);

export default router;