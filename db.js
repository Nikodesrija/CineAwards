const mongoose=require('mongoose');

const mangodburl='mongodb://localhost:27017/pj1db';


mongoose.connect(mangodburl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db =mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongodb server");
});
db.on('disconnected',()=>{
    console.log("disconnected to mongodb server");
});
db.on('error',(err)=>{
    console.error("mongodb  connection error ",err);
});
//export the database connection
module.exports=db;
