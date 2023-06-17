import userModel from "../../../../DB/model/user.model.js";
import messageModel from "../../../../DB/model/Message.model.js";

export const getMessages = async (req, res) =>{
    const {id} = req;
    const messages = await messageModel.find({receiverId:id});
    return res.json({message:"success",messages});

}

export const sendMessage = async (req, res) =>{
    const {receiverId} = req.params;
    const {message} = req.body;
    const user = await userModel.findById(receiverId);
    if(!user)
    return res.status(404).json({message:"no user found"});
    
    if(!message)
    return res.status(404).json({message:"no message found"});
    
    const createdMessage = await messageModel.create({receiverId, message});

    return res.json({message:"message was successfully sent!", createdMessage});
}


export const deleteMessage = async (req, res) =>{
    const {id} = req;
    const {messageId} = req.params;
    
    const message = await messageModel.deleteOne({_id:messageId, receiverId:id});

    if(message.deletedCount==0)
        return res.status(404).json({message:"invalid user Id or message Id"});

    return res.json({message:"success"})
}