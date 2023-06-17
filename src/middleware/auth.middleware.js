import { verifyToken } from "../Services/generateAndDecode.js";
import userModel from "../../DB/model/user.model.js";

export const auth = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization?.startsWith(process.env.BEARER))
        return res.json({message: 'Invalid bearer key'});
    const token = authorization.split(process.env.BEARER)[1];
    if(!token)
        res.json({message:"invalid token"});
    const decoded = verifyToken(token);
    if(!decoded.id){
        return res.json({message:"invalid token"});
    }
    const authUser = await userModel.findById(decoded.id);
    if(!authUser)
        return res.status(401).json({message:"not registered account!"});
    req.id = decoded.id;
    next();
}