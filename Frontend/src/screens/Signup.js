import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", geolocation:""});

    let navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();     // Synthetic Event
        const response = await fetch("http://localhost:4000/api/createuser", {
            method:"POST",  
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        })
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert('Enter Valid Credentials');
        }
        else{
            alert("Credentials Added Successfully");
            navigate("../login")
        }
    }

    const handleChange = (event) =>{
        setCredentials({...credentials, [event.target.name]:event.target.value});
    }

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={handleChange}
        />
        </div>
        <div className="form-group">
          <label htmlFor="name">Location</label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={credentials.geolocation}
            onChange={handleChange}
        />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user?</Link>
      </form>
      </div>
    </>
  );
}
