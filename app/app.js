import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config()


const app = express()

// parsing incoming request
app.use(bodyParser.urlencoded({
    extended: false
}));

// application/json parsing json incoming request

app.use(bodyParser.json());

//allowing CORS
app.use(cors());


app.use('/welcome', (req, res, next)=> {
    return res.status(200).json({
        message: 'Welcome to fastwire api v1.0'
    })
})

// catching undefined route
app.all( '*',(req, res, next)=> {
    return res.status(404).json({
        statusCode: 404,
        message: 'Not found, invalid route'
    });
})


// error handler

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500
    const message = error.message

    return res.status(statusCode).json({
        error: message,
        statusCode: statusCode
    })
})



export default app;