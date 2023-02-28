import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Home.css";


 const Home = () =>{
const [data,setData]=useState([]);

const loadData = async () =>{
    let response = await axios.get("http://localhost:4000/api/student");
    setData(response.data);
};

useEffect(()=>{ 
    loadData();
},[])

const deleteContact = (RollNo) =>{
    if(window.confirm("Are You sure that the delete contact ")){
        
        axios.delete(`http://localhost:4000/api/remove/${RollNo}`);
        toast.success("Contact Deleted Successfully");
        setTimeout(() => loadData(),500);
    }
}
    return(
        <div style={{marginTop:"150px"}}>
            <Link to= "/addContact">
            <button className="">AddContact</button>
            </Link>
            <table className="styled-table">
                <thead>
                  <tr>
                    <th style={{textAlign:"center"}}>RollNo</th>
                    <th style={{textAlign:"center"}}>Name</th>
                    <th style={{textAlign:"center"}}>Address</th>
                    <th style={{textAlign:"center"}}>Mobile</th>
                    <th style={{textAlign:"center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return(
                            <tr key={item.id}>
                                {/* <th scope="row">index+1</th> */}
                                <td>{item.RollNo}</td>
                                <td>{item.Name}</td>
                                <td>{item.Address}</td>
                                <td>{item.Mobile}</td>
                                <td>
                                    <Link to={`/update/${item.RollNo}`}>
                                    <button className="">Edit</button></Link>
                                    <button className="" onClick={()=> deleteContact(item.RollNo)}>Delete</button>
                                    <Link to={'/view/${item.id}'}>
                                    <button className="">View</button></Link>
                                </td>
                            </tr>
                        )}
                    
                   ) }
                </tbody>
            </table>
        </div>
    );
}
export default Home;