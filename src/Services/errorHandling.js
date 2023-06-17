export const asyncHandler = (fn) =>{
    return (req, res)=>{

        fn(req, res).catch(err=>{
            return res.status(500).json({message:"server error!", error:err.stack})
        })
    }
}