import React,{useState,useEffect, useRef} from "react";
import {Link,useParams, unstable_HistoryRouter} from 'react-router-dom'
import "./AddEdit.css";
import {toast} from "react-toastify";
import axios from "axios";

const initialState={
    RollNo :"",
    Name : "",
    Address :"",
    Mobile :""
}
function AddEdit(){
    const [data,setdata]=useState(initialState);
      const {RollNo,Name,Address,Mobile}=data;

     // const{RollNo}=useParams();
    //   useEffect(()=> {
    //     axios.get(`http://localhost:4000/api/student/${RollNo}`).then((response)=> setdata({...response.data[0]}))
    //   },[RollNo]);
    
    const handlesubmit=(e)=>{
        debugger;
        e.preventDefault();
        
        if(!RollNo||!Name||!Address||!Mobile){
            toast.error("Please Provide Value");
           
        }
        else{
            console.log("test")
            axios.post("http://localhost:4000/api/student",{
                RollNo ,
                Name,
                Address,
                Mobile,
            })
           
            .then(()=>{
                setdata({RollNo:"",Name:"",Address:"",Mobile:""});
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Contact added successfully");
             setTimeout(()=>history.pushState("/"),500);
        }
    }

    const handleInputChange=(e)=>{
        
          const {name,value}=e.target;
           setdata({...data,[name]:value});
         
    //setdata(e.target.value);
    }
    
    return(
        <div style={{marginTop:"100px"}}>
        <form style={{
            margin:"auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent:"center"
        }} onSubmit={handlesubmit}>
            <label htmlFor="RollNo">RollNo</label>
            <input
            type= "text"
            id="RollNo"
            name="RollNo"
            placeholder="Enter RollNo"
            value={RollNo}
            onChange={handleInputChange}
            
            /><br/>
<label htmlFor="Name">Name</label>
<input
            type= "text"
            id="Name"
            name="Name"
            placeholder="Enter Name"
            value={Name}
            onChange={handleInputChange}
            
            /><br/>
            <label htmlFor="Address">Address</label>
<input
            type= "text"
            id="Address"
            name="Address"
            placeholder="Enter Address"
            value={Address}
            onChange={handleInputChange}
            /><br/>
            <label htmlFor="Mobile">Mobile</label>
            <input
            type= "text"
            id="Mobile"
            name="Mobile"
            placeholder="Enter Mobile"
            value={Mobile}
            onChange={handleInputChange}
            /><br/>
<input type="submit" value="Save" />
<br/>
<Link to="/">
<input type="button" value="GO Back"/>
</Link>
        </form>
        </div>
    );
}
export default AddEdit;