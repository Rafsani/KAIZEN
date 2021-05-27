import React, {useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from "axios";
import { useAuth } from '../auth-context';

const PrivateRoute = ({component: Component, ...rest}) => {
    
const [loggedin, setloggedin] = useState(true);        
//  const    isLogin = () => {
//             Axios({
//             method: "GET",
//             withCredentials: true,
//             url: "http://localhost:5000/isloggedin",
//         }).then ((res) => {
            
//             if(res.data === "loggedin")
//             {
//                 console.log(res);
//                 setloggedin(true);
//                 return true;
//                 //return <Redirect to ='/' />
//             }
//             else
//             {
//                 //console.log(res);
//                 setloggedin(false);
//                 return false;
//             }
//         });
// }

const { loggedIn, isLoggedInCookie } = useAuth();
const isLogin = () => {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
}

// isLogin();
// console.log(loggedin);

    
    return (
        
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => 
        (
            isLoggedInCookie()? <Component {...props} /> : <Redirect to="/login" />
        )} />
        );
};

export default PrivateRoute;