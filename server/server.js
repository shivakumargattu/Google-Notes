import express from "express"
import mysql from "mysql"
import cors from "cors"


const app =express();
app.use(cors())


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"curd"
})

app.get("/",(req,res)=>{
    const sql="SELECT * FROM STUDENT";
    db.query(sql,(err,result)=>{
        if(err) return res.json({message:"Error inside the server"})
            return res.json(result)
    })
})
app.listen(5000,()=>{
    console.log("server running ")
})