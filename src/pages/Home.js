import React, { useState , useEffect } from "react";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import FeatureBlogs from "../components/FeatureBlogs";
import Search from "../components/Search";
import { useLocation } from "react-router-dom";
import Category from "../components/Category";



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({  user ,activeArticles,activeArticlesLoading,setArticlesUpdated }) => {

  const [listed, setListed] = useState([]);
  const [filteredListed, setFilteredListed] = useState(listed || []);
  const [search, setSearch] = useState("");
  const [filterdCat,setFilterCat] = useState(null); 
  const [filterdWr,setFilterWr] = useState(null); 
  const [filteredData,setFilteredData] = useState(activeArticles|| []); 

  const filterChangeHandler = (selctedCat)=>{
      setFilterCat(selctedCat);
  }
  const filterWrChangeHandler = (selctedWr)=>{
    setFilterWr(selctedWr);
  }

  const handleChange = (val) => {
    setSearch(val)
  };
  const queryString = useQuery();
  const searchQuery = queryString.get("searchQuery");
  const location = useLocation();
  const listHander = (id)=>{
    const thisArticle = activeArticles?.find(a => a.id === id);
    setListed(prev => [...new Set([...prev, thisArticle])])
  }
  const BToAHandler = () =>{setFilteredListed([...new Set(listed.sort(function(a,b){return (new Date(b.date))-(new Date(a.date))})) ])}
  const AToBHandler = () =>{setFilteredListed([...new Set(listed.sort(function(a,b){return (new Date(a.date))-(new Date(b.date))})) ] )}

  //---------------------------------------
  const  ActivateHandler = (id)=>{
    const sendData = async() => {
      const response = await fetch(`https://51.81.20.148:7373/Article/ActivateArticle?${id}=16&isActive=true`,
      {method : 'POST' , headers : {'Content-Type' : 'application/json'}})
      if(!response.ok){return toast.error('Try Again!')}
    };
    try{
        sendData();
    }catch(error){return toast.error('Try Again!');}
  }
  //----------------------------------------------
  const  DeactivateHandler = (id)=>{
    const sendData = async() => {
      const response = await fetch(`https://51.81.20.148:7373/Article/ActivateArticle?${id}=16&isActive=false`,
      {method : 'POST' , headers : {'Content-Type' : 'application/json'}})
      if(!response.ok){return toast.error('Try Again!')}
    };
    try{
        sendData();
    }catch(error){return toast.error('Try Again!');}
  } 
  //----------------------------------------------





  useEffect(() => {
    const filteredDataAct = activeArticles.filter(art => { 
      if(filterdCat ==='Please select category'){ 
        return art;
      }else {
          return art.categoryId === +filterdCat ;
      }})
      const filteredDataAct2 = filteredDataAct.filter(art => {
      if(filterdWr === 'Please select writer'){
        return art;
      }else {
        return art.writerName === filterdWr ;
      }})
      const filteredDataAct3 = filteredDataAct2.filter(art => {
      if(search === 'Search blog'){
        return art;
      }else {
        return art.title.toLowerCase().includes(search.toLowerCase()) ;
      }})
      setFilteredData(filteredDataAct3);
  }, [filterdCat , activeArticles , filterdWr , search]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        const response = await fetch(`https://51.81.20.148:7373/Article/DeleteArticle?id=${id}`,{method : 'DELETE' })
        if(!response.ok){return toast.error('Invalid Data!')}else{
          toast.success(`Article removed successfully`);
        }
        setArticlesUpdated(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (activeArticlesLoading) {
    return <Spinner/>;
  }

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        {!user && <h1 className="text-center fw-bolder m-5 fst-italic" >You Just Need To Login to able to browse our awesome NEW! and also you can create a writer / publisher account</h1>}
        {user && 
        <div className="row mx-0">
          <div className="col-md-8">
            <div className="blog-heading text-start py-2 mb-4">Daily Blogs</div>
            {filteredData?.length === 0 && location.pathname !== "/" && (
              <>
                <h4>
                  No Blog found with search keyword:{" "}
                  <strong>{searchQuery}</strong>
                </h4>
              </>
            )}
            {filteredData?.map((blog) => (
              <BlogSection
                key={blog.id}
                user={user}
                handleDelete={handleDelete.bind(null,blog.id)}
                listHander={listHander.bind(null,blog.id)}
                ActivateHandler={ActivateHandler.bind(null,blog.id)}
                DeactivateHandler={DeactivateHandler.bind(null,blog.id)}
                {...blog}
              />
            ))}
          </div>
          <div className="col-md-3">
            <Search search={search} SubmitHandler={handleChange}  />
            <FeatureBlogs title={"My Favourite List"} blogs={listed || filteredListed} BToAHandler={BToAHandler}   AToBHandler={AToBHandler}/>
            <Category  cat={filterdCat}  onCatChange={filterChangeHandler} data={activeArticles} onWrChange={filterWrChangeHandler} wr={filterdWr}/>
          </div>
        </div>
        }
      </div>
    </div>)
}

export default Home;
