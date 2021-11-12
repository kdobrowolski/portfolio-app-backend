import express from 'express';
import controller from '../controllers/UserController';
const router = express.Router();

router.post('/signIn', controller.signIn);

export default router;