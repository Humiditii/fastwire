import {Schema, model} from 'mongoose'

const pin_model = new Schema({

    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'auth'
    },


    pin: {
        type: Object // [{pin: 'value', status:'value', owner_id:'value'}]
    }
})



export default model('pin', pin_model)