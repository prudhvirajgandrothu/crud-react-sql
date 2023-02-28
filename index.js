import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"Kaswi@786",
    database:"firstproject"
});

const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());

app.get("/api/student",(req,res) =>{
    const sqlGet = "SELECT * FROM stud_data";
db.query(sqlGet,(err,result) =>{
    
    res.send(result)});     
});

app.get("/api/student/:RollNo",(req,res) =>{
    const { RollNo } =req.params;
    const sqlGet = "SELECT * FROM stud_data WHERE RollNo=?";
db.query(sqlGet,RollNo,(err,result) =>{
    if(err){
        console.log(err);
    }
    res.send(result)});     
});

app.put("/api/put/:RollNo",(req,res) =>{
    const { RollNo } =req.params;
    const{Name,Address,Mobile}=req.body;
    const sqlUpdate = "UPDATE stud_data SET Name= ?,Address=?,Mobile= ? WHERE RollNo=?";
db.query(sqlUpdate,[Name,Address,Mobile,RollNo],(err,result) =>{
    if(err){
        console.log(err);
    }
    res.send(result)});     
});

app.post("/api/student",(req,res) =>{
const {RollNo,Name,Address,Mobile}= req.body;
    const sqlInsert = "INSERT INTO stud_data (RollNo,Name,Address,Mobile) VALUES (?, ?, ?, ?)";
db.query(sqlInsert, [RollNo,Name,Address,Mobile],(err,result) =>{
    console.log("error",err);
    console.log("result",result);
    res.send("Hello From Kaswi")});
});

app.delete("/api/remove/:RollNo",(req,res) =>{
    const { RollNo }= req.params;
        const sqlremove = "DELETE FROM stud_data WHERE RollNo = ?";
        
    db.query(sqlremove, RollNo ,(err,result) =>{
        if(err){
            console.log(err);
        }
        // console.log("error",err);
        // console.log("result",result);
        //res.send("Hello From Kaswi")
    });
    });
// app.post("/api/student",(req,res) =>{
//     const sqlInsert = "INSERT INTO stud_data (RollNo,Name,Address,Mobile) VALUES ('2','Satish','Palakol','8989739122')";
// db.query(sqlInsert,(err,result) =>{
//     console.log("error",err);
//     console.log("result",result);
//     res.send("Hello From Kaswi")});
// });
    
app.listen(port,()=>console.log("server started"));