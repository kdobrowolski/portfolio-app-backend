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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
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
const PORT: any = config.server.port ?? 6000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));