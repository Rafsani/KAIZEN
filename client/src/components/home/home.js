import React , { useState } from 'react'
import Axios from "axios";
import AppNavBar from "../navbar/navbar"
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextArea from '@material-ui/core/TextareaAutosize'
import { Details } from '@material-ui/icons';
import { useAuth } from '../../auth-context';
import SpacingGrid from './grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
   backgroundColor: "#f2e9e9",
    
  },
  media: {
    height: 140,
  },
  // CardLinks: {
  //   textDecoration: ,
  //   color: '#000000',
  // },
  reqButton: {
    backgroundColor: "#f2e9e9",
    paddingBottom: "80px",
  },

});


function Home() {
    const classes = useStyles();
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);
    const history = useHistory();
    const { authLogout } = useAuth();
    
    
  const logout = () =>{
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/logout",
    }).then((res) => {
      console.log(res);
      localStorage.removeItem('token');
      authLogout();
      history.push('/login');
      
      //return <Redirect to="/login" /> ;
    });
  };


  const [open, setOpen] = React.useState(false);
  const [Details, setDetails] = useState("");
  const [Amount, setAmount] = useState(0);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoanRequest = (event) =>{
    Axios({
      method: "POST",
      data: {
        Details: Details,
        Amount: Amount,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/loans",
    }).then((res) => {
      console.log(res);
      });
      setOpen(false);
  };

 


    return (
       
            
    <div>
    <AppNavBar />


      <div>

        <div className={classes.reqButton}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create New Loan request
      </Button>
        </div>
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth >
        <DialogTitle id="form-dialog-title">Create Loan request</DialogTitle>

        <DialogContent>
          <DialogContentText>
            what do you need the money for?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Details"
            label="Details"
            type="text"
            onChange ={ (e) => setDetails(e.target.value)}
            multiline={true}
            rows = "5"
            fullWidth
            required={true}
          />
        </DialogContent>


        <DialogContent>
          <DialogContentText>
            How much money do you need?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Amount"
            label="Amount"
            type="number"
            onChange ={ (e) => setAmount(e.target.value)}
            fullWidth
            required={true}
          />
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => handleLoanRequest(e)} color="primary" >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        <SpacingGrid />
        

        </div>
    )
}

export default Home
