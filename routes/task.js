var express=require('express');
var router=express.Router();
var task=require('../Models/Task');
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
        
      result.myTask.push(req.body.task);
      result.save().then((resul)=>{
        res.send(resul);
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

router.put('/updateTask',(req,res)=>{
    var list=[];
    function UpdateAssignedBy(){
        return new Promise((resolve,reject)=>{
            user.findOne({"assignedTask.Task":req.body.Task}).then((result)=>{
                
                let i=result.assignedTask.findIndex((e)=>e.Task===req.body.Task)
                result.assignedTask[i].progress=req.body.progress;
                result.save().then((r)=>{
                    console.log(r);
                    resolve(r);
                }).catch((err)=>{
                    reject(err);
                })
            })
        })
    }

    function saveTask(User){
       return new Promise((resolve,reject)=>{
           let i=User.myTask.findIndex((e)=>e.Task===req.body.Task)
           User.myTask[i].progress=req.body.progress;
           User.save().then((result)=>{
               resolve(result)
           }).catch((err)=>{
               reject(err);
           })
       })
    }
    function Update(){
        let User=UpdateAssignedBy();
        User.then((result)=>{
            user.find({"myTask.Task":req.body.Task}).then((result)=>{
                 result.forEach(e=>list.push(saveTask(e)))
                 Promise.all(list).then((result)=>{
                     res.send(result)
                 }).catch((err)=>{
                     res.send(err);
                 })
            })
        })
    }

    Update();
})

router.get('/delegateTask',(req,res)=>{
      var list=[];
      var updatedUsers=[];
      
      function SearchUser(User){
          return new Promise((resolve,reject)=>{
              user.findOne({username:User.username}).then((result)=>{
                  
                  resolve(result);
                 
              }).catch(()=>{
                  reject("error ocuured")
              })
          })

      }

      req.body.listOfUser.forEach((u)=>{
         list.push(SearchUser(u));
      })

      function createTask(User){
        
        return new Promise((resolve,reject)=>{
            var t={
                Task:req.body.Task,
                assignedTo:User.username,
                assignedBy:req.body.username,
                status:"Open",
                progress:0
            }
            resolve(t);
        })
     }

      function UpdateUsers(User){
        
          return new Promise((resolve,reject)=>{
            
              let tt=createTask(User);
              tt.then((rr)=>{
                console.log(req.body.Task,req.body.username);
            
                User.myTask.push(rr);
                
                User.save().then((result)=>{
                    console.log(result);
                  resolve(result)  
                })
              })
              
             
          })
      }
      Promise.all(list).then((result)=>{
           
           result.forEach(u=>{
               updatedUsers.push(UpdateUsers(u))
           }) 
           }).then(()=>{
               user.findOne({username:req.body.username}).then((result)=>{
                   var assignTask={
                       Task:req.body.Task,
                       progress:0,
                       status:"Open"
                   }
                   result.assignedTask.push(assignTask);
                   result.save().then(()=>{
                    
                        Promise.all(updatedUsers).then((resu)=>{
                            console.log(resu);
                            res.send(resu);
                        }).catch((err)=>{
                            res.send(err);
                        })
                       
                   })
               })
           })
           
           
      
})

module.exports=router;