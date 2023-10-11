import {createBrowserRouter , RouterProvider  ,Link, } from 'react-router-dom' ;
import { useState } from "react";
import "./style.scss";
import "./media-query.css";
import RootLayout from './pages/RootLayout' ;
import NotFound from './pages/NotFound' ;
import Home , {loader as articlesLoader } from './pages/Home' ;
import Detail from './pages/Detail' ;
import AddEditArticle ,{action as manipulateEventAction}  from './pages/AddEditArticle' ;
import Auth ,{action as authAction} from './pages/Auth' ;
import {tokenLoader  } from './utility/index' ;
import {action as logoutAction }from './pages/Logout' ;
import {action as deleteAction ,actionDeactivateHandler ,actionActivateHandler}from './components/ArticlesList' ;
//-------------------------------------



function App() {
  //------------------------- Active state
  const [active, setActive] = useState("home");
  //------------------------- get data
  const [getingData, setGetingData] = useState([]);
  const getData = (data) => {
    setGetingData(data) ;
  }
  //----- user
  //----------------------------------------ROUTES
  const router = createBrowserRouter([
    {path: '/' , element :  <RootLayout setActive={setActive} active={active} /> ,id:'root',loader: tokenLoader , errorElement : <NotFound/> ,children:[
      {index : true , element : <Home setActive={setActive} liftData={getData}   /> ,id:'data' , loader : articlesLoader} ,
      {path : 'detail/:articleID' , element : <Detail getingData={getingData} />},
      {path : 'create' , element : <AddEditArticle   />, action :manipulateEventAction },
      {path : 'update/:articleID' , element : <AddEditArticle  getingData={getingData}/> , action :manipulateEventAction},
      {path : 'auth' , element : <Auth setActive={setActive} /> ,
      action : authAction , errorElement : <div className="alert alert-danger" role="alert">
        invalid user name or password!
      <Link className='alert-link' to='/' >  kindly click here</Link></div>},
      {path : 'logout', action: logoutAction},
      {path : 'delete', action: deleteAction},
      {path : 'activate', action: actionActivateHandler},
      {path : 'deactivate', action: actionDeactivateHandler}
    ]},
  ])
  //--------------------------------------
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
