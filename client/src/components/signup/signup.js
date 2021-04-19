import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import bgImage from '../../components/login/loginImage.png'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Axios from "axios";
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";



const theme = createMuiTheme({
    overrides: {
            MuiTextField: {
                text: {
                    color: "#ffffff",
                },
            },
        },
    
    palette: {
        primary: {
          main: "#de3214",
        },
        secondary: {
            main: '#d14d9f',
          },
        textPrimary: {
            main: '#ffffff'
        },
      },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    //backgroundcolor: '#000000',
  },
  image: {
    backgroundImage: `url(${bgImage})`,
    //backgroundImage: './loginImage.png',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'right',

  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecorationColor: theme.palette.primary.main,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: '#fabf37',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formcontainer: {
    backgroundColor: '#241111',
  },
  lineColor: {
    backgroundColor: '#ffffff',
    //color: '#fabf37',
  },
}));

export default function Login() {
    const classes = useStyles();
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    let history = useHistory();



    const login = (e) => {
      e.preventDefault();
      console.log("login");
        Axios({
          method: "POST",
          data: {
            username: loginUsername,
            password: loginPassword,
          },
          withCredentials: true,
          url: "http://localhost:5000/login",
        }).then ((res) => {
          if(res.data === "Successfully Authenticated")
            {
              localStorage.setItem('token','true');
              history.push('/');
              //return <Redirect to ='/' />
            }
          console.log(res);
        });
        //return <Redirect to ='/' />
        //history.push('/');
      };





  return (
    <ThemeProvider theme = {theme}> 
    <Grid container component="main" className={classes.root} >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className = {classes.formcontainer}>
        <div className={classes.paper} >
          <Avatar className={classes.avatar} backgroundcolor = '#473229'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary"  >
            Sign Up in KAIZEN
          </Typography>
          <form className={classes.form} noValidate >
            <TextField
              variant="filled"
              margin="normal"
              color= "primary"
              //backgroundColor= "#ffffff"
              required
              fullWidth
              id="email"
              label="Enter Phone No:"
              name="username"
              InputProps={{
                classes: {
                    input: classes.lineColor
                }
            }}

            InputLabelProps= {{
                className: classes.lineColor
            }}
              autoComplete="username"
              autoFocus
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              color="primary"
              name="password"
              label="Enter New Password"
              type="password"
              
              id="password"
              InputProps={{
                classes: {
                    input: classes.lineColor
                }
            }}
              autoComplete="current-password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />


            <TextField
              variant="filled"
              margin="normal"
              color= "primary"
              //backgroundColor= "#ffffff"
              required
              fullWidth
              id="email"
              label="Enter Phone No:"
              name="username"
              InputProps={{
                classes: {
                    input: classes.lineColor
                }
            }}

            InputLabelProps= {{
                className: classes.lineColor
            }}
              autoComplete="username"
              autoFocus
              onChange={(e) => setLoginUsername(e.target.value)}
            />

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="secondary" backgroundColor="primary"/>}
              label="Remember me" color="primary"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
          
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
}