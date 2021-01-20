const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const validator=require('validator');

var Schema=mongoose.Schema;
var schema=new Schema({
    email:{type:String,required:true,validate:validator.isEmail},
    password:{type:String,required:true},
    username:{type:String,required:true},
    myTask:[{type:String}],
    visibleTask:[{type:String}]
});

schema.pre('save',function(next){
    var User=this;
    if(User.isModified()){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(User.password,salt,(err,hash)=>{
                User.password=hash;
                next();
            })
        })
    }
    else
     next();
});

schema.statics.findByCredentials=function(email,password){
    var User=this;
    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject
        }

        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res)
                 resolve(user)
                else
                 reject(); 
            });
        });
    });
}

var user=mongoose.model('user',schema);
module.exports=user;