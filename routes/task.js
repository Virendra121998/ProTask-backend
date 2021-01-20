var express=require('express');
var router=express.Router();

var user=require('../Models/User');

router.get('/getAllUsers',(req,res)=>{

    var Users=user.find({}).then((result)=>{
        let c=1;
        console.log(result)
        var listOfUser=result.map((u)=>{
            let obj={};
            obj['label']=u.username;
            obj['value']=c;
            c++;
            return obj;
        })
        res.send(listOfUser).status(200);
    }).catch((err)=>{
        console.log(err);
    })
})


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

module.exports=router;