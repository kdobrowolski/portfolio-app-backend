import express from 'express';
import controller from '../controllers/ProjectController';

const router = express.Router();

router.get('/', controller.getProjects);
router.post('/', controller.newProject);

export default router;