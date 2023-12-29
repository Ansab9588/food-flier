import React from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }




  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand fs-3 fst-italic fw-bold" to="/">
          Foodie Flier
        </Link>
        <button
          className="navbar-toggler"  
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active text-white fs-6 fw-bold" to="/">
                Home
              </Link>
            </li>
            {(localStorage.getItem("authToken")) ? 
              <li className="nav-item">
              <Link className="nav-link active text-white fs-6 fw-bold" to="/orders">
                Orders
              </Link>
            </li>
            :""}
          </ul>

          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-primary mx-1 fw-bold" to="/Login">
                Login
              </Link>
              <Link className="btn bg-white text-primary mx-1 fw-bold" to="/createuser">
                SignUp
              </Link>
            </div>
            :
            <div>
            <div className='btn bg-white text-primary mx-1 fw-bold'>
            <Link to="/cart">
                My Cart
              </Link>
              <Badge pill bg='danger'> 3 </Badge> 
            </div>
            <div className='btn bg-white text-danger mx-2 fw-bold' onClick={handleLogout}>
              Logout
            </div>
            </div>  
            }
        </div>
      </nav>
    </div>
  )
}
