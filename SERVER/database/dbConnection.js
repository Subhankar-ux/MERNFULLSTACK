import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN_STACK_TASK_MANAGEMENt"
    }).then(()=>{
        console.log("Connected to db successfully");
    }).catch((err)=>{
        console.log(`some error occurred while connecting to db:${err}`);
    });
}