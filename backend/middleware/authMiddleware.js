import bcryptjs from 'bcryptjs';
import User from '../models/User.js';


export const signUp = async(req, res, next) =>{
    const {name, email, password} = req.body;

    if(!name ||
        !email ||
        !password ||
        name==='' ||
        email==='' ||
        password===''){
            next(errorHandler(400, 'All fields are mendetory to fill'))
    }
    
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try{
        await newUser.save();
        res.json("User Created Successfully")
    }catch(error){
        next(error);
    }
}