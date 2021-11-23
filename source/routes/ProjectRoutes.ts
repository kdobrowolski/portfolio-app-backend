import express from 'express';
import controller from '../controllers/ProjectController';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './public/uploads/images',
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({
  storage: storage
})

const router = express.Router();

router.get('/', controller.getProjects);
router.post('/', upload.single('mainImage'), controller.newProject);
router.put('/:id', upload.single('mainImage'), controller.editProject);
router.delete('/:id', controller.deleteProject);

router.get('/:id/images', controller.getImages);
router.post('/:id/images', controller.addImage);
router.delete('/:id/images/:imageid', controller.deleteImage);

export default router;