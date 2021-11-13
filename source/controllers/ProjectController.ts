import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import mongoose from 'mongoose';

const getProjects = (req: Request, res: Response, next: NextFunction) => {
    Project.find({}, (err, data) => {
        if(err) return res.status(500).json({ err });

        return res.status(200).json({ projects: data });
    })
}

const newProject = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, date, mainImage } = req.body;

    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        date,
        mainImage,
        images: []
    })
    
    return project
        .save()
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Created new project"
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                err
            })
        })
}

export default { getProjects, newProject }