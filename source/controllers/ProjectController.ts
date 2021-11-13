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
            return res.status(201).json({
                success: true,
                message: "Created new project"
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            })
        })
}

const editProject = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, date, mainImage } = req.body;
    const id = req.params.id;

    Project.updateOne({ _id: id } ,{ title, description, date, mainImage })
        .then((result) => {
            let count = result.matchedCount;
            if(count == 0) return res.json({ success: false, message: "Project doesnt exists" });

            return res.status(200).json({
                success: true,
                message: "Updated!"
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                err
            })
        })
}

export default { getProjects, newProject, editProject }