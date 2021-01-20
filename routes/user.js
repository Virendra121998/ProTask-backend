var express=require('express');
var router=express.Router();

var user=require('../Models/User');

router.post('/signup',(req,res)=>{
    user.findOne({email:req.body.email}).then((result)=>{
        if(result)
          res.send("User already Exists");
        else
        {
            
            var User=new user({
                email:req.body.email,
                password:req.body.password,
                username:req.body.username,
                myTask:[],
                visibleTask:[]
            });
            User.save().then((result)=>{
                console.log("User Created");
                res.send("User Created");
            }).catch((err)=>{
                res.send(err)
            });
        }  
    }).catch((err)=>{
        res.send(err);
    })
});

router.post('/login',(req,res)=>{
    user.findByCredentials(req.body.email,req.body.password).then((result)=>{
        res.send("Successful Login");
    }).catch((e)=>{
        res.status(400).send("Could not find user");
    })
})

module.exports=router;