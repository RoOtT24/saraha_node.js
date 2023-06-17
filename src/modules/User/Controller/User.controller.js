import userModel from "../../../../DB/model/user.model.js";
import cloudinary from 'cloudinary';


export const getUsers = async (req, res) => {
    const users = await userModel.find();
    return res.json({users});
}

export const profile = (req, res) => {
     return res.json({id:req.id});
}

export const profilePicture =async (req, res)=> {
    if(!req.file)
        return res.json({message:"file is required"});

    // const imageUrl = req.file.destination+"/"+req.file.filename;

    const {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`saraha/user/${req.id}`});

    // const user = await userModel.updateOne({_id:req.id}, {profilePicture:imageUrl});
    const user = await userModel.updateOne({_id:req.id}, {profilePicture:secure_url});

    return res.status(200).json({message:"file updated successfully!"});
};