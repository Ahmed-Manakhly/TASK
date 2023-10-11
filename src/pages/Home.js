import {useState , useEffect} from 'react'
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import FeatureBlogs from "../components/FeatureBlogs";
import Search from "../components/Search";
import Category from "../components/Category";
import {useRouteLoaderData   ,defer , Await , useLocation}  from "react-router-dom";
import {imgs} from '../utility/img' ;
import { Suspense } from 'react';
import ArticlesList from "../components/ArticlesList"; 
//----------------------------------

const Home = ({  setActive , liftData}) => {
  //------
  const token = useRouteLoaderData('root'); 
  const {activeArticles} = useRouteLoaderData('data') ;
  //--------
  const [listed, setListed] = useState([]);
  const [filteredListed, setFilteredListed] = useState(listed || []);
  const [search, setSearch] = useState("");
  const [filterdCat,setFilterCat] = useState('Please select category'); 
  const [filterdWr,setFilterWr] = useState('Please select writer'); 
  const location = useLocation();
  //----------------------------------
  useEffect(() => {
    if (location.pathname !== "/" ){
      setActive('home')
    }
  }, [setActive, location]);
  //----------------------------------
  const filterChangeHandler = (selctedCat)=>{
      setFilterCat(selctedCat);
  }
  //----------------------------------
  const filterWrChangeHandler = (selctedWr)=>{
    setFilterWr(selctedWr);
  }
  //----------------------------------
  const handleChange = (val) => {
    setSearch(val)
  };
  //----------------------------------
  const listHander = (id,data)=>{
    const thisArticle = data?.find(a => a.id === id);
    setListed(prev => [...new Set([...prev, thisArticle])])
  }
  //----------------------------------
  const BToAHandler = () =>{setFilteredListed([...new Set(listed.sort(function(a,b){return (new Date(b.date))-(new Date(a.date))})) ])}
  const AToBHandler = () =>{setFilteredListed([...new Set(listed.sort(function(a,b){return (new Date(a.date))-(new Date(b.date))})) ] )}
  //---------------------------------------

  return (
    
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        {!token && <h1 className="text-center fw-bolder m-5 fst-italic" >You Just Need To Login to able to browse our awesome NEWS! and also you can create a writer / publisher account</h1>}
        {token && 
          <div className="row mx-0">
            <div className="col-md-8">
              <div className="blog-heading text-start py-2 mb-4">Our Daily Articles</div>
              <Suspense fallback={<span className='d-flex justify-content-center '><Spinner/></span>}>
                <Await resolve={activeArticles}>{(loadedActiveArticles) => 
                  <ArticlesList data={loadedActiveArticles} filterdCat={filterdCat}  filterdWr={filterdWr}  search={search}
                  listHander={listHander}/>
                }</Await>
              </Suspense>
            </div>
            <Suspense fallback={<h2 className='d-flex justify-content-center'>Loading...</h2>}>
                <Await resolve={activeArticles}>{(loadedActiveArticles) => 
                <>
                  <div className="col-md-3">
                    <Search search={search} SubmitHandler={handleChange}  />
                    <FeatureBlogs title={"My Favourite List"} blogs={listed || filteredListed} BToAHandler={BToAHandler}   AToBHandler={AToBHandler}/>
                    <Category  cat={filterdCat}  onCatChange={filterChangeHandler} data={loadedActiveArticles} onWrChange={filterWrChangeHandler} wr={filterdWr}/>
                  </div>
                  </>
                }</Await>
              </Suspense>
            <Suspense fallback={<p className='d-flex justify-content-center' >Please Wait</p>}>
                <Await resolve={activeArticles}>{(loadedActiveArticles) => 
                <>
                  {liftData(loadedActiveArticles)}
                  </>
                }</Await>
              </Suspense>
          </div>
        }
      </div>
    </div>)
}

export default Home;


//-----------------------------------------------------------------------
const roleName = localStorage.getItem('RoleName');

const activeArticles = `https://51.81.20.148:7373/Article/GetAllArticles?isActive=true`
const allArticles = 'https://51.81.20.148:7373/Article/GetAllArticles'
async function GetActArticles() {
  const response = await fetch(`${roleName=== "SuperAdmin"?allArticles :  activeArticles}`);
  if (!response.ok) {
    return toast.error('Could not get Articles!')
  } else {
      const resData = await response.json() ;
      const activeArticles = resData.map(i =>{
        const img = imgs.find(m => m.name === i.categoryName)
        return {...i,imgUrl : img?.img}
      });
      return activeArticles ;
  }
}
//--------------------------------------------------
export  function loader() {
  return defer({activeArticles : GetActArticles()}) ;
} ;
//------------------------------------



