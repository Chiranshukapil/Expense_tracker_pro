import jsonWebToken from "jsonwebtoken";
const jwtManager = (user)=>{

    const accesstoken = jsonWebToken.sign({
        _id: user._id,
        name: user.name
    },process.env.jwt_salt);
    
    return accesstoken;
}

export default jwtManager;