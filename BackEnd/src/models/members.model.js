import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    role: {
        type: String,
        enum: ['Manager','Supervisor', 'Operator'],
        required: true
    },
    workingUnder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true});
export const Member = mongoose.model('Member', memberSchema);
