import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//---------------------------------------------
const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleName : ""
};

const userSchema = {
    userName: "",
    displayName: "",
    password: "",
    roleId: 0,
    isActive: true,
    roleName: ""
}

//-----------------------------------------
const Auth = ({setActive , authUpdated} ) => {
    const [state, setState] = useState(initialState);
    const [signUp, setSignUp] = useState(false);
    const { email, password, firstName, lastName, confirmPassword ,roleName} = state;
    const navigate = useNavigate();
    //---------------------------------------- handle change
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    //---------------------------------------- handle auth
    const handleAuth =  async (e) => {
        e.preventDefault();
        if (!signUp) {
            if (email && password) {
            const fetchData = async() => {
                const response = await fetch(`https://51.81.20.148:7373/User/Login/${email}/${password}`);
                if(!response.ok){throw new Error('Could not authenticate user!');}
                const resData = await response.json();
                return resData;
            };
            try{
                const data = await fetchData();
                authUpdated(data);
                //-----------------------
                const token = data.Token ;
                localStorage.setItem('token' , token) ;
                localStorage.setItem('userData', {...data.LoginUser}) ;
                //-----------------------------------
                const expiration = new Date();
                expiration.setHours(expiration.getHours()+1) ;
                localStorage.setItem('expiration' , expiration.toISOString()) ;
                navigate("/");
                setActive("home");
                // toast.success(`Well Come Back ${data?.LoginUser.DisplayName}`)
            }catch(error){return toast.error('Invalid User Name or Password');}
            //------------------------------------
            } else {
            return toast.error("All fields are mandatory to fill");
            }
        } else {
            if (password !== confirmPassword) {
            return toast.error("Password is not matching");
            }
            if (firstName && lastName && email && password) {
            const sendData = async() => {
                const response = await fetch('https://51.81.20.148:7373/User/Register',
                {method : 'POST' , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify({
                ...userSchema,
                userName : email,
                displayName : `${firstName} ${lastName}`,
                password : password,
                roleName : roleName ,
                roleId: roleName === "Writer"?0:roleName === "Anonymous"?2:1,
                })})
                if(!response.ok){return toast.error('Invalid Data!')}
            };
            try{
                sendData();
                setSignUp(false)
            }catch(error){return toast.error('Invalid Data!');}
            } else {
            return toast.error("All fields are mandatory to fill");
            }
        }
    };
    //------------------------------------------------------
    return (
        <div className="container-fluid mb-4">
            <div className="container">
                <div className="col-12 text-center">
                    <div className="text-center heading py-2">{!signUp ? "Sign-In" : "Sign-Up"}</div>
                </div>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form className="row" onSubmit={handleAuth}>
                            {signUp && (<>
                                <div className="col-6 py-3">
                                    <input type="text" className="form-control input-text-box"placeholder="First Name"name="firstName"value={firstName} onChange={handleChange} />
                                </div>
                                <div className="col-6 py-3">
                                    <input type="text" className="form-control input-text-box" placeholder="Last Name" name="lastName" value={lastName} onChange={handleChange} />
                                </div>
                                <div className="form-check-inline mx-2 d-flex justify-content-between">
                                    <input type="radio"className="form-check-input"value="Writer"name="roleName"
                                        checked={roleName === "Writer"}onChange={handleChange}/>
                                    <label htmlFor="roleName" className="form-check-label">Author&nbsp;</label>
                                    <input type="radio" className="form-check-input" value="Anonymous" name="roleName"
                                        checked={roleName === "Anonymous"} onChange={handleChange} />
                                    <label htmlFor="roleName" className="form-check-label">Reader</label>
                                </div>
                            </>)}
                            <div className="col-12 py-3">
                                <input type="email" className="form-control input-text-box"
                                    placeholder="Email" name="email" value={email}onChange={handleChange}/>
                            </div>
                            <div className="col-12 py-3">
                                <input type="password" className="form-control input-text-box"
                                    placeholder="Password" name="password" value={password} onChange={handleChange} />
                            </div>
                            {signUp &&
                            <div className="col-12 py-3">
                                <input type="password" className="form-control input-text-box"
                                    placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                            </div>
                            }
                            <div className="col-12 py-3 text-center">
                                <button className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`} type="submit" > {!signUp ? "Sign-in" : "Sign-up"} </button>
                            </div>
                        </form>
                        {!signUp ? (
                            <div className="text-center justify-content-center mt-2 pt-2">
                                <p className="small fw-bold mt-2 pt-1 mb-0"> Don't have an account ?&nbsp;
                                    <span className="link-danger" style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => setSignUp(true)}> Sign Up </span>
                                </p>
                            </div>
                        ) : (
                            <div className="text-center justify-content-center mt-2 pt-2">
                                <p className="small fw-bold mt-2 pt-1 mb-0"> Already have an account ?&nbsp;
                                    <span style={{textDecoration: "none",cursor: "pointer",color: "#298af2",}} onClick={() => setSignUp(false)}> Sign In </span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth