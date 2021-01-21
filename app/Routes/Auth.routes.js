import {Router} from 'express';
import AuthController from '../Controllers/AuthController'

const baseRoute = Router()
const authRouter = Router()

authRouter.post('/signup', AuthController.signup);

baseRoute.use('/auth', authRouter)

export default baseRoute