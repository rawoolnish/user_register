import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from '../redux/actions/userActions';


const Navbar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    let location = useLocation();


    const Handlelogout = () => {
        dispatch(logout())
        navigate('/')
        props.showAlert(" Logged Out Successfully", "success");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} aria-current="page" to="/About">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('UserInfo') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login"> Log in</Link>
                        <Link className="btn btn-primary mx-1" to="/signup"> Signup</Link>
                    </form> : <Link className="btn btn-primary mx-1" onClick={Handlelogout} to="/login"> Log out</Link>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar