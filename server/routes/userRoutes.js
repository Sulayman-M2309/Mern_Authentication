import  express  from 'express';

import { getUserData } from '../controllers/userController.js';
import getUserAuth from '../middleware/getUserAuth.js';

const userRouter=express.Router()
userRouter.get("/data",getUserAuth,getUserData)
export default userRouter