import { Link  , useSubmit, useRouteLoaderData } from "react-router-dom";

const Header = ({ active, setActive}) => {
    //----------------------------------
    const submit = useSubmit() ;
    const token = useRouteLoaderData('root'); 
    const roleName  =localStorage.getItem('RoleName') ;
    const displayName  =localStorage.getItem('DisplayName');
    //----------------------------------
    
    return (
        <nav className="navbar navbar-expand-lg sticky-top" style={{backgroundColor : '#ccc'}}>
            <div className="container-fluid bg-faded padding-media  " style={{backgroundColor : '#ccc'}}>
                <div className="container padding-media">
                    <nav className="navbar navbar-toggleable-md navbar-light">
                        <button className="navbar-toggler mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        data-bs-parent="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle Navigation">
                            <span className="fa fa-bars"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"  >
                            {token && <>
                                <Link to="/" style={{ textDecoration: "none" }} end='true'>
                                    <li className={`nav-item nav-link ${ active === "home" ? "active" : "" }`} onClick={() => setActive("home")} >home</li>
                                </Link>
                                {token && roleName === "Writer" && 
                                <Link to="/create" style={{ textDecoration: "none" }}>
                                    <li className={`nav-item nav-link ${ active === "create" ? "active" : "" }`} onClick={() => setActive("create")} >create</li>
                                </Link>
                                }</>}
                            </ul>
                            <div className="row g-3">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {!token &&
                                    <Link to="/auth?mode=login" style={{ textDecoration: "none" }}>
                                        <li className={`nav-item nav-link ${ active === "login" ? "active" : "" }`} onClick={() => setActive("login")} >Login</li>
                                    </Link>}
                                {token && <>
                                    <div className="profile-logo">
                                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"alt="logo"
                                        style={{width: "30px",height: "30px",borderRadius: "50%",marginTop: "12px",}}/>
                                    </div>
                                    <p style={{ marginTop: "12px", marginLeft: "5px" }}>{displayName}</p>
                                    <Link style={{ textDecoration: "none" }} >
                                        <li className={`nav-item nav-link ${ active === "logout" ? "active" : "" }`} onClick={() => {
                                            setActive("logout") ;
                                            submit(null , {action : '/logout' , method : 'post'})
                                        }}>
                                            Logout
                                        </li>
                                        </Link>
                                    </>}
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

