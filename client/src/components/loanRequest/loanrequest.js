import React from 'react'
import  { useState ,useEffect} from 'react';
import Axios from 'axios';
import AppNavBar from '../navbar/navbar';

function Loanrequest(props) {

    
    const [receiver, setreceiver] = useState('');
    const [amount, setamount] = useState('');
    const [description, setdescription] = useState('');
    const [reqDate, setreqDate] = useState('');

  

    const fetchdata = async () => {
        await Axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:5000/loanRequest/"+props.match.params.id,
        }).then ((res) => {
         
          console.log(res);
          //requests = res.data;
          setamount(res.data.Amount);
          setreceiver(res.data.Receiver);
         
        });
      };
    
      useEffect(() => {
        
        fetchdata();
      }, [])

    return (
        <div>
            <AppNavBar />
            <h1> Receiver name: {receiver}</h1>
            <h2> Amount = {amount} </h2>
            
        </div>
    )
}

export default Loanrequest;