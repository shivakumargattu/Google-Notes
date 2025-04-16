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
    const sql="select * from notes"
   db.query(sql,(err,result)=>{
    if(err) return res.json({message:"error is inside server "})
        return res.json(result)
   })

})
app.listen(5000,()=>{
    console.log("server running ")
})