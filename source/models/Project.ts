import mongoose, { Schema } from 'mongoose';
import IProject from '../intefaces/Project';

const ImageSchema: Schema = new Schema({
    image: {
        type: String
    }
})

const ProjectSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
    images: [
        ImageSchema
    ]
}, { collection: "projects" })

export default mongoose.model<IProject>('Project', ProjectSchema);