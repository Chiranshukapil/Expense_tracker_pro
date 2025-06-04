const errorHandler = (error,req,res,next)=>{
    // console.log(error); 
    if(error){
        res.status(500).json({
            status:"failed",
            error: error.message || error
        })
    }else{
        next();
    }

}


export default errorHandler;