import dotenv from 'dotenv';
import app from './app/app';
import db_connection from './app/connector';



dotenv.config()

const {connect}  = db_connection


let connection_config = {
    port: process.env.PORT,
    database_url: process.env.MONGODB_ATLAS0
}


process.env.NODE_ENV == 'development' ? ( connection_config.port = 3030 , connection_config.database_url = process.env.DATABASE_URL ): null

console.log(connection_config)

connect(connection_config, app)