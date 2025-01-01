import express from 'express';
import { registerUser, loginUser, loginAdmin} from '../controllers/userController.js';
// import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin-login', loginAdmin);

export default userRouter;
