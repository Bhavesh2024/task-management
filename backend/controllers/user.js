require('dotenv').config();

const { use } = require('passport');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const getUserInfo = async(req,res) =>{
       const user = req.user;
       try{
           if(user){
                const result = await User.findOne({username:user.username});
                if(result){
                    return res.status(200).json({user:result});
                }else{
                    return res.status(404).json({message:"User Not Found"});
                }
           }
       }catch(err){
          console.log(err.message);
          return res.status(500).json({message:"Internal Server Error"});
       }
       return res.status(200).json({message:"Gettting Successfully Request"}); 
}

const editUserInfo =  async(req,res) =>{
    try{
        const user = req.user;
        const data = req.body;
        if(user){
            const updateUser = await User.updateOne({
             _id:user.id,
             username:user.username,   
            },{$set:data})
            if(data.username && updateUser.username !== data.username){
                 const token = jwt.sign({sub:updateUser._id,username:updateUser.username},process.env.SECRET_KEY,{expiresIn:'24h'});
                 res.cookie('token',token,{
                    httpOnly:true,
                    credentials:true,
                    maxAge:24*60*60*1000
                 })
            }
            return res.status(200).json({message:"User Information Updated Successfully"});
        }else{
            return res.status(404).json({message:"User Not Found"});
        
        }
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}


const removeUser =  async(req,res) =>{
    try{
        if(req.user){
            await User.deleteOne({
                _id:req.user.id,
                username:req.user.username
            });
            return res.status(200).json({message:"User Removed Successfully"});
        }else{
            return res.status(404).json({message:"User Not Found"});
        }  
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const editAvatar = async (req, res) => {
    try {
        let { image } = req.body;
        const { file, user } = req;

        if (file && user) {
            const existedImage = await User.findOne({ username: user.username });

            if (existedImage && existedImage.image) {
                const extractFileName = existedImage.image.split('/').pop();
                fs.unlinkSync(path.join(__dirname, '../uploads/avatar/', extractFileName));
            }

            image = `${process.env.SERVER_URL}/avatar/${file.filename}`;
            await User.updateOne(
                { username: user.username },
                { $set: { image } }
            );

            return res.status(200).json({ message: 'Avatar updated successfully!', image });
        }

        res.status(400).json({ message: 'No file or user data provided.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating avatar.' });
    }
};

const uploadAvatar = async(req,res) =>{
    try{
        let {image} = req.body;
        let {file,user} = req;
        if(file){
            if(user){
                image = `${process.env.SERVER_URL}/avatar/${file.filename}`;
                console.log(image);

                await User.updateOne({username:user.username},{$set:{
                    image:image,
                }})
                return res.status(200).json({message:"Image Uploaded Successfully"});
            }else{
            return res.status(401).json({message:"Unauthorized Access"});
            }
        }else{
            return res.status(400).json({message:"Image Not Uploaded"});
        }
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

module.exports = {getUserInfo,editUserInfo,removeUser,uploadAvatar,editAvatar};
