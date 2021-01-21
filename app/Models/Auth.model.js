import { mongo } from "mongoose";
import {Schema, model} from 'mongoose';


const authSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    business_name: String,
    email: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        default: 'Admin'
    },

    pin:{
        type: String
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    account_verified: {
        is_verified: false,
        token: String
    },

    account_plan: {
        expiry_date:{
            type: Date
        },
        days_left:{
            type: Number
        }
    },

    reset_password:{
        token: String,
        valid_for: Date
    },

    created_at: {
        type: Date,
        default: Date.now()
    }

})

export default model('auth', authSchema)