import multer, { diskStorage } from 'multer'
import { nanoid } from 'nanoid';

export const HME = (err, req, res, next)=> {
    if(err){
        return res.status(400).json({message:"multer error" ,error: err});
    }
    next(); 
}
function fileUpload(){
    // const storage = multer.diskStorage({
    //     destination: (req, res, cb)=>{
    //         cb(null, 'uploads');
    //     },
    //     filename:(req, file, cb)=>{
    //         cb(null, nanoid()+Date.now()+"_"+Math.random()+"_"+file.originalname);
    //     }
    // })

    const storage = diskStorage({});
    function fileFilter(req, file, cb) {
        if(['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb("invalid format", false);
        }
    }

    const upload = multer({fileFilter, storage});
    return upload
}

export default fileUpload;