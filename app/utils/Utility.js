import { hashSync , compareSync} from 'bcryptjs';
import {sign} from 'jsonwebtoken'
import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
import sendGridTransport from 'nodemailer-sendgrid-transport';
import {randomBytes} from 'crypto';


dotenv.config()

class Utility {
    static  hashPassword(password){
        const hashedPwd =  hashSync(password, 10);
        return hashedPwd; 
    }

    static decodePwd(reqPassword, dbPassword){
        const compare = compareSync(reqPassword, dbPassword);
        return compare;
    }

    static appError (err, next){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

    static generateToken(user_token_data){
        return sign({
            email:user_token_data.email,
            userId: user_token_data.id,
            role: user_token_data.role
        }, process.env.SECRET,  { expiresIn: '24h' })
    }

    static mailer(){
        const transporter = createTransport(sendGridTransport({
            auth: {
                api_key: process.env.SEND_GRID_API
            }
        }));

        return transporter;

    }

    static randomStr(length){
        return randomBytes(length).toString('hex');
    }

    static api_response(response_object){
        return response_object.res.status(response_object.statusCode).json({
            message: response_object.message,
            data: response_object.data
        })
    }

}


export default Utility;
