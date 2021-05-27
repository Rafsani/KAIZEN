import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import MediaCard from './Card';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 60,
    width: 100,
  },
  control: {
    padding: theme.spacing(5),
  },
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(10);
  const classes = useStyles();
const [requests, setrequests] = useState([]);
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  let daras = [];

    const fetchdata = async () => {
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/getLoanRequests",
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
    <Grid container className={classes.root}
    direction="row"
    justify="space-around"
    alignItems="center">
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing} item xs = {12}>
          {requests.map((value,index) => (
            <Grid key={index} item>
              
              < MediaCard fields= {value}/>
             
              
              
            </Grid>
          ))}
        </Grid>
      </Grid>
          </Grid>
  );
}
