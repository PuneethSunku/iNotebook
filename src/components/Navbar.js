import React , {useEffect} from 'react'
import {Link , useNavigate, useLocation} from 'react-router-dom'
    
const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
        console.log(location);
    }, [location]); //Here we write [location] bcoz whenever the location changes run this function React.useEffect
    
    let navigate = useNavigate();
    const handleLogOut = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    const handleGetUserDetails = async () => {
        navigate('/userDetails');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/"> Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                    </li>
                </ul>
                {!localStorage.getItem('token') ? 
                    <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
                    </form> : 
                    <div> 
                        <i className="fa-solid fa-user" onClick={handleGetUserDetails} style={{ color: 'white', backgroundColor: 'black', borderRadius: '50%', padding: '10px', cursor: 'pointer', fontSize: '24px' }}></i> 
                        <button className="btn btn-primary mx-1" onClick={handleLogOut} >LogOut</button>
                    </div>  
                }
            </div>
        </nav>
    )
}

export default Navbar;


