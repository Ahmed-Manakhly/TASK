import {Outlet} from 'react-router-dom' ;
import Header from '../components/Header'
// import {tokenLoader , getTokenDuration ,LogOut} from '../utility/index' ;
// import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import React from 'react'

const RootLayout = ({ active, setActive, user , setUser}) => {
    //------------------------- to logout

    //----------------------- to login
    // const token = tokenLoader() ;
    // // const submit = useSubmit() ;
    // useEffect(() => {
    //     if(!token){return ;}
    //     //-----------------------------------------------------
    //     if(token === 'EXPIRED') { 
    //         // submit(null , {action : '/logout' , method : 'post'} )
    //         LogOut();
    //         return ;
    //     }
    //     const tokenDuration = getTokenDuration() ;
    //     setTimeout(()=>{LogOut()},tokenDuration); 
    // },[]);
    //----------------------------------------
    // const [active, setActive] = useState("home");
    return (<>
        <Header setActive={setActive} active={active} user={user} setUser={setUser}/>
        {/* <ScrollToTop /> */}
        <ToastContainer position="top-center" />
        <main>
            <Outlet/>
        </main>
    </>)
}

export default RootLayout
