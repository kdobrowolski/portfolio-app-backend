import mongoose, { Schema } from 'mongoose';
import IProject from '../intefaces/Project';

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
        type: Buffer,
        contentType: String,
        required: true
    },
    images: [
        {
            image: Buffer
        }
    ]
}, { collection: "projects" })

export default mongoose.model('Project', ProjectSchema);