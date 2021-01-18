var express=require('express');
var router=express.Router();

var user=require('../Models/User');

router.put('/addMyTask',(req,res)=>{
      var User=user.findOne({email:req.body.email}).then((result)=>{
      var newUser=User;
      newUser.myTask=req.body.task;
      newUser.save().then(()=>{
        res.send("Delegated Task");
       }).catch((err)=>{
        res.send(err);
       })
    }).catch((err)=>{
        res.send(err);
    })
});

router.put('/deletemyTask',(req,res)=>{
    var User=user.findOne({email:req.body.email}).then((result)=>{
        var newUser=User;
      newUser.myTask=req.body.task;
      newUser.save().then(()=>{
        res.send("Delegated Task");
       }).catch((err)=>{
        res.send(err);
       })
     
    }).catch((err)=>{
        res.send(err);
    });
})

router.get('/delegateTask',(req,res)=>{
        var User=user.findOne({email:req.body.email}).then((result)=>{
            var newUser=User;
            newUser.visibleTask=req.body.task;
            newUser.save().then(()=>{
                res.send("Delegated Task");
            }).catch((err)=>{
                res.send(err);
            })
            
    })
})