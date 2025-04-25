

import jwt from 'jsonwebtoken';
import { blacklistModel } from '../features/user/blacklist.model.js';

const jwtAuth = async (req, res, next)=>{
    // 1. read the token from authorization headers
    const token = req.headers['authorization'];

    // 2. if no token return unauthorized
    if(!token){
        return res.status(401).send("Unauthorized");
    }

    // 3. Check if token is blacklisted
    const isBlacklisted = await blacklistModel.findOne({token});
    if (isBlacklisted) {
        return res.status(403).send("Token is blacklisted");
    }
    // 3. check if token is valid
    try{
        const payload = jwt.verify(token, 'oaoiha478416@');
        console.log("Decoded payload: " + payload);
        req.userID = payload.userID;
    }catch(err){
        console.log("Token verificaton error: " + err);
        // 4. return error if token is invalid
        return res.status(401).send("Unauthorized");
    }
    // 5. call the next middleware
    next();

}

export default jwtAuth;