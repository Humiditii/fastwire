import {Router} from 'express';
import isAuth from '../Middlewares/IsAuth';
import PinController from '../Controllers/PinController';

const baseRoute = Router()
const pinRoute = Router()

pinRoute.get('/pins', isAuth.verifyAuth, PinController.get_pins )

pinRoute.post('/generate', isAuth.verifyAuth, PinController.generate_pin)


baseRoute.use('/pin', pinRoute)

export default baseRoute;