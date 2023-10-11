
import {categoryOption as cats} from '../utility/img' ;
const categoryOption = cats ;
//----------------------------------


const Category = ({onCatChange , cat , data , onWrChange,wr}) => {
  //----------------------------------
  const onCategoryChange = (e) => {
    onCatChange(e.target.value);
  };
  //----------------------------------
  const onWrChanges = (e) => {
    onWrChange(e.target.value);
  };
  //----------------------------------
  return (
    <div className="widget">
      <div className="blog-heading text-start py-2 mb-4">Filter By Category Or Writer</div>
      <div className="col-12 py-3">
        <select value={cat}onChange={onCategoryChange}className="catg-dropdown">
          <option>Please select category</option>{categoryOption.map((option, index) =>(<option value={option.id || ""} key={index}>{option.name}</option>))}
        </select>
      </div>
      <hr />
      <div className="col-12 py-3">
        <select value={wr}onChange={onWrChanges}className="catg-dropdown">
          <option>Please select writer</option>{data?.map((option, index) =>(<option value={option.writerName || ""} key={index}>{option.writerName}</option>))}
        </select>
      </div>
    </div>
  );
};
//----------------------------------

export default Category;
