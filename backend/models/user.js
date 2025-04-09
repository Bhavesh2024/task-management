const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        default:''
    },
    username:{
        type:String,
        unique:true,
    },
    image:{
        type:String,
    },
    created_at:{
        type:Date,
        default:Date.now()
    }

})

const User = mongoose.model('User',userSchema)

module.exports = User;