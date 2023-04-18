import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";


import { updateUser } from "../redux/actions/userActions";



const Profile = (props) => {
    const dispatch = useDispatch();



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const userLogin = useSelector((state) => state.userLogin)
    const { UserInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { error, success } = userUpdate;


    const ref = useRef(null)
    const refClose = useRef(null)

    const Handleupdate = () => {
        ref.current.click();
    }

    const UpdateUserHandle = (e) => {
        e.preventDefault();
        refClose.current.click();
        dispatch(updateUser({ name, email, password }));
        if (success) {
            props.showAlert("User Updated Successfully", "success")
        }
        if (error) {
            props.showAlert(" Something went wrong", "daner")
        }

    }

    useEffect(() => {
        if (UserInfo) {
            setName(UserInfo.name)
            setEmail(UserInfo.email)
        }

    }, [UserInfo])
    return (
        <>
            <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
                {UserInfo ?
                    (<h1 className="d-flex">{`Hii ${UserInfo.name}...Welcome to the Home Page`}</h1>)
                    : (<h1 className="d-flex">Please Log in to view User Details</h1>)}
            </div>
            {UserInfo && <div className="container"><div className="col-md-3">
                <h2>User Details</h2>
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center ">
                            <h5 className="card-title">{UserInfo.name}</h5>
                            <i className="fa-solid fa-file-pen mx-4" style={{ cursor: "pointer" }} onClick={Handleupdate}></i>
                        </div>
                        <p className="card-text">{UserInfo.email}</p>
                    </div>
                </div>
            </div>
                <div>
                    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit User Info</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form >
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" value={name} className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} minLength={5} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                            <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} minLength={5} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                                            <input type="password" placeholder="Enter New Password" className="form-control" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
                                            <div className="form-text" style={password.length < 6 ? { color: "red" } : { color: "green" }}>Password must contain 6 digits or more</div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                                            <input type="password" placeholder="Confirm New Password" className="form-control" name='ConfirmPassword' value={confirmPassword} id="confirmpassword" onChange={(e) => setConfirmPassword(e.target.value)} minLength={6} required />
                                            <div className="form-text" style={{ color: "red" }}>{password && confirmPassword ? (password !== confirmPassword ? "Password are not matching !" : <p className="form-text" style={{ color: "green" }}> Password matched</p>) : ""}</div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button disabled={password ? (password.length < 5 || password !== confirmPassword) : ""} type="submit" className="btn btn-primary" onClick={UpdateUserHandle} >Update Info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>)
}

export default Profile;