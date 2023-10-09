// import React from "react";
import { Link , redirect } from "react-router-dom";
import {tokenLoader } from '../utility/index' ;
// import transitions from "bootstrap";

const Header = ({ active, setActive,user ,setUser}) => {
// const Header = ({ active, setActive, user, handleLogout }) => {
//   const userId = user?.uid;
    const token = tokenLoader() ;
    console.log(token,'header');
    //------- logout 
    function LogOut () {
        localStorage.removeItem('data');
        localStorage.removeItem('expiration');
        setUser(null)
        return redirect('/auth') ;
    } ;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid bg-faded padding-media">
                <div className="container padding-media">
                    <nav className="navbar navbar-toggleable-md navbar-light">
                        <button className="navbar-toggler mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        data-bs-parent="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle Navigation">
                            <span className="fa fa-bars"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"  >
                            {user &&<>
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <li className={`nav-item nav-link ${ active === "home" ? "active" : "" }`} onClick={() => setActive("home")} >home</li>
                                </Link>
                                {user.LoginUser.RoleName === "Writer" && 
                                <Link to="/create" style={{ textDecoration: "none" }}>
                                    <li className={`nav-item nav-link ${ active === "create" ? "active" : "" }`} onClick={() => setActive("create")} >create</li>
                                </Link>
                                }</>}
                            </ul>
                            <div className="row g-3">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {!user &&
                                    <Link to="/auth" style={{ textDecoration: "none" }}>
                                        <li className={`nav-item nav-link ${ active === "login" ? "active" : "" }`} onClick={() => setActive("login")} >login</li>
                                    </Link>}
                                {user && <>
                                    <div className="profile-logo">
                                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"alt="logo"
                                        style={{width: "30px",height: "30px",borderRadius: "50%",marginTop: "12px",}}/>
                                    </div>
                                    <p style={{ marginTop: "12px", marginLeft: "5px" }}>{user?.LoginUser.DisplayName}</p>
                                    <Link to="/auth" style={{ textDecoration: "none" }}>
                                        <li className={`nav-item nav-link ${ active === "login" ? "active" : "" }`} onClick={LogOut} >Logout</li>
                                    </Link> </>}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Header;

