import jsonWebToken from "jsonwebtoken";

const auth = (req,res,next)=>{
    
    // console.log(req.headers);

    
    try{
        const accesstoken = req.headers.authorization.replace("Bearer ", "");
        const jwt_payload = jsonWebToken.verify(accesstoken,process.env.jwt_salt);

        req.user = jwt_payload;
    }catch(e){
        res.status(401).json({           //401 : Unauthorised
            status:"failed",
            message:"Unauthorised",
        })
        return;
    }


    next();
}

export default auth;