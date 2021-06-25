import React,{useState} from 'react'
import AppNavBar from '../navbar/navbar'
import './registration.css'
import Axios from 'axios';
import BASE_URL from '../Base_url';

function Registration() {

const [FirstName, setFirstName] = useState("");
const [LastName, setLastName] = useState("");
const [Email, setEmail] = useState("");
const [Nid, setNid] = useState("");
const [AccountType, setAccountType] = useState("Lender");
const [Dob, setDob] = useState(null);
const [About, setAbout] = useState("")


const sendData =  (e) => {
    console.log(FirstName + " " + LastName + " " + Email + " " + Nid + " " + AccountType + " " + Dob + " " + About );

     e.preventDefault();
      
        Axios({
          method: "POST",
          data: {
            fullname: FirstName +" " + LastName,
            email: Email,
            nid: Nid,
            usertype: AccountType,
            dob: Dob,
            about: About
          },
          withCredentials: true,
         // url: "http://localhost:5000/api/auth/login",
         url: "http://localhost:5000/api/auth/registerdata",
        }).then ((res) => {
          console.log(res);
        });
}


    return (
        <>
  <AppNavBar />
  <div class="main content-box">
        <div class="icon">
        <i class="fab fa-kickstarter-k fa-6x"></i>
        </div>
        <div class="registration">
        <div class="title-card">
            <h1>Personal Information</h1>
            <p>Tell us a bit about yourself. This information will appear on your public profile, so that other users can get to know you better & in turn we can verify you.</p>
        </div>
        <div class="form">
            <div class="full-name inputs-div">
                <aside>
                    <h3>Full Name</h3>
                    <p>Example: Fazle Rafsani</p>
                </aside>
                <div class="input-field">
                    <input type="text" class="name-input" placeholder="First Name" pattern="[A-Za-z]+" onChange= {(e) => setFirstName(e.target.value)} required />
                    <input type="text" class="name-input" placeholder="Last Name" pattern="[A-Za-z]+"  onChange= {(e) => setLastName(e.target.value)}  required />
                </div>
            </div>
            <div class="small-input-field inputs-div">
                <aside>
                    <h3>Email Id.</h3>
                    
                </aside>
                <div class="input-field">
                    <input type="email" class="small-input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" placeholder="example@gmail.com" onChange= {(e) => setEmail(e.target.value)} required/>
                </div>
            </div>
            <div class="small-input-field inputs-div">
                <aside>
                    <h3>Date of Birth</h3>
                    
                </aside>
                <div class="input-field">
                    <input type="date" class="small-input" onChange= {(e) => setDob(e.target.value)} required/>
                </div>
            </div>
            <div class="small-input-field inputs-div">
                <aside>
                    <h3>National ID</h3>
                </aside>
                <div class="input-field">
                    <input type="number" class="small-input" pattern="[0-9]{10}" onChange= {(e) => setNid(e.target.value)} required/>
                </div>
            </div>
            <div class="text-area-input-field inputs-div">
                <aside>
                    <h3>Who am I?</h3>
                </aside>
                <div class="input-field">
                    <textarea class="text-area-input" cols="50" rows="5" maxlength="140" minlength="1" onChange= {(e) => setAbout(e.target.value)} required></textarea>
                </div>
            </div>
            <div class="account-type inputs-div">
                <aside>
                    <h3>Account type</h3>
                </aside>
                <div class="input-field">
                
                    <div class="custom-select">
                    <select onChange={(e) => setAccountType(e.target.value)} >
                        <option value="Lender">Lender</option>
                        <option value="Receiver">Receiver</option>
                    </select>
                    </div>
                </div>
            </div>
            <div class="buttons inputs-div">
                <a href="#" class="btn-form btn-light">Go Back</a>
                <a href="#" onClick={sendData} class="btn-form btn-dark">Submit</a>
            </div>
        </div>
    </div>
 </div>
 </>
    )
}

export default Registration
