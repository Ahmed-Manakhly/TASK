


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

const Category = ({onCatChange , cat , data , onWrChange,wr}) => {

  // const [cat , setCat] = useState() ;

  const onCategoryChange = (e) => {
    onCatChange(e.target.value);
  };

  const onWrChanges = (e) => {
    onWrChange(e.target.value);
  };



  return (
    <div className="widget">
      <div className="blog-heading text-start py-2 mb-4">Filter By Category Or Writer</div>
      {/* <div className="link-widget">
        <ul>
          {catgBlogsCount?.map((item, index) => (
            <li key={index}>
              <Link
                to={`/category/${item.category}`}
                style={{ textDecoration: "none", float: "left", color: "#777" }}
              >
                {item.category}
                <span>({item.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div> */}
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

export default Category;
