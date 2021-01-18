var mongoose=require('mongoose');
var express=require('express');
var bodyparser=require('body-parser');
var cors=require('cors');

const app=express();
const port=5000;

app.use(cors());

var router=express.Router();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

mongoose.Promise=global.Promise;

mongoose.connect("mongodb+srv://5Simran_Singh:Simran5@clusteras.zogxl.mongodb.net/ProTask?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{
    app.listen(8000);
    console.log("connected to Database");
}).catch((err)=>{
    console.log(err);
})