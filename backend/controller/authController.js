import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';
// import { configDotenv } from 'dotenv';
// configDotenv()
import dotenv from 'dotenv'
dotenv.config() // This loads environment variables from the .env file

export const signup = async(req, res, next) =>{
    const {name, email, password} = req.body;

    if(!name ||
        !email ||
        !password ||
        name==='' ||
        email==='' ||
        password===''){
            // next(errorHandler(400, 'All fields are mendetory to fill!'))
            return res.json({success:false, message: 'All fields are required!'})
    }
    
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try{
        await newUser.save();
        return res.status(200).json({success:true, message: "User Created Successfully!"})
    }catch(error){
        return res.status(404).json({success:true, message: "User Already exists!"})
        // next(error);
    }
}

export const signin = async(req, res, next)=>{
    const {email, password} = req.body;

    if (
        email==='' ||
        password==='' ||
        !email ||
        !password){
            return res.json({success:false, message: "Please provide all the information!"});
            // return next(errorHandler(400, 'All fields are mendatory to fill!'));
        }
    try{
        const validUser = await User.findOne({email})
        if(!validUser){
            return res.json({success:false, message: "User dosn't exist!"})
            // return next(errorHandler(400, 'User not found!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        const {password: pass, ...rest}= validUser._doc;
        if (!validPassword){
            // return next(errorHandler(400, 'Invalid Password'))
            return res.json({success:false, message: 'Invalid Password!'})
        }

        const token = jwt.sign({id: validUser._id, role: validUser.role}, process.env.JWT_SECRET)
        res
        .status(200)
        .cookie("access_token", token, {httpOnly: true})
        .json({success:true, message: "Signed In Successfully!", user: rest})
    }catch(error){
        next(error)
    }
}

export const promoteToAdmin = async (req, res, next) => {
    const {email} = req.body;

    if (req.user.role === 'User') {
        return next(errorHandler(403, 'Only admins can promote users to Admin'));
    }

    try {
        const user = await User.findOne(email);
        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }
        const isAdmin = await User.findById(req.params.id)
        if (isAdmin.role === 'Admin') {
            return next(errorHandler(400, 'User is already an Admin'));
        }

        isAdmin.role = 'Admin';
        await isAdmin.save();
        const {password: pass, ...rest}= isAdmin._doc;

        res.status(200).json({ message: 'User promoted to Admin successfully', rest });
    } catch (error) {
        next(error);
    }
};