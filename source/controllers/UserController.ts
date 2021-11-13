import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const signIn = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({"success": true});
}

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, login, password, isAdmin } = req.body;

    const isEmail = await User.find({email: email}).exec();
    const isLogin = await User.find({login: login}).exec();

    if(Object.keys(isEmail).length > 0) {
        return res.json({
            message: "email already exists"
        })
    }
    if(Object.keys(isLogin).length > 0) {
        return res.json({
            message: "login already exists"
        })
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        login,
        password,
        isAdmin
    })

    return user
        .save()
        .then((result) => {
            res.status(200).json({
                user: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                err
            })
        })
}

const auth = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({"success": true});
}

export default { signIn, register, auth }