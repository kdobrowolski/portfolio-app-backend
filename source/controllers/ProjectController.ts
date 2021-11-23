import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import mongoose from 'mongoose';
import * as fs from "fs";

const getProjects = (req: Request, res: Response, next: NextFunction) => {
    Project.find({}, (err, data) => {
        if(err) return res.status(500).json({ err });

        return res.status(200).json({ projects: data });
    })
}

const newProject = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, date } = req.body;

    if(req.file) {
        const img = fs.readFileSync(req.file.path);
        const encode_image = img.toString('base64');

        var finalImage = {
            image: Buffer.from(encode_image, 'base64')
        };

        const project = new Project({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            date,
            mainImage: finalImage.image,
            images: []
        })
        
        return project
            .save()
            .then((result: any) => {
                return res.status(201).json({
                    success: true,
                    message: "Created new project"
                })
            })
            .catch((err: any) => {
                console.log(err);
                return res.status(500).json({
                    message: err.message,
                    err
                })
            })
    }
}

const editProject = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, date, mainImage } = req.body;
    const id = req.params.id;
    if(req.file) {
        const img = fs.readFileSync(req.file.path);
        const encode_image = img.toString('base64');

        var finalImage = {
            image: Buffer.from(encode_image, 'base64')
        };
    
        Project.updateOne({ _id: id } ,{ title, description, date, mainImage: finalImage.image })
            .then((result) => {
                let count = result.matchedCount;
                if(count == 0) return res.json({ success: false, message: "Project doesnt exists" });


                return res.status(200).json({
                    success: true,
                    message: "Updated!"
                })
            })
            .catch((err) => {
                console.log({err: err});
                return res.status(500).json({
                    success: false,
                    err
                })
            })
    }
}

const deleteProject = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    Project.findOneAndRemove({ _id: id })
        .then((result) => {
            if(result == null) return res.json({ success: false, message: "Project doesnt exists" });
            res.status(200).json({
                success: true,
                message: "Deleted!"
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                err
            })
        })
}

const getImages = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    Project.findOne({ _id: id })
        .then((result) => {
            if(result == null) return res.status(500).json({ success: false, message: "object is null" });
            return res.json({
                images: result.images
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                err
            })
        })
}

const addImage = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    console.log(req.file);
    if(req.file) {
        const img = fs.readFileSync(req.file.path);
        const encode_image = img.toString('base64');

        var finalImage = {
            image: Buffer.from(encode_image, 'base64')
        };

        Project.updateOne({ _id: id }, {$push: { images: { image: finalImage.image } }})
            .then((result) => {
                return res.status(200).json({
                    success: true,
                    message: "Added image!",
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    success: false,
                    err
                })
            })
    }
}

const deleteImage = (req: Request, res: Response, next: NextFunction) => {
    const projectID = req.params.id;
    const imageID = req.params.imageid;

    Project.updateOne({ _id: projectID }, { $pull: { images: { _id: imageID } } })
        .then((result) => {
            if(result.modifiedCount == 0) return res.json({ success: false, message: "image doesnt exists" });
            return res.status(200).json({
                success: true,
                message: "Deleted image!",
                result
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                err
            })
        })
}

export default { getProjects, newProject, editProject, deleteProject, getImages, addImage, deleteImage }