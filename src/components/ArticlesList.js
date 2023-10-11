import React, { useState , useEffect } from "react";
import BlogSection from "../components/BlogSection";
import { toast } from "react-toastify";
import { useSubmit , redirect} from 'react-router-dom' ;



//----------------------------------
const ArticlesList = ({ data , filterdCat  , filterdWr , search , listHander}) => {

    const [filteredData,setFilteredData] = useState(data|| []); 
    //------------------------------------- HANDLERS
    const submit = useSubmit() ;
    //----------------------------------
    function handleDelete(id) {
      const proceed = window.confirm('Are you sure, You want to delete this?') ;
      if (proceed) {
        submit(null , {action : `/delete?id=${id}` , method : 'DELETE'}) ;
      }
    }
    //----------------------------------
    function ActivateHandler(id) {
      const proceed = window.confirm('Are you sure, You want to activate this?') ;
      if (proceed) {
        submit(null , {action : `/activate?id=${id}` , method : 'POST'}) ;
      }
    }
    //----------------------------------
    function DeactivateHandler(id) {
      const proceed = window.confirm('Are you sure, You want to deactivate this?') ;
      if (proceed) {
        submit(null , {action : `/deactivate?id=${id}` , method : 'POST'}) ;
      }
    }
    //----------------------------------
    useEffect(() => {
            const filteredDataAct = data.filter(art => { 
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
    }, [filterdCat , data , filterdWr , search]);
    //----------------------------------
    //----------------------------------
    return (
            <>
                {
                    filteredData?.map((blog)=> (
                        <BlogSection
                        key={blog.id}
                        handleDelete={handleDelete.bind(null,blog.id)}
                        listHander={listHander.bind(null,blog.id,data)}
                        ActivateHandler={ActivateHandler.bind(null,blog.id)}
                        DeactivateHandler={DeactivateHandler.bind(null,blog.id)}
                        {...blog}
                        />
                    ))
                }
        </>
        )
}


export default ArticlesList ;


//----------------------------------
//----------------------------------

export const action = async ({params , request})=>{
  const searchParams = new URL(request.url).searchParams ;
  const id = searchParams.get('id') ;
  const response = await fetch(`https://51.81.20.148:7373/Article/DeleteArticle?id=`+id,{method : 'DELETE' })
  if (!response.ok) {
      console.log(response.status)
      return toast.error('could not delete it!');
  } else {
    toast.success(`Article removed successfully`);
      return redirect('/') ;
  }
} ;
//----------------------------------------------------------
export const actionActivateHandler = async ({params , request})=>{
  const searchParams = new URL(request.url).searchParams ;
  const id = searchParams.get('id') ;
  const response = await fetch(`https://51.81.20.148:7373/Article/ActivateArticle?id=${id}&isActive=true`,
  {method : 'POST' , headers : {'Content-Type' : 'application/json'}})
  if (!response.ok) {
      console.log(response.status)
      return toast.error('could not activate it!');
  } else {
    toast.success(`Article activated successfully`);
      return redirect('/') ;
  }
} ;
//----------------------------------------------------------
export const actionDeactivateHandler = async ({params , request})=>{
  const searchParams = new URL(request.url).searchParams ;
  const id = searchParams.get('id') ;
  const response = await fetch(`https://51.81.20.148:7373/Article/ActivateArticle?id=${id}&isActive=false`,
  {method : 'POST' , headers : {'Content-Type' : 'application/json'}})
  if (!response.ok) {
      console.log(response.status)
      return toast.error('could not deactivate it!');
  } else {
    toast.success(`Article deactivated successfully`);
      return redirect('/') ;
  }
} ;
//----------------------------------


