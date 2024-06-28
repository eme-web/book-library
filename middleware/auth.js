import jwt from 'jsonwebtoken';
import asyncHandler from './async.js';
import { error, response } from  '../utils/response.js';
import User from '../models/userModel.js';


export const protect = asyncHandler(async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")){

            return response(res, 401, `No token provided`)
        }
    
        const token = authHeader.split(" ")[1]
    
      
        if(!token) {
            return response(res, 401,`No token provided`);}
           
        const { id }  = jwt.verify(token, process.env.jwt_secret);
        
    
        const user  = await User.findById({_id: id });
        if (!user){
            return response(res, 401,`Not authorize to access this route`);
        }
        req.user = user;
       
        return next();
        
    } catch (err){

        return error(res, 500, err)
    }
});