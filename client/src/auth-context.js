import React from "react";
import {useState, createContext, useEffect }  from "react";
import Cookies from 'js-cookie';

const AuthContext  = createContext({});

const AuthProvider = props => {
    const [loggedIn, setloggedIn] = useState(false);
  
    useEffect(() => {
        
     const user = Cookies.get("user");
     if(user){
         setloggedIn(true);
     }
    }, [])


    const isLoggedInCookie = () => {
        const user = Cookies.get("user");
     if(user){
         setloggedIn(true);
         return true;
     }
     return false;
    }

    const authLogin = () => {
        Cookies.set("user","loginTrue");
        setloggedIn(true);
    }
    
    const authLogout = () => {
        Cookies.remove("user");
        setloggedIn(false);
    }

    const  authContextValue = {
        authLogin,
        authLogout,
        loggedIn,
        isLoggedInCookie
    } ;

    return <AuthContext.Provider value=  {authContextValue} {...props} />;
};
const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, useAuth}