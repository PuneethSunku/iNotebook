import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; //Instead of useHistory

const SignUp = (props) => {
  const[ credentials, setCredentials] =useState({name:"", email: "", password:"", cpassword:""});

  let navigate = useNavigate();

  const handleSubmit = async(event)=>{
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: credentials.name, email: credentials.email,password: credentials.password}),
    });
    const json = await response.json(); 
    console.log(json);
    
    if(json.success){ //If success is true
      //Save the auth token and Redirect
      localStorage.setItem('token', json.authToken);
      console.log(localStorage.getItem('token'));
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    }
    else{
      props.showAlert(json.error, "danger");
    }
  }

  const onChange =(event)=>{
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }
  return (
    <div className="mt-2">
      <h2 className="my-2">Create an account to use iNoteboook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-1">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Enter Name" required/>
        </div>
        <div className="form-group my-1">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} placeholder="Enter email" required />
        </div>
        <div className="form-group my-1">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group my-1">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Password" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
   