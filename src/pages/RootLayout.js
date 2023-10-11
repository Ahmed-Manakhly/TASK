import {Outlet,useLoaderData, useSubmit} from 'react-router-dom' ;
import Header from '../components/Header'
import {useEffect} from 'react' ;
import { getTokenDuration } from '../utility/index';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from '../components/ScrollToTop' ;
//----------------------------------

const RootLayout = ({ active, setActive, user , setUser}) => {
    //-------------------------------------------
    const token = useLoaderData() ;
    const submit = useSubmit() ;
    useEffect(() => {
        if(!token){return ;}
        //-----------------------------------------------------
        if(token === 'EXPIRED') { 
            submit(null , {action : '/logout' , method : 'post'} )
            return ;
        }
        const tokenDuration = getTokenDuration() ;
        setTimeout(()=>{submit(null , {action : '/logout' , method : 'post'} )},tokenDuration); 
    }, [token , submit]);
    //----------------------------------------

    return (<>
        <Header setActive={setActive} active={active} user={user} setUser={setUser}/>
        <ScrollToTop />
        <ToastContainer position="top-center" />
        <main>
            <Outlet/>
        </main>
    </>)
}

export default RootLayout
