import {useState} from "react";


const Search = ({ SubmitHandler }) => {
  //----------------------------------
  const [val, setVal] = useState() ;
  const handleChange = (e)=>{
    setVal(e.target.value)
  }
  //----------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    SubmitHandler(val) ;
  };
  //----------------------------------
  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">Search</div>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="col-12 py-3">
          <input
            type="text"
            value={val}
            className="form-control search-input"
            placeholder="Search blog"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-secondary search-btn">
          <i className="fa fa-search" />
        </button>
      </form>
    </div>
  );
};

export default Search;
