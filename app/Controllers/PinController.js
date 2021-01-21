import Pin from '../Models/Pin.model';
import Util from '../utils/Utility';


const {api_response, appError, randomStr} = Util

class PinController {

    static async generate_pin(req, res, next){
        const {userId} = req
        const { number } = req.body;
        const new_pins = new Array(parseInt(number))
      
        try {
            const admin_pin = await Pin.findById(userId)

            for (const index of new_pins.keys()) {
                const pin_rnd = randomStr(6).toUpperCase() 
                new_pins[index] = {
                    pin: pin_rnd,
                    status: false, // not used
                    owner_id: null
                }
            }

            const new_pin_array = [...admin_pin.pin,...new_pins]

            Pin.findOne({admin_id:userId}).then(admin_pin_plate => {
                if(!admin_pin_plate){
                    const create_pin_plate = new Pin({
                        admin_id: userId,
                        pin: [...new_pins]
                    }).save().then( new_pin_plate_created => {
                        const api_res = {
                            res: res,
                            statusCode: 201,
                            message: `${parseInt(number)} new pins generated`,
                            data: [...new_pins]
                        }
                        return api_response(api_res)
                    }).catch( err => appError(err, next))
                }else{
                    admin_pin_plate.pin = new_pin_array

                    admin_pin_plate.save().then(updated_pin => {
                        const api_res = {
                            res: res,
                            statusCode: 201,
                            message: `${parseInt(number)} new pins generated`,
                            data: [...new_pins]
                        }   
                        return api_response(api_res)
                    }).catch( err => appError(err, next))
                }
            }).catch( err => appError(err, next))

        } catch (error) {
            return appError(error, next)
        }

        

    }

    static get_pins(req, res, next){
        const {userId} = req
        
        Pin.findOne({admin_id: userId}).then( admin_plate => {
            const api_res = {
                res: res,
                statusCode: 200,
                message: `${admin_plate.pin.length} lists of generated pins by you!!!`,
                data: [...admin_plate.pin]
            }   
            return api_response(api_res)
        }).catch( err => appError(err, next))
    }

    static get_one_pin(req, res, next){
        
    }
}


export default PinController