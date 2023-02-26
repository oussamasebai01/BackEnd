import mongoose from "mongoose";
const {Schema, model} = mongoose
const EmployeeSchema = new Schema({
    email:{
        type:String,
    },
    password :{
        type:String,
    },
    nom :{
        type:String,
    },
    prenom :{
        type:String,
    },
    age :{
        type:Number,
    },
    job :{
        type:String,
    },
    salary :{
        type:Number,
    },
    entrepriseName :{
        type:String,
    },
    hoursVacation :{
        type:Number,
    },
    hoursSick :{
        type:Number,
    },
    resetCode :{
        type:String,
    }
})
export default model ('Employee',EmployeeSchema)
