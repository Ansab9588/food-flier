import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



export default function Login() {

  const [credentials, setCredentials] = useState({email:"", password:""});

  let navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();     // Synthetic Event
        const response = await fetch("http://localhost:4000/api/loginuser", {
            method:"POST",  
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        })
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Invalid Credentials, Try Again!");
        }
        else{
            localStorage.setItem("authToken", json.authToken);
            navigate("/");
        }
    }

    const handleChange = (event) =>{
        setCredentials({...credentials, [event.target.name]:event.target.value});
    }

  return (
    <div>
      <div className="form-group">
      <form onSubmit={handleSubmit}>
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
        <Link to="/createuser" className="m-3 btn btn-danger">Register as new user?</Link>
      </form>
      </div>
    </div>
  )
}
