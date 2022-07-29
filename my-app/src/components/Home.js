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
import ResponsiveAppBar from './topBar'
import SimpleMenu from './button_drop'
import { useHistory } from 'react-router';
import { Link } from '@mui/material';
import Page from './Page';
import {singleFileUpload,addPost,getAmountTopPage,getMultipleFiles,getSingleFiles,getPagePosts,getTopPage,getTopRated,listAllAds,multipleFilesUpload} from "../data/api";


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff"
  },
  hero: {
    // backgroundImage:"##0000ff",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Solid_blue.svg/225px-Solid_blue.svg.png')`,
    height: "200px",
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
    fontFamily:"cursive",
    
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
    margin: "0 10px",
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
    display: "flex",
      justifyContent: "center"
  }
}));

function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState([]);
  const [description, setDescription] = React.useState([]);
  const [link, setLink] = React.useState([]);
  const [subject, setSubject] = React.useState([]);
  const [subsubject, setSubSubject] = React.useState([]);
  const [picOrVideo, setPicOrVideo] = React.useState([]);
  const [blog, setBlog] = React.useState([]);
  const [expand, setExpand] = React.useState(false);
  const [adPic,setAdPic]=React.useState()

  function adPicUpload(e){
    setAdPic(e.target.value)
    console.log(e)

}

  const getRandomPic=()=>{
    let arr=[
      "https://source.unsplash.com/random/?delivery",
      "https://source.unsplash.com/random/?packages",
      "https://source.unsplash.com/random/?boxes",
      "https://source.unsplash.com/random/?deliveryman",
    ]
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const onClick = () => {
    setExpand(!expand);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
      console.log(e)
      console.log(title)
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/posts/addPost",
        data: {title,description,link,subject,subsubject,picOrVideo,authorEmail:"TM@gmail.com"},
      
      }).done(function(fetchData) {
        console.log(fetchData.post.title)
        setBlog([...blog,{title: fetchData.post.title,
            description:fetchData.post.description,
            link:fetchData.post.link,
            subject:fetchData.post.subject,
            subsubject:fetchData.post.subsubject,
            picOrVideo:fetchData.post.picOrVideo,
            date:new Date(fetchData.post.date).toLocaleDateString('en-GB')}])
        console.log(blog)
        })
        .fail(function(jqXhr) {
        })
        setOpen(false);
  };
  React.useEffect(async () => {
    let data= await getPagePosts({page:(window.location.pathname).substring(1)});
    console.log(data.posts);
    //get post for page!
    setBlog(data.posts)
    // async function fetchPosts() {
    //   $.ajax({
    //     type: "POST",
    //     url: "http://localhost:8080/posts/getPagePosts",      
    //   }).done(function(fetchData) {
    //     let posts=fetchData.posts.map(el=>{
    //       el.date=new Date(el.date).toLocaleDateString('en-GB')
    //       return el
    //     })
    //     setBlog(fetchData.posts)
    //     })
    //     .fail(function(jqXhr) {
    //       console.log(jqXhr)
    //     })
    // }
    // fetchPosts();
  }, []);
  const handleUploadImg=(e)=>{
    console.log(e.target.files)
  }

  return (
    <div className="App">
      <AppBar className={classes.appBar} position="static">
        <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
        <div>
          <Typography  variant="h6"  color="primary"  >
          </Typography>
          </div>
          <div>
          {/* {sessionStorage.getItem("permissionType")=="admin" && */}
          <Button variant="outlined" className={classes.addButton} color="primary" onClick={handleClickOpen}>
            Add Post
            </Button>
            {/* } */}
        </div>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>Home</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Articles
        </Typography>
        <Grid container spacing={3}>
          {blog.map((post)=>(
               <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
              <CardActionArea>
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
  
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
        <DialogContent container spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(event) => setTitle(event.target.value)} 
          />
          </Grid>
           <Grid item xs={12}>
         <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            rows={7}
            name="description"
            label="write your description"
            id="post"
            onChange={(event) => setDescription(event.target.value)} 
        />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link"
            type="text"
            fullWidth
            onChange={(event) => setLink(event.target.value)} 
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            onChange={(event) => setSubject(event.target.value)} 
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="subsubject"
            label="SubSubject"
            type="text"
            fullWidth
            onChange={(event) => setSubSubject(event.target.value)} 
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="addPic"
            label="Picture/Video"
            type="text"
            fullWidth
            onChange={(event) => setPicOrVideo(event.target.value)} 
          />
          </Grid>
         <Grid item xs={12}>   
          <Button
          variant="contained"
          component="label"
          onChange={adPicUpload} 
        >
          Ad Picture or Video
          <input
            type="file"
            hidden
          />
      </Button>
      </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    
      </Container>
      
    </div>
  );
}

export default Home;