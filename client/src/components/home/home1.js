import React , { useState ,useEffect}  from 'react'
import './home.css'
import './navbar.css'
import AppNavBar from '../navbar/navbar';
import Axios from 'axios';

export default function HomePage() {



    const [requests, setrequests] = useState([]);
   
    
  
      const fetchdata = async () => {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/api/loans",
      }).then ((res) => {
       
        console.log(res);
        //requests = res.data;
        setrequests(res.data);
       console.log(requests.length);
      });
    };
  
    useEffect(() => {
      
      fetchdata();
    }, [])







    return (
        
           <div>



    <AppNavBar />



<div class="banner">
        <div class="text-box">
            <p>Looking For A Place to lend money to someone in need ?</p>
            <a href="../registration/registration.html" class="btn btn-dark">Fill Up the form</a>
        </div>
    </div>
    
 
    <div class="content-box">
        <div class="category-box">
            <ul class="category-type">
                <li class="category"><a href="#" class="btn-category btn-category-left btn-dark">Loans</a></li>
                <li class="category"><a href="#" class="btn-category btn-category-right btn-light">Donations</a></li>
            </ul>
        </div>
        <div class="receiver-list">
        {requests.map((value,index) => (
            <div class="user-item">
            <div class="user-card">
                <div class="photo-space"></div>
                <div class="user-info content-box">
                    <div class="name-rating">
                        <p>Dummy Username</p>
                        <div class="review"><i class="fas fa-star"></i>4.5/5</div>
                    </div>
                    <div class="loan-info">
                        <div class="amount">Amount : <span class="highlight"> {value.Amount}</span></div>
                        <div class="date">Issued:<span class="highlight"> {value.issueDate}</span></div>
                    </div>
                    <div class="progress">
                        Progress : <div class="bar">
                            <div class="fillup-bar"></div>
                        </div> 
                    </div>
                    <div class="buttons">
                        <a href="" class="btn-card btn-dark">Lend Money</a>
                    </div>
                </div>
            </div>
        </div>
          ))}
          
          
            
            
            
            
        </div>
    </div>

   
    <div class="footer">
        <p>You can find the project link here:</p>
        <a href="#"><i class="fab fa-github fa-2x"></i></a>
    </div>
















           </div>

   
   
        
    )
}
