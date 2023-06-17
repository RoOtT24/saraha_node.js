import { hash } from "../../../Services/HashAndCompare.js";
import userModel from '../../../../DB/model/user.model.js'
import { compare } from "bcrypt";
import { generateToken, verifyToken } from "../../../Services/generateAndDecode.js";
import {signupSchema, loginSchema} from '../auth.validation.js';
import { sendEmail } from "../../../Services/sendEmail.js";

export const signup = async (req, res) => {
    
    // const validationResult = signupSchema.validate(req.body, {abortEarly: false});

    // if(validationResult.error){
    //     return res.json({error: validationResult.error});
    // }

    const {userName, email:email, password} = req.body;
    const user = await userModel.findOne({email:email.toLowerCase()});
        if(user){
            return res.status(409).json({message:"email already exist!"})
        }
        const hashedPassword = hash(password);
        
        const token = generateToken({email}, process.env.EMAIL_TOKEN);

        const link = `https://saraha-app-s8r3.onrender.com/auth/confirmEmail/${token}`;
        
        sendEmail(email, 'confirm email', 'confirm your email so you can login\n', `<a href="${link}">verify your email</a>`)
        const createdUser = await userModel.create({userName, email, password:hashedPassword});
        return res.status(201).json({message:"success", user: createdUser._id});
        

    
}


export const confirmEmail = async (req, res) => {
    const {token} = req.params;
    const decoded = verifyToken(token, process.env.EMAIL_TOKEN);

    if(!decoded?.email)
        return res.json({message:"invalid token"});

    const user = await userModel.updateOne({email:decoded.email}, {confirmEmail:true});

    return res.status(200).json({message:"your email is confirmed, you can login!"});
}


export const login = async (req, res) => {


    // const validationResult = loginSchema.validate(req.body, {abortEarly: false});

    // if(validationResult.error){
    //     return res.json({error: validationResult.error});
    // }

    const {email, password} = req.body;
    
    
        const user = await userModel.findOne({email: email.toLowerCase()});
    if(!user)
        return res.status(404).json({message:"No such user!"});
        
    const match = compare(password, user.password);

    if(!match)
        return res.status(401).json({message:"Password Mismatch"});
    
    if(!user.confirmEmail)
        return res.status(401).json({message:"email is not confirmed!"});

    const token = generateToken({id:user._id})
    return res.status(200).json({message:"success", token});
    
}