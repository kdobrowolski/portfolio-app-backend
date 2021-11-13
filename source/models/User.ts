import mongoose, { Schema } from 'mongoose';
import IUser from '../intefaces/User';
import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, { collection: "users" })

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            user.password = hash;
            next();
        })        
    })
})

export default mongoose.model<IUser>('User', UserSchema);