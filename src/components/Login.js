import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'; //Instead of useHistory
  
const Login = (props) => {
  const[ credentials, setCredentials] =useState({email: "", password:""});

  let navigate = useNavigate();

  const handleSubmit = async(event)=>{
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: credentials.email,password: credentials.password}),
    });
    const json = await response.json(); 
    console.log(json);

    if(json.success){ //If success is true
      //Save the auth token and Redirect
      localStorage.setItem('token', json.authToken);
      console.log(localStorage.getItem('token'));
      navigate("/");
      props.showAlert("Logged In Successfully", "success");
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
      <h2 className="my-2">Login To Continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" id="password" value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
      </div>
  )
}

export default Login
