import express from 'express';
import controller from '../controllers/UserController';
const router = express.Router();

router.post('/signIn', controller.signIn);
router.post('/register', controller.register);
router.post('/auth', controller.auth);

export default router;