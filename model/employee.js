const mongoose=require('mongoose')//initialization


//schema definition
const Schema=mongoose.Schema;

const Employee_Detail=new Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})
const Employee_Data=mongoose.model('employeedetail',Employee_Detail)
module.exports=Employee_Data