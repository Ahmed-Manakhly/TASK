import {redirect} from 'react-router-dom' ;
//------------------------------------------------
export function getTokenDuration() {
    const StoredExpirationDate = localStorage.getItem('expiration') ;
    const expirationDate = new Date(StoredExpirationDate) ;
    const now = new Date() ;
    const duration = expirationDate.getTime() - now.getTime() ;
    return duration ;
};
//----------------------------------------------
export function getAuthToken() {
    const token = localStorage.getItem('token') ;
    //---------------------
    if(!token){return null} ;
    //-----------------
    const tokenDuration = getTokenDuration() ;
    if(tokenDuration <= 0) { return 'EXPIRED'} ;
    return token ;
};
//----------------------------------------------

export function tokenLoader() {
    return getAuthToken() ;
}
//--------------------------------------

export function checkAuthLoader() {
    const token = getAuthToken() ;
    if(!token) {return redirect('/auth?mode=login');}
    return null;
}

//--------
export const excerpt = (str, count) => {
    if (str.length > count) {
        str = str.substring(0, count) + " ... ";
    }
    return str;
};
