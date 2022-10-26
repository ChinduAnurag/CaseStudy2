// Task1: initiate app 
const PORT=process.env.PORT||3000

const express=require('express')
const app=express()
app.use(express.json())//json related
app.use(express.urlencoded({extended:true}))//files related
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
const mongoose=require('mongoose');
const Employee_Data=require('./model/employee')
mongoose.connect('mongodb+srv://ChinduAnurag:model52@cluster0.jrwfyam.mongodb.net/employeedb?retryWrites=true&w=majority')
.then(()=>{
    console.log("My mongodb is connected successfully")
})
.catch(error=>{
    console.log("connection error"+error)
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',(re,res)=>{
    Employee_Data.find().then(function(data){
res.send(data)
    })
})



//TODO: get single data from db  using api '/api/employeelist/:id'


app.get('/api/employeelist/:id',(req,res)=>{
    Employee_Data.findOne({"_id":req.params.id}).then(function(data){
res.send(data)
    })
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{

    try {
    
        let item=req.body
        console.log("item ....",item);
        const user=new Employee_Data(item)// comparing incoming data with model
        const saveduser=await user.save()// save data in db
        res.send(saveduser)
    
        
    } catch (error) {
        
        console.log(error)
    }
    
       
    })
    

//TODO: delete a employee data from db by using api '/api/employeelist/:id'


app.delete('/api/employeelist/:id',(req,res)=>{
    var id = req.params.id;
    Employee_Data.deleteOne({_id:id}).then(function(data){
    res.send(data)
    })
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async(req,res)=>{
 
    
     const newname=req.body.name
    const newlocation=req.body.location
    const newposition=req.body.position
    const newsal=req.body.salary
    console.log(">>>>",newname)

    Employee_Data.findByIdAndUpdate({_id:req.body._id},{$set:{name:newname,location:newlocation,position:newposition,salary:newsal}},(err,data)=>{
       
       if(data == null){
           res.send("nothing found")
       }else{
           res.send()
       }
    })
   
         
   })
   

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

//Running server at  PORT 3000

app.listen(PORT,()=>
{
    console.log(`server is connecting on ${PORT}`)
})



