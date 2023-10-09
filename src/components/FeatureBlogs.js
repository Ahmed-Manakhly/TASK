// import {useState } from "react";
import { useNavigate } from "react-router-dom";

const FeatureBlogs = ({ blogs, title ,BToAHandler, AToBHandler }) => {
  const navigate = useNavigate();
  // const [sortedBlogs , setSortedBlogs] = useState(blogs) ;
  // const BToAHandler = () =>{setSortedBlogs(prev => prev.sort(function(a,b){return new Date(b.date) - new Date(a.date);}))}
  // const AToBHandler = () =>{setSortedBlogs(prev => prev.sort(function(a,b){return new Date(a.date) - new Date(b.date);}))}
  // console.log(sortedBlogs);
  // useEffect(() => {
  //   setSortedBlogs(blogs)
  // }, [blogs]);
  // console.log(new Date(blogs[0].date) - new Date(blogs[1].date))
  return (
    <div>
      <div className="blog-heading text-start pt-3 py-2 mb-4">{title}</div>
      <button className="category catg-color m-3 " onClick={AToBHandler}>By Oldest</button>
      <button className="category catg-color" onClick={BToAHandler}>By Latest</button>
      {blogs?.map((item) => (
        <div
          className="row pb-3"
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <div className="col-5 align-self-center">
            <img
              src={item.imgUrl}
              alt={item.title}
              className="most-popular-img"
            />
          </div>
          <div className="col-7 padding">
            <div className="text-start most-popular-font">{item.title}</div>
            <div className="text-start most-popular-font-meta">
              {item.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureBlogs;
