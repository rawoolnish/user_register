import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/userActions';

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const user = useSelector((state) => state.userLogin);
    const { UserInfo, error } = user;
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(credentials.email, credentials.password));

        if (error) {
            props.showAlert("Invalid Credentials", "danger");
        }

    };
    useEffect(() => {
        if (UserInfo) {
            props.showAlert("Logged in Successfully", "success");
            navigate('/')
        }
    }, [UserInfo, navigate, props])

    return (
        <div>
            <div className="container col-md-4 mt-3">
                <h2>Log In to continue </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <div className="mb-3 mt-2">
                    <Link className="mb-2" to="/signup">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
