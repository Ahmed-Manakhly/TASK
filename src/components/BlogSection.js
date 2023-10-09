// import React, { useEffect } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const BlogSection = ({
  id,
  title,
  body,
  categoryName,
  imgUrl,
  userId,
  writerName,
  date,
  handleDelete,
  user,
  listHander,
  ActivateHandler,
  DeactivateHandler,

}) => {
  return (
    <div>
      <div className="row pb-4" key={id}>
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl} alt={title} />
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color">{categoryName}</h6>
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="author">{writerName}</p> -&nbsp;
              {date}
            </span>
          </div>
          <div className="short-description text-start">
            {excerpt(body, 120)}
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {user && user?.LoginUser?.Id === userId && (
            <div style={{ float: "right" }}>
              <FontAwesome
                name="trash"
                style={{ margin: "15px", cursor: "pointer" }}
                size="2x"
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesome
                  name="edit"
                  style={{ cursor: "pointer" }}
                  size="2x"
                />
              </Link>
            </div>
          )}
          {user && user?.LoginUser?.RoleName === "SuperAdmin"&& (<>
            <button className="category catg-color m-3 " onClick={ActivateHandler}>Activate</button>
            <button className="category catg-color" onClick={DeactivateHandler}>Deactivate</button>
            </>)}
          <FontAwesome
            name="plus"
            style={{ margin: "15px", cursor: "pointer" }}
            size="2x"
            onClick={() => listHander(id)}
          />
          <span className="fs-6 ">ADD IT TO YOUR LIST</span>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
