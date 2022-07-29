import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import $ from 'jquery'
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ResponsiveAppBar from '../../topBar'
import SimpleMenu from '../../button_drop'
import { useHistory } from 'react-router';
import { TextFieldsRounded } from '@mui/icons-material';
import { TextFieldsSharp } from '@material-ui/icons';
import { textFieldClasses } from '@mui/material';
import Home from '../../Home';
import {singleFileUpload,addPost,getAmountTopPage,getMultipleFiles,getSingleFiles,getPagePosts,getTopPage,getTopRated,listAllAds,multipleFilesUpload} from "../../../data/api";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import { Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "darkblue", 
    height: "65px",
    padding: '6px'
  },
  hero: {
    backgroundColor: "darkblue",
    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Solid_blue.svg/225px-Solid_blue.svg.png')`,
    height: "100px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    },
    fontFamily:"arial",
    
  },
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240
  },
  cardActions: {
    display: "flex",
    margin: "10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center"
  },
  addButton:{
    height: '50px',
    width: '300px',
    display: "flex",
      justifyContent: "center"
  }
}));



function B2B() {
  const classes = useStyles();
  let history=useHistory();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState([]);
  const [post, setPost] = React.useState([]);
  const [blog, setBlog] = React.useState([]);
  const [top_blogs, setTopBlogs] = React.useState([]);
  const [expand, setExpand] = React.useState(false);

  const onClick = () => {
    setExpand(!expand);
  };

  const handleClickOpen=()=>{
    history.push({pathname:"./AdWithUs"});
  }

  React.useEffect(async () => {
    let data= await getPagePosts({page:(window.location.pathname).substring(1)});
    //get post for page!
    if(data.posts!=undefined){
      setBlog([...data.top_posts,...data.posts]);
    }

  }, []);

  const handleUploadImg=(e)=>{
    console.log(e.target.files)
  }

  return (
    <div className="App">
      <AppBar className={classes.appBar} position="static"
      >
        <Toolbar style={{display:"flex", justifyContent:"center"}}>
        <div>
          <Typography  variant="h6"  color="primary"  >
          </Typography>
          </div>
          <div>
          {/* {sessionStorage.getItem("permissionType")=="admin" && */}
          <Button variant="contained" className={classes.addButton} color='primary' onClick={handleClickOpen}>
          Advertise With Us
            </Button>
        </div>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>{"B2B"}</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        {/* <Typography variant="h4" className={classes.blogTitle}>
          Advertisements:
        </Typography> */}
        <Grid container spacing={3}>
          {blog.map((post)=>(
               <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card} elevation={post.elevation}>
              <CardActionArea key={post.elevation} elevation={post.elevation}>
                <CardMedia
                  className={classes.media}
                  image={post.picOrVideo}
                  title={post.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                  </Typography>
                  <Typography style={{ fontFamily: 'Open Sans', fontSize:"20px" }} variant="body2" color="textSecondary" component="p">
                  <ShowMoreText
                    lines={2}
                    more={<ExpandMore />}
                    less={<ExpandLess />}
                    onClick={onClick}
                    expanded={expand}
                    width={30}
                    
                  
                >
                   {post.description}
                </ShowMoreText>
                    
                  </Typography>
                  <Link herf={post.link}>{post.link}</Link>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions} >
                <Box className={classes.author}>
                  <Avatar src={post.authorImg} />
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p">
                      {post.authorName}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" component="p">
                      {post.created_at}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <BookmarkBorderIcon />
                  <FavoriteIcon />
                </Box>
              </CardActions>
            </Card>
            </Grid>
      
          ))}
         
        </Grid>
        
      </Container>
      
    </div>
  );
}

export default B2B;