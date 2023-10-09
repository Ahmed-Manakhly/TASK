

// import React, { useState, } from "react";
import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import CommentBox from "../components/CommentBox";
// import Like from "../components/Like";
import FeatureBlogs from "../components/FeatureBlogs";
// import RelatedBlog from "../components/RelatedBlog";
// import Tags from "../components/Tags";
// import UserComments from "../components/UserComments";
// import { db } from "../firebase";
// import Spinner from "../components/Spinner";

const Detail = ({activeArticles }) => {
  // const userId = user?.uid;
  const { articleID } = useParams();
  // console.log(articleID);
  // const [loading, setLoading] = useState(false);
  // const [blog, setBlog] = useState(null);
  // const [blogs, setBlogs] = useState([]);
  // const [tags, setTags] = useState([]);
  // const [comments, setComments] = useState([]);
  // let [likes, setLikes] = useState([]);
  // const [userComment, setUserComment] = useState("");
  // const [relatedBlogs, setRelatedBlogs] = useState([]);


  // useEffect(() => {
  //   id && getBlogDetail();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  // if (loading) {
  //   return <Spinner />;
  // }

  // const getBlogDetail = async () => {
  //   setLoading(true);
  //   const blogRef = collection(db, "blogs");
  //   const docRef = doc(db, "blogs", id);
  //   const blogDetail = await getDoc(docRef);
  //   const blogs = await getDocs(blogRef);
  //   let tags = [];
  //   blogs.docs.map((doc) => tags.push(...doc.get("tags")));
  //   let uniqueTags = [...new Set(tags)];
  //   setTags(uniqueTags);
  //   setBlog(blogDetail.data());
  //   const relatedBlogsQuery = query(
  //     blogRef,
  //     where("tags", "array-contains-any", blogDetail.data().tags, limit(3))
  //   );
  //   setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
  //   setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
  //   const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
  //   const relatedBlogs = [];
  //   relatedBlogSnapshot.forEach((doc) => {
  //     relatedBlogs.push({ id: doc.id, ...doc.data() });
  //   });
  //   setRelatedBlogs(relatedBlogs);
  //   setActive(null);
  //   setLoading(false);
  // };

  // const handleComment = async (e) => {
  //   e.preventDefault();
  //   comments.push({
  //     createdAt: Timestamp.fromDate(new Date()),
  //     userId,
  //     name: user?.displayName,
  //     body: userComment,
  //   });
  //   toast.success("Comment posted successfully");
  //   await updateDoc(doc(db, "blogs", id), {
  //     ...blog,
  //     comments,
  //     timestamp: serverTimestamp(),
  //   });
  //   setComments(comments);
  //   setUserComment("");
  // };

  // const handleLike = async () => {
  //   if (userId) {
  //     if (blog?.likes) {
  //       const index = likes.findIndex((id) => id === userId);
  //       if (index === -1) {
  //         likes.push(userId);
  //         setLikes([...new Set(likes)]);
  //       } else {
  //         likes = likes.filter((id) => id !== userId);
  //         setLikes(likes);
  //       }
  //     }
  //     await updateDoc(doc(db, "blogs", id), {
  //       ...blog,
  //       likes,
  //       timestamp: serverTimestamp(),
  //     });
  //   }
  // };

  console.log(activeArticles);
  console.log(articleID);
  const thisArticle = activeArticles.find(a => a.id === +articleID);
  console.log(thisArticle);
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
                {/* <Like handleLike={handleLike} likes={likes} userId={userId} /> */}
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
              <FeatureBlogs title={"Recent Blogs"} blogs={activeArticles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
