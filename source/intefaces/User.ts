import { Document } from 'mongoose';

export default interface IUser extends Document {
    email: string,
    login: string,
    password: string,
    isAdmin: boolean
}