import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    let navigate = useNavigate();

    const Handlesubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = credentials;
        const response = await fetch(`/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success === true) {
            props.showAlert("User created Successfully", 'success')
            navigate("/login")
        } else {
            props.showAlert(" User Already exists", "danger")
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className=' container col-md-4 mt-3'>
            <h2>Create User Account</h2>
            <form onSubmit={Handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            <div className="mb-3 mt-2">
                <Link className="mb-2" to="/login">Already have an Account? </Link>
            </div>
        </div>
    )
}

export default Signup