import mongoose from "mongoose";
const {Schema, model} = mongoose
const UserSchema = new Schema({
    fullName:{
        type:String,
    },
    email:{
        type:String,
    },
    password :{
        type:String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' }
})
export default model ('User',UserSchema)