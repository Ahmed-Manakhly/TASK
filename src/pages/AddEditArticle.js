import { toast } from "react-toastify";
import {categoryOption as cats} from '../utility/img'
import { useNavigate , Form ,useNavigation , useActionData  , redirect , useParams } from 'react-router-dom';

const categoryOption = cats ;


const AddEditArticle = ({getingData}) => {
  //------------------------ get article id
  let thisArticle 
  const { articleID } = useParams();
  //----------------------------------
  if(getingData){
    thisArticle = getingData?.find(a => +a.id === +articleID) 
  }else{
    thisArticle = null
  }
  //------------------------------------------------
  const navigate = useNavigate();
  //---------------------------------------
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting' ;
  const data = useActionData() ;
  //-----------------------------------------
  function cancelHandler() {
    navigate('..');
  }
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
            <Form className="row blog-form" method='post' >
              {data && data.errors && (<ul>{Object.values(data.errors).map(err => <li key={err}>{err}</li>)}</ul>)}
              <div className="col-12 py-3">
                  <input type="text"className="form-control input-text-box"placeholder="Title"name="title" 
                  required  defaultValue={thisArticle? thisArticle.title : ''}/>
              </div>
              <div className="col-12 py-3">
                <select  name='category' className="catg-dropdown" required  defaultValue={thisArticle? thisArticle.categoryId : ''}>
                  <option>Please select category</option>{categoryOption.map((option, index) =>(<option value={option.id || ""} key={index}>{option.name}</option>))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea className="form-control description-box" placeholder="Description" name="body"
                required  defaultValue={thisArticle? thisArticle.body : ''}/>  
              </div>
              <div className="col-12 py-3 text-center">
                <button type="button" onClick={cancelHandler} disabled={isSubmitting} className="btn btn-add m-5"> Cancel </button>
                <button className="btn btn-add" type="submit"disabled={isSubmitting}>{isSubmitting?'submitting...':(articleID ? "Update" : "Submit")}</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditArticle
  //----------------------------------------------

  export const action = async ({request , params})=>{

    const displayName  =localStorage.getItem('DisplayName');
    const userId  =localStorage.getItem('userId');
    //------------------------------------------
    const data = await request.formData();
    //---------------------------------------
    const articleSchema = {
      id: params.articleID ? params.articleID :0,
      title: data.get('title'),
      body: data.get('body'),
      date: new Date().toISOString(),
      userId: userId,
      categoryId: data.get('category'),
      isActive: true,
      categoryName: "",
      writerName: displayName,
    }
    //--------------------------------------
    const response = await fetch('https://51.81.20.148:7373/Article/AddUpdateArticle',
      {method : 'POST' , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify(articleSchema)})
      console.log(response.status)
      console.log(articleSchema)
      if(!response.ok){return toast.error('Invalid Data!')}else{
        toast.success(`Article ${params.articleID ?'updated' : 'created'} successfully`);
      }
    return redirect('/');
  } ;