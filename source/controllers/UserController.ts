import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../config/config';
import nodemailer from 'nodemailer';

const signIn = (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;

    User.findOne({login: login}, (err: any, user: any) => {
        if(err) return res.status(500).json({ err });

        if(!user) {
            return res.json({ message: "User doesnt exists", success: false});
        }

        user.comparePassword(password, (err: any, isMatch: boolean) => {
            if(err) return res.status(500).json({ err });

            if(isMatch) {
                const token = jwt.sign({
                    user_id: user._id, login
                }, config.token as Secret,
                {
                    expiresIn: "1h"
                })


                return res.status(200).json({ success: isMatch, user , token: token});
            }

            return res.json({ success: isMatch, message: "Wrong password" });
        })
    })
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
            res.status(201).json({
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

const sendEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email, tel, name, msg } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
          user: config.email.user,
          pass: config.email.password
        }
      });
      
      const mailOptions = {
        from: "kdobrowolski@official.com",
        to: config.email.user,
        subject: "Zapytanie z formularza - kdobrowolski.pl",
        html: `<p>Imie i nazwisko: ${name}</p>
               <p>Email: ${email}</p>
               <p>Nr telefonu: ${tel}</p>
               <p>${msg}</p>`
      };
      
      transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
          res.status(500).json({
              success: false,
              error
          })
        } else {
          res.status(200).json({
              success: true,
              message: "Email was sent!"
          })
        }
      });
}

export default { signIn, register, auth, sendEmail }