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
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ResponsiveAppBar from './topBar'
import SimpleMenu from './button_drop'
import { useHistory } from 'react-router';
import { TextFieldsRounded } from '@mui/icons-material';
import { TextFieldsSharp } from '@material-ui/icons';
import { textFieldClasses } from '@mui/material';
import Home from './Home';
import {singleFileUpload,addPost,getAmountTopPage,getMultipleFiles,getSingleFiles,getPagePosts,getTopPage,getTopRated,listAllAds,multipleFilesUpload} from "../data/api";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import { Link, ButtonBase } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import schedule from 'node-schedule';
// Lightbox for images + videos
import FsLightbox from 'fslightbox-react';

schedule.scheduleJob('0 0 * * *', () => { 
  //change days post

}) // run everyday at midnight

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
    // [theme.breakpoints.down("sm")]: {
    //   height: 300,
    //   fontSize: "3em"
    // },
    fontFamily:"arial",
    
  },
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  media: {
    // height: "240px",
    // // float: 'left',
    // width:  "350px",
    // // height: '300px',
    // objectFit: "contain",

    width: '100%',
    height: undefined,
    aspectRatio: 1,
    // resizeMode:"contain",
   
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
  },
  cardImage : {
    width: "100%",
    objectFit: 'contain',
    height: '300px',
    backgroundSize: 'contain'
  }
}));




function Page() {
  const classes = useStyles();
  let history=useHistory();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState([]);
  const [post, setPost] = React.useState([]);
  const [blog, setBlog] = React.useState([]);
  const [top_blogs, setTopBlogs] = React.useState([]);
  const [expand, setExpand] = React.useState(false);
  const [isLightboxOpen, setLightbox] = React.useState(false);
  const [lightboxSource, setLightboxSource] = React.useState(false);

  const onToggleText = () => {
    setExpand(!expand)
  };

  const handleClickOpen=()=>{
    history.push({pathname:"./AdWithUs"});
  }

  const getFileType = ( file ) => {
    const types = new Map([
      ["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["tiff", "img"],
      ["mp4", "video"], ["3gp", "video"], ["ogg", "video"], ["avi", "video"], ["mov", "video"]
    ]);
    const url = new URL( file );
    const extension = url.pathname.split(".").pop();
    return types.get(extension);
  }

  React.useEffect(async () => {
    let data= await getPagePosts({page:(window.location.pathname).substring(1)});
    //get post for page!
    console.log(data)
    let image;
    // // data.top_posts.forEach(async (el)=>{
    // //   if (image!=undefined){
    // //     image = await getSingleFiles(el._id)
    // //     el.image=image
    // //   }
    
    // });
    
    console.log(data.posts.length)
    if(data.posts.length!=0){
      data.posts.forEach(el=>{
        if (el.image==undefined){
          delete data.posts[data.posts.indexOf(el)]
        }else{
          let temp=el.image.filePath.split("\\")
          el.image.filePath=temp.join("//");
          console.log(el.image.filePath)
        }
      })
      setBlog(data.posts);
    }

  }, []);

  const handleUploadImg=(e)=>{
    console.log(e.target.files)
  }

  const truncateString = ( string, length ) => {
    if( string.length > length ){
      return string.substring(0, length)+'...';
    }
    return string
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
        <Box>{(window.location.pathname).substring(1).replaceAll("%20"," ")}</Box>
      </Box>

      <FsLightbox
                toggler={isLightboxOpen}
                sources={[lightboxSource]}
              />

      <Container maxWidth="lg" className={classes.blogsContainer}>
        {/* <Typography variant="h4" className={classes.blogTitle}>
          Advertisements:
        </Typography> */}
        

        <Grid container spacing={3}>
          {blog.map((post)=>(
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{maxWidth: "100%",maxHeight:"100%",borderColor:post.border,borderStyle: "solid"}} >
              <CardActionArea>
                <CardMedia
                    className={classes.cardImage}
                    component={getFileType('http://localhost:8080/'+post.image.filePath)}
                    image = {'http://localhost:8080/'+post.image.filePath}
                    title={post.title}
                    //autoPlay
                    //controls
                    //'http://localhost:8080/'+post.image.filePath
                    onClick={() => {
                      setLightboxSource('http://localhost:8080/'+post.image.filePath);
                      setLightbox(!isLightboxOpen);
                    }}
                  />
                  <CardContent>
                  <Typography gutterBottom 
                    style={{ 
                      fontFamily:'Arial', 
                      fontSize:"22px" }}
                  >
                      <b> 
                      {post.title}
                      </b>
                      </Typography>
                  <Typography style={{ 
                    fontFamily: 'Arial', 
                    fontSize:"16px" 
                  }} 
                  color="secondary" 
                  // variant="body2" 
                
                  // component="p"
                  >
                    <ShowMoreText lines={2} 
                        // more={<ExpandMore/>} 
                        // less={<ExpandLess/>} 
                        onClick={onToggleText} 
                        expanded={expand} 
                        // width={450} 
                        >
                      {truncateString(post.description, 300)}

                      </ShowMoreText>
            
                      {/* {truncateString(post.description, 300)} */}
                    </Typography>
                    <Link onClick={
                      () => {
                        try {
                          let url = new URL(post.link);
                          window.open(post.link, '_blank').focus();
                        } catch (_) {
                          window.open('https://'+post.link, '_blank').focus();
                        }
                        return;
                      }
                    } fontSize="16px">{post.link}</Link>
                    <Typography 
                    style={{ 
                      fontFamily: 'Arial', 
                      fontSize:"16px" 
                    }}
                    // variant="subtitle1" 
                    // component="p"
                    >
                        {post.company}
                    </Typography>
                  </CardContent>
                </CardActionArea>
            </Card>
            </Grid>
      
          ))}
            
         
        </Grid>
        
      </Container>
      
    </div>
  );
}

export default Page;