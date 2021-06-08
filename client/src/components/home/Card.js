import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 240,
    maxHeight: 320,
    minHeight: 220,
    minWidth: 300,
    
  },
  media: {
    height: 140,
  },
  // CardLinks: {
  //   textDecoration: ,
  //   color: '#000000',
  // },
});

export default function MediaCard({fields}) {
  const classes = useStyles();

  const viewRequest = (Id) =>{
    return <Redirect to="/request/Id" />
  };

  const proceedToPay = (Id) =>{
    return <Redirect to="/payfor/Id" />
  };

  return (
    <div>

   

    <Card className={classes.root}>
    <Link style={{ textDecoration: 'none' }} to = {`/request/${fields._id}`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="./loginImage.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {fields.Amount}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {fields.Details}
            
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions style={ {paddingLeft: '60px'} }>
        
        <Button  variant="contained" size="large" color="primary" onClick={proceedToPay(fields.Id)} >
          proceedToPay
        </Button>
      </CardActions>
    </Card>
   
    </div>
  );
}
