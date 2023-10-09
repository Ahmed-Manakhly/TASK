import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
// // import ReactTagInput from "@pathofdev/react-tag-input";
// // import "@pathofdev/react-tag-input/build/index.css";
import {  useParams , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//----------------------------

const initialState = {
  title: "",
  body: "",
  categoryId: 0,
};
//------------------------------------
const categoryOption = [
  {
    "id": 3,
    "name": "Computers, Science & Technology",
  },
  {
    "id": 4,
    "name": "Entertainment, Art & Culture",
  },
  {
    "id": 5,
    "name": "General News & Current Affairs",
  },
  {
    "id": 6,
    "name": "Health & Medicine",
  },
  {
    "id": 7,
    "name": "Lifestyle",
  },
  {
    "id": 8,
    "name": "Multicultural Press",
  },
  {
    "id": 9,
    "name": "New Zealand",
  },
  {
    "id": 10,
    "name": "Sport & Leisure",
  },
  {
    "id": 11,
    "name": "Trade & Professional",
  },
  {
    "id": 14,
    "name": "Business, Finance & Economics\r\n",
  }
]
//----------------------------------
const AddEditArticle = ({ user, setActive , setArticlesUpdated }) => {
  //----------------------- FORM STATES
  const [form, setForm] = useState(initialState);
  const { title, body,categoryId } = form;
  let forIsValid = false
  // const [file, setFile] = useState(null);
  //------------------------ to update
  const { articleID } = useParams();
  const navigate = useNavigate();
  //------------------ article DATA
  const articleSchema = {
    id: articleID? articleID :0,
    title: "",
    body: "",
    date: new Date().toISOString(),
    userId: user?.LoginUser.Id,
    categoryId: 0,
    isActive: true,
    categoryName: "",
    writerName: user?.LoginUser.DisplayName ,
  }
  // RoleId
  //---------------------------------- HANDLERS
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //------ change cat
  const onCategoryChange = (e) => {
    setForm({ ...form, categoryId: e.target.value });
  };
  //------------------------ add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoryId && title && body ) {
      forIsValid = true
      const data = {
        ...articleSchema,
        categoryId : categoryId,
        title : title,
        body : body
      }
      try {
        const response = await fetch('https://51.81.20.148:7373/Article/AddUpdateArticle',
          {method : 'POST' , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify(data)})
        setArticlesUpdated(true);
        if(!response.ok){return toast.error('Invalid Data!')}else{
          toast.success(`Article ${articleID?'updated' : 'created'} successfully`);
        }
        setArticlesUpdated(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
    setActive("home");
  };
  //-----------------------------------
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {articleID ? "Update Article" : "Create Article"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                  <input type="text"className="form-control input-text-box"placeholder="Title"name="title"value={title}onChange={handleChange}/>
              </div>
              <div className="col-12 py-3">
                <select value={categoryId}onChange={onCategoryChange}className="catg-dropdown">
                  <option>Please select category</option>{categoryOption.map((option, index) =>(<option value={option.id || ""} key={index}>{option.name}</option>))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea className="form-control description-box" placeholder="Description" value={body} name="body" onChange={handleChange} />  
              </div>
              <div className="col-12 py-3 text-center">
                <button className="btn btn-add" type="submit"disabled={forIsValid}>{articleID ? "Update" : "Submit"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditArticle
