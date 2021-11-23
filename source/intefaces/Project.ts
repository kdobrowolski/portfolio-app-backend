import { Document } from 'mongoose';

export default interface IProject extends Document {
    title: string,
    description: string,
    date: string,
    mainImage: Buffer | string,
    images: [
        { imageUrl: string }
    ]
}