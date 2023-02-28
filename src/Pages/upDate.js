import React,{useState,useEffect, useRef} from "react";
import {Link,useParams, unstable_HistoryRouter} from 'react-router-dom'

import {toast} from "react-toastify";
import axios from "axios";

const initialState1={
    
    Name : "",
    Address :"",
    Mobile :""
}
export default function UpdateCrud(){
    const[data,setData]=useState(initialState1);
    const {Name,Address,Mobile}=data;
const{RollNo}=useParams();


      useEffect(()=> {
        axios.get(`http://localhost:4000/api/student/${RollNo}`)
        .then((response)=> setData({...response.data[0]}))
      },[RollNo]);
      console.log(data)

      
    
    const handlesubmit=(e)=>{
        
        e.preventDefault();
        
        if(!Name||!Address||!Mobile){
            toast.error("Please Provide Value");
           
        }if(!RollNo){
            axios.post("http://localhost:4000/api/student",{
               
            Name,
            Address,
            Mobile,
        })
       
        .then(()=>{
            setData({Name:"",Address:"",Mobile:""});
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Contact added successfully");
         
        }
        else{
            
            axios.put(`http://localhost:4000/api/put/${RollNo}`,{
                
            Name,
            Address,
            Mobile,
        })
       
        .then(()=>{
            setData({Name:"",Address:"",Mobile:""});
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Contact updated successfully");
         
        }
        setTimeout(()=>history.pushState("/"),500);
    }

    const handleInputChange=(e)=>{
        
         const {name,value}=e.target;
           setData({...data,[name]:value});
         
    //setdata(e.target.value);
    }
    return(
        <div>
            <h1>hai</h1>
            <form style={{
            margin:"auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent:"center"
        }} onSubmit={handlesubmit}>
            {/* <label htmlFor="RollNo">RollNo</label>
            <input
            type= "text"
            id="RollNo"
            name="RollNo"
            placeholder="Enter RollNo"
            value={RollNo}
            onChange={handleInputChange}
            
            /><br/> */}
<label htmlFor="Name">Name</label>
<input
            type= "text"
            id="Name"
            name="Name"
            placeholder="Enter Name"
            value={Name || ""}
            onChange={handleInputChange}
            
            /><br/>
            <label htmlFor="Address">Address</label>
<input
            type= "text"
            id="Address"
            name="Address"
            placeholder="Enter Address"
            value={Address || ""}
            onChange={handleInputChange}
            /><br/>
            <label htmlFor="Mobile">Mobile</label>
            <input
            type= "text"
            id="Mobile"
            name="Mobile"
            placeholder="Enter Mobile"
            value={Mobile || ""}
            onChange={handleInputChange}
            /><br/>
<input type="submit" value="Update" />
</form>
        </div>
    );
}