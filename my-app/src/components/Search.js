import React from "react";
import ResponsiveAppBar from "./topBar";
import { useHistory } from "react-router-dom";
import { TextField, Container, Skeleton } from '@mui/material';
import { Button } from '@material-ui/core';
import AdCard from './cards';
import { searchPost } from "../data/api";
import "../styles/style.css";


import Typography from '@material-ui/core/Typography';


export default function SearchPage(){

    const history = useHistory();
    const [isSearching, setisSearching] = React.useState(false);
    const [posts, setPosts] = React.useState([]);
  
    const handleSearchingState = ( bool ) => { setisSearching( bool ) }
    const handlePostState = ( posts ) => { setPosts( posts ) }

    var searchDelayTimer;
    const getDataFromAPI = async (e) => {
      handleSearchingState( false );
      clearTimeout( searchDelayTimer );
      searchDelayTimer = await setTimeout( async function() {
        handleSearchingState( true );
        const query = e.target.value;
        let result = await searchPost( query );
        setPosts( result );
        handleSearchingState( false );
      }, 700);
    }

    return (
        <div className="search-page" 
        // style={{
        //     display:"flex", 
        //     justifyContent:"center", 
        //     backgroundColor:"darkblue", 
        //     paddingTop:"1%",
        //     height:"60px"
        //   }}
          >
            <ResponsiveAppBar />
            <Container maxWidth="lg">
                <div className="page-header"
                style ={{ 
                    backgroundColor: "darkblue", 
                height: "65px",
                padding:"13px"

                }} 
                >
                    <Button 
                    variant="contained"
                    style={{backgroundColor:"#005ab3", width:"300px", height:"50px"}} 
                    color="primary"
                    onClick={()=> { history.push("/AdWithUs") }}>
                        Advertise With Us
                    </Button>
                    </div>
                <div 
                 style={{backgroundColor:"darkblue", height:"100px"}} 
                > 
                    <Typography
                    style ={{
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
                        fontFamily:"arial"
                    }}
                    > 
                        Search
                    </Typography>
    
                    {/* <p>{(window.location.pathname).substring(1).replaceAll("%20"," ")}</p> */}
                </div>



                <div className="search-input">
                    <br> 
                    </br>
                    {/* <p> <b> You can search by Title, Company or URL: </b> </p> */}
                    <TextField onChange={getDataFromAPI} 
                    fullWidth 
                    label= "Search..." 
                    variant="outlined" />
                </div>

                <div className="search-results">
                    { ( isSearching ) ? 
                        <>
                        <Skeleton sx={{mr: '2%'}} variant="rectangular" style={{width: '32%', height: '250px', display:'inline-block'}} animation="wave" /> 
                        <Skeleton sx={{mr: ''}} variant="rectangular" style={{width: '32%', height: '250px', display:'inline-block'}} animation="wave" />
                        <Skeleton sx={{ml: '2%'}} variant="rectangular" style={{width: '32%', height: '250px', display:'inline-block'}} animation="wave" />
                        </> : '' 
                    }
                    { 
                    ( !isSearching ) ? <AdCard posts={posts} /> : ''
                    }
                </div>
            </Container>
        </div>
    )
} 
