require('dotenv').config();

const jwt = require("jsonwebtoken");
const User = require('../models/user');

const handleLogin = async(req,res) =>{
        const {username,email,password} = req.body;
        try{
            const user = username ? await User.findOne({username}) : await User.findOne({email})

            if(user){
                if(user.password == password){
                    const token = jwt.sign({sub:user._id,username:user.username},process.env.SECRET_KEY,{expiresIn:'24h'});
                    console.log(token);
                    console.log(jwt.verify(token,process.env.SECRET_KEY));
                    res.cookie('token', token, {
                        httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
                        // sameSite: 'lax', // Uncomment if needed
                        // secure: true, // Uncomment if using HTTPS
                        credentials: true, // Ensure credentials (cookies) are included in requests
                        maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
                    });
                    return res.status(200).json({message:'Login Successfully'});
                }else{
                    return res.status(409).json({message:"Password Not Matched"});
                }
            }else{
                return res.status(404).json({message:"User not found"});
            }
        }catch(err){
            console.log(err.message);
            return res.status(500).json({message:"Internal Server Error"});
        }
}

const handleLogout = async(req,res) =>{
    const token = req.cookies.token;
    try{
        res.cookie('token','',{
            httpOnly:true,
            maxAge:0,
        })
        return res.status(200).json({message:"Logout Successfully"});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Internal Server Error"});

    }
}

const checkLogin = async(req,res) =>{
    const token = req.cookies.token;
    console.log(token)
    try{
        if(token){
            
           
            const {sub,username} = jwt.verify(token,process.env.SECRET_KEY);
            if(sub){
                const user = await User.findOne({_id:sub,username:username});
                if(user){
                    
                    return res.status(200).json({message:'User Found'});
                }else{
                    return res.status(404).json({message:"No User Found"});
                }
            }else{
                return res.status(401).json({message:"Unauthorized Access"});
            }
        }else{
            return res.status(404).json({message:"Token Not Found"});
        }
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}


module.exports = {handleLogin,handleLogout,checkLogin};