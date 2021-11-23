import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/UserRoutes';
import projectRoutes from './routes/ProjectRoutes';
import config from './config/config';
import mongoose, { ConnectOptions } from 'mongoose';

const router: Express = express();

mongoose.connect(config.mongo.url, config.mongo.options as ConnectOptions)
    .then((result) => {
        console.log('DB connected');
    }).catch((err) => {
        console.log(err);
    })

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

router.use('/api/user', userRoutes);
router.use('/api/projects', projectRoutes);

router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
const PORT: any = config.server.port ?? 8000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));