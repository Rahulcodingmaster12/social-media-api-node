import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import { blacklistModel } from './blacklist.model.js';
// import dotenv from 'dotenv';
export default class UserController{

    async signUp(req, res){
        const {name, email, gender} = req.body;
        let password = req.body.password;
       
        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-z])(?=.*[@!#$%]).{8,12}$/
        if(!passRegex.test(password)){
            return res.status(400).send("Invalid Password");
        }
        try{
            const hashedPassword = await bcrypt.hash(password, 12);
            password = hashedPassword;
            const newUser = {name, email, password, gender};
            const addUser = await UserRepository.SignUp(newUser);
            res.status(200).send(addUser);
            // next()
        }catch(err){
            console.log(err);
        }
    }

    async signIn(req, res, next){
        try{
        const { email, password} = req.body;

        const user = await UserRepository.findByEmail(email);
        if(!user){
            res.status(400).send("Invalid Credentials");
        }else{
            const result = await bcrypt.compare(password, user.password);
            if(result){
            // 1. create token
                const token = jwt.sign({
                    userID : user._id,
                    email : user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
                );
            // 2. send token
                return res.status(200).send(token);
            }else{
                return res.status(400).send("Incorrect Credentials");
            }
        }
        }catch(err){
            next(err);
            console.log(err);
            res.status(200).send("Something went wrong")
        }
    }

    async logout(req, res){

        const authHeader = req.headers.authorization;
        console.log(authHeader);
        // return res.send("header is found");
        const token = authHeader;
        // Store the token in MongoDB blacklist
        await blacklistModel.create({ token });

        res.status(200).json({ message: "Logged out successfully" });
    }

    async getDetails(req, res){

        const userid = req.params.userId;
        console.log(userid);
        try{
        const user = await UserRepository.getUser(userid);
        console.log(user);
        if(!user){
            return res.status(400).send("user not found");
        }
        res.status(200).send(user);
        }catch(err){
            console.log(err);
        }
    }

    async getallDetails(req, res){
        try{
            const allusers = await UserRepository.getallUsers();
            if(!allusers){
                return res.status(400).send("No users to show")
            }
            res.status(200).send(allusers);
        }catch(err){
            console.log(err);
        }
    }

    async updateDetails(req, res){
        try{
            const {name, email, gender} = req.body;
            const userId = req.params.userId;
            const newDetails = {name, email, gender};
            const updatedDetails = await UserRepository.updateById(newDetails, userId);
            console.log(updatedDetails);
            if(!updatedDetails){
                return res.status(400).send("Failed to update the user");
            }
            res.status(200).send(updatedDetails);
        }catch(err){
            console.log(err);
        }
    }
}