import useInput from '../hooks/Use-Input';
import { toast } from "react-toastify";
import { Form , Link , useActionData, useNavigation, useSearchParams , redirect} from 'react-router-dom';
//---------------------------------------------


const userSchema = {
    userName: "",
    displayName: "",
    password: "",
    roleId: 0,
    isActive: true,
    roleName: ""
}

//-----------------------------------------
const Auth = ( ) => {
    //------------------------------------ init validation
    const {hasError : nameInputIsInvalid , valueIsValid : name1,
        valueChangeHandler : nameInputChangeHandler , inputBlurHandler : nameInputBlurHandler } = useInput(value => value.trim() !=='') ;
    const {hasError : lNameInputIsInvalid ,valueIsValid : name2,
        valueChangeHandler : LnameInputChangeHandler , inputBlurHandler : LnameInputBlurHandler  } = useInput(value => value.trim() !=='') ;
        //------------------------
    const {hasError : emailInputIsInvalid , valueIsValid : mail,
        valueChangeHandler : emailInputChangeHandler , inputBlurHandler : emailInputBlurHandler  } = useInput(value => value.includes('@')) ;
    const {value : enteredPass ,hasError : passInputIsInvalid , valueIsValid : pass1,
            valueChangeHandler : passInputChangeHandler , inputBlurHandler : passInputBlurHandler } = useInput(value => value.trim().length >= 8) ;
    const {value : enteredPassw , valueIsValid : pass2,
            valueChangeHandler : passwInputChangeHandler , inputBlurHandler : passwInputBlurHandler } = useInput(value => value.trim().length >= 8) ;
    //-----------------------------------
    const data = useActionData() ;
    const navigation = useNavigation() ;
    const isSubmitting = navigation.state === 'submitting' ;
    //-------------------------
    const [SearchParams]=useSearchParams() ;
    const isLogin = SearchParams.get('mode') === 'login' ;

    //------------------------------------------------------form valid
    let formIsValid = false
    if(name1 && name2 && mail && pass1 && pass2 &&(enteredPass === enteredPassw )){
        formIsValid = true;
    }
    //-----------------
    return (
        <div className="container-fluid mb-4">
            <div className="container">
                <div className="col-12 text-center">
                    <div className="text-center heading py-2">{isLogin ? "Sign-In" : "Sign-Up"}</div>
                </div>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <Form method="post"  className="row">
                            {!isLogin && (<>
                                {data && data.errors && <ul>{Object.values(data.errors).map(error => <li key={error}>{error}</li>)}</ul>}
                                {data && data.message && <p>{data.message}</p>}
                                <div className="col-6 py-3">
                                    <input type="text" className='form-control input-text-box' placeholder="First Name"
                                    name="firstName" onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler}/>
                                    {nameInputIsInvalid && <p className='text-danger'>First Name must not be empty</p>}
                                </div>
                                <div className="col-6 py-3">
                                    <input type="text" className="form-control input-text-box" placeholder="Last Name"
                                    onChange={LnameInputChangeHandler} onBlur={LnameInputBlurHandler} name="lastName"/>
                                    {lNameInputIsInvalid && <p className='text-danger'>Last Name must not be empty</p>}
                                </div>
                                <div className="form-check-inline mx-2 d-flex justify-content-between">
                                    <input type="radio"className="form-check-input"value="Writer"name="roleName"/>
                                    <label htmlFor="roleName" className="form-check-label">Author&nbsp;</label>
                                    <input type="radio" className="form-check-input" value="Anonymous" name="roleName"/>
                                    <label htmlFor="roleName" className="form-check-label">Reader</label>
                                </div>
                            </>)}
                            <div className="col-12 py-3">
                                <input type="email" className="form-control input-text-box" placeholder="Email" name="email"
                                    onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler} />
                                    {emailInputIsInvalid && <p className='text-danger'>Kindly use a valid Email</p>}
                            </div>
                            <div className="col-12 py-3">
                                <input type="password" className="form-control input-text-box" placeholder="Password" name="password"
                                onChange={passInputChangeHandler} onBlur={passInputBlurHandler} />
                                {passInputIsInvalid && <p className='text-danger'>Make sure your password greater than 8 characters</p>}
                            </div>
                            {!isLogin &&
                            <div className="col-12 py-3">
                                <input type="password" className="form-control input-text-box" placeholder="Confirm Password" name="confirmPassword"
                                onChange={passwInputChangeHandler} onBlur={passwInputBlurHandler} />
                                {enteredPass !== enteredPassw  && <p className='text-danger'>Your password is not Matching </p>}
                            </div>
                            }
                            <div className="col-12 py-3 text-center">
                                <button className={`btn ${isLogin ? "btn-sign-in" : "btn-sign-up"}`} type="submit"  disabled={!formIsValid&&!isLogin} > {
                                    isSubmitting? 'Submitting...' : (isLogin ? "Sign-in" : "Sign-up")
                                } </button>
                            </div>
                        </Form>
                        {isLogin ? (
                            <div className="text-center justify-content-center mt-2 pt-2">
                                <p className="small fw-bold mt-2 pt-1 mb-0"> Don't have an account ?&nbsp;
                                    <Link className="link-danger" style={{ textDecoration: "none", cursor: "pointer" }} to={`?mode=signup`}>Sign Up</Link>
                                </p>
                            </div>
                        ) : (
                            <div className="text-center justify-content-center mt-2 pt-2">
                                <p className="small fw-bold mt-2 pt-1 mb-0"> Already have an account ?&nbsp;
                                    <Link style={{textDecoration: "none",cursor: "pointer",color: "#298af2",}}to={`?mode=login`}> Sign In </Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth



export async function action ({request ,}) {
    //---------------------------------------------
    const searchParams = new URL(request.url).searchParams ;
    const mode = searchParams.get('mode') || 'login' ;
    //---------------------------------------------
    if (mode !== 'login' && mode !== 'signup'  ) { return toast.error('Unsupported mode!')} ;
    //---------------------------------------------
    const data = await request.formData() ;
    //---------------------------------------------
    if(mode === 'login'){
        const authData = {email : data.get('email') , password :  data.get('password')  } ;
        //validate
        const response = await fetch(`https://51.81.20.148:7373/User/Login/${authData.email}/${authData.password}`);
        const resData = await response.json() ;
        console.log(response.status)
        console.log(resData)
        if (response.status === 403 ) {redirect('/') ;  toast.error('invalid user name or password!' ) ; };
        if (!response.ok) {  return toast.error('Could not authenticate user!')};
        if(response.status === 200){
            //------ store user data
            const token = resData.Token ;
            localStorage.setItem('token' , token) ;
            localStorage.setItem('userId' , resData.LoginUser.Id) ;
            localStorage.setItem('UserName' , resData.LoginUser.UserName) ;
            localStorage.setItem('DisplayName' , resData.LoginUser.DisplayName) ;
            localStorage.setItem('RoleName' , resData.LoginUser.RoleName) ;
            //-----------------------------------
            const expiration = new Date();
            expiration.setHours(expiration.getHours()+1) ;
            localStorage.setItem('expiration' , expiration.toISOString()) ;
            toast.success(`Well Come Back ${resData?.LoginUser.DisplayName}`)
            //-------------------------------
            return redirect('/') ;
        }
        //------------------------------------
    }else{
        const authData = {
            ...userSchema,
            userName : data.get('email'),
            displayName : `${data.get('firstName')} ${data.get('lastName')}`,
            password : data.get('password'),
            roleName : data.get('roleName') ,
            roleId: data.get('roleName') === "Writer"?0:data.get('roleName') === "Anonymous"?2:1,
        }
        console.log(authData)
        const response = await fetch('https://51.81.20.148:7373/User/Register', {method : 'POST' ,
        headers : {'Content-Type' : 'application/json'} ,body : JSON.stringify(authData)}) ;
        console.log(response.status)
        //------------------------------------------------
        if (!response.ok) { return toast.error('Invalid/Missing Data!')};
        if(response.status === 200){
            toast.success('Login Now!') ;
            return redirect('?mode=login') ;
        }
    } 
} ;