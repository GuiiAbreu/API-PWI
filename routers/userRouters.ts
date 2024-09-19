import checkNoExistsUserAccount from '../middlewares/checkNoExistsUser';
import { user } from '../model/user';
import  express  from 'express';
import {v4 as uuid} from 'uuid'

const userRouter = express.Router();

userRouter.post("/",checkNoExistsUserAccount,(req,res)=>{
    const {name,username}=req.body;
    const newUser={
        id:uuid(),
        name,
        username,
        technologies:[]
    }
    user.push(newUser);
    res.status(201).json({
        client: newUser
      });
})

export default userRouter;