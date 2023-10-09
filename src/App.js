import {createBrowserRouter , RouterProvider , redirect} from 'react-router-dom' ;
import { useState, useEffect } from "react";
import "./style.scss";
import "./media-query.css";
import RootLayout from './pages/RootLayout' ;
import NotFound from './pages/NotFound' ;
import Home from './pages/Home' ;
//--------------------------------------------
import Detail from './pages/Detail' ;
import AddEditArticle from './pages/AddEditArticle' ;
import About from './pages/About' ;
import Auth from './pages/Auth' ;
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {tokenLoader , getTokenDuration } from './utility/index' ;
import {imgs} from './utility/img' ;
//-------------------------------------
let init = true



function App() {
  //-------------------------------- Active state
  const [active, setActive] = useState("home");
  //------------ user state
  const [user, setUser] = useState(null);
  //----------------- check user
  const token = tokenLoader() ;
  useEffect(() => {
      if(!token){return;}
      //-----------------------------------------------------
      if(token === 'EXPIRED') { 
          localStorage.removeItem('token');
          // localStorage.removeItem('data');
          localStorage.removeItem('expiration');
          setUser(null)
          redirect('/auth') ;
      }
      const tokenDuration = getTokenDuration() ;
      setTimeout(()=>{
        // localStorage.removeItem('data');
        localStorage.removeItem('expiration');
        setUser(null)
        redirect('/auth') ;
        return ;
      },tokenDuration); 

  },[token,user]);
  //----------------- get user
  const authUpdatedHandler = (userData)=> {
    setUser(userData);
    // localStorage.setItem('data' , (JSON.stringfy(userData))) ;
  }
  //------------------------- get data
  const [articlesUpdated, setArticlesUpdated] = useState(false);
  const [allArticlesLoading, setAllArticlesLoading] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [activeArticlesLoading, setActiveArticlesLoading] = useState(false);
  const [activeArticles, setActiveArticles] = useState([]);
  // const [filteredData, SetFilteredData] = useState([]);
  //---------
  const fetchAllArticles = async() => {
    setAllArticlesLoading(true)
    const response = await fetch(`https://51.81.20.148:7373/Article/GetAllArticles`);
    if(!response.ok){throw new Error('Could not get Articles!');}
    const resData = await response.json();
    setAllArticles(resData.map(i =>{
      const img = imgs.find(m=>m.name === i.categoryName)
      console.log(img);
      return {...i,imgUrl : img?.img}
    }));
    setAllArticlesLoading(false);
  };
  console.log(allArticles) ;
  //------------------------
  const fetchActiveArticles = async() => {
    setActiveArticlesLoading(true)
    const response = await fetch(`https://51.81.20.148:7373/Article/GetAllArticles?isActive=true`);
    if(!response.ok){throw new Error('Could not get Articles!');}
    const resData = await response.json();
    setActiveArticles(resData.map(i =>{
      const img = imgs.find(m=>m.name === i.categoryName)
      console.log(img);
      return {...i,imgUrl : img?.img}
    }));
    setActiveArticlesLoading(false);
  };
  //-------------------------------------------------------------
  // const onCatChangehandler = (cat)=>{
  //   if (!cat){
  //     SetFilteredData(activeArticles)
  //   }else if(activeArticles?.map(art=>{return art.categoryId === cat})){
  //     SetFilteredData(activeArticles?.map(art=>{return art.categoryId === cat}))
  //   }else {
  //     SetFilteredData(activeArticles)
  //   }
  // }

  
  //--------
  useEffect(() => {
    if (init || articlesUpdated){
      init = false ;
      fetchAllArticles();
      fetchActiveArticles();
      setArticlesUpdated(false);
    }
  }, [articlesUpdated])
  //----------------------------------------ROUTES
  console.log(allArticles ,allArticlesLoading)
  //---------
  const router = createBrowserRouter([
    {path: '/' , element : <RootLayout setActive={setActive} active={active} user={user} setUser={setUser} />  , errorElement : <NotFound/> ,children:[
      {index : true , element : <Home setActive={setActive} active={active} user={user} activeArticles={activeArticles} 
      setArticlesUpdated={setArticlesUpdated} activeArticlesLoading={activeArticlesLoading}/>},
      {path : 'detail/:articleID' , element : <Detail activeArticles={activeArticles} />},
      {path : 'create' , element : user?<AddEditArticle  setActive={setActive} user={user} setArticlesUpdated={setArticlesUpdated}/> : redirect('/')},
      {path : 'update/:articleID' , element : user?<AddEditArticle  setActive={setActive} user={user} /> : redirect('/')},
      {path : 'about' , element : <About/>},
      {path : 'auth' , element : <Auth setActive={setActive} authUpdated={authUpdatedHandler}/>},
    ]},
  ])
  //---------------------------------------------------
  // const router = createBrowserRouter([
  //   {path: '/' , element : <RootLayout/>  , errorElement : <ErrorPage/> , id:'root',loader: tokenLoader,children:[
  //     {index : true , element : <HomePage/> },
  //     {path: 'events' , element : <EventRootLayout/> ,children:[
  //       {index : true, element : <EventsPage/> , loader : eventsLoader },
  //       {path: ':eveID' ,id : 'event-detail', loader: eventDetailsLoader , children:[
  //         {index : true, element : <EventDetailPage/> , action: deleteEventAction },
  //         {path: 'edit' , element : <EditEventPage/> , action : manipulateEventAction , loader : checkAuthLoader }
  //       ]},
  //       {path: 'new' , element : <NewEventPage/> , action :manipulateEventAction , loader : checkAuthLoader},
  //     ] },
  //     { path: 'auth', element: <AuthenticationPage /> , action : authAction},
  //     { path: 'newsletter', element: <NewsletterPage />, action: newsletterAction,},
  //     { path: 'logout', action: logoutAction,},
  //   ]},
  // ])

  //--------------------------------------
  return (
    <>
      {/* <ToastContainer/> */}
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
