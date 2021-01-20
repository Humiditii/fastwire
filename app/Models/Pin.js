import {Schema, model} from 'mongoose'

const pin_model = new Schema({
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'auth'
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'auth'
    },
    pin: String,
    status: {
        type: String,
        default: 'not_used'
    } 
})



export default model('pin', pin_model)