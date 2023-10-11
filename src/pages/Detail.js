import { useParams } from "react-router-dom";
import FeatureBlogs from "../components/FeatureBlogs";



//----------------------------------
const Detail = ({getingData }) => {
  //----------------------------------
  const { articleID } = useParams();
  const thisArticle = getingData.find(a => a.id === +articleID);
  //----------------------------------
  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${thisArticle?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{thisArticle?.date}</span>
          <h2>{thisArticle?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{thisArticle?.writerName}</p> -&nbsp;
                {thisArticle?.date}
              </span>
              <p className="text-start">{thisArticle?.body}</p>
              <div className="text-start">
              </div>
              <br />
              <div className="custombox">
                <div className="scroll">
                  <h4 className="small-title"> Comment</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <FeatureBlogs title={"Recent Blogs"} blogs={getingData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//----------------------------------
export default Detail;
