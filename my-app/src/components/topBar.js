import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Button, Avatar, Container } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {SearchableSelect} from '@dccs/react-searchable-select-mui'
import $ from 'jquery'
import Select from '@mui/material/Select';
import SimpleMenu from './button_drop'
import Home from './Home'
import Page from './Page'
import { Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useHistory } from "react-router-dom";

// Product pages:
import Exercise from "./Pages/Products/Exercise";
import Household from "./Pages/Products/Household";
import Shopping from "./Pages/Products/Shopping";
import Technology from "./Pages/Products/Technology";
import Vehicles from "./Pages/Products/Vehicles";
import Work from "./Pages/Products/Work";
import Clothes from "./Pages/Products/Clothes";

// Social pages:
import Events from "./Pages/Social/Events";
import Lifestyle from "./Pages/Social/Lifestyle";
import Ttd from "./Pages/Social/Ttd";

// Travel pages:
import Flights from "./Pages/Travel/Flights";
import Hotels from "./Pages/Travel/Hotels";
import Vacations from "./Pages/Travel/Vacations";

// Food pages:
import F_other from "./Pages/Food/F_other";
import Foodproducts from "./Pages/Food/Foodproducts";
import Newfood from "./Pages/Food/Newfood";
import Resturaunts from "./Pages/Food/Resturaunts";

// Entertainment pages:
import E_other from "./Pages/Entertainment/E_other";
import Movies from "./Pages/Entertainment/Movies";
import Music from "./Pages/Entertainment/Music";
import Reading from "./Pages/Entertainment/Reading";
import Sports from "./Pages/Entertainment/Sports";
import Toys from "./Pages/Entertainment/Toys";
import Tv from "./Pages/Entertainment/Tv";
import Videogames from "./Pages/Entertainment/Videogames";

// Business pages:
import B2B from "./Pages/Business/B2B";
import B2C from "./Pages/Business/B2C";
import Companies from "./Pages/Business/Companies";
import Newbusiness from "./Pages/Business/Newbusiness";
import NPO from "./Pages/Business/NPO";
import Openings from "./Pages/Business/Openings";
import Services from "./Pages/Business/Services";
import Startup from "./Pages/Business/Startup";
import { searchPost } from "../data/api";

// LIST
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Skeleton from '@mui/material/Skeleton';

import AdCard from './cards';


const pages = {'Homepage':[],
'Products':['Technology','Household Items','Clothes','Education and Work','Vehicles','Exercise','Shopping and Stores'],
'Entertainment':['Movies','TV Shows','Video Games','Music','Reading','Toys and Games','Sports','Other - Entertainment'],
'Social':['Events','Things To Do','Lifestyle'],
'Business':['Services','B2C','B2B','NPO','Companies and Organizations','New Businesses','Start Ups','Job Openings'],
'Food':['Food Products','Resturaunts','New Food','Other - Food'],
'Travel':['Flights','Hotels','Vacations'],
'Other':[]}; 
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [blog, setBlog] = React.useState([]);
  const [myOptions, setmyOptions] = React.useState([]);
  const [dialogOpen, setdialogOpen] = React.useState(false);
  const [isSearching, setisSearching] = React.useState(false);

  const history = useHistory();

  const handleDialogState = () => {
    setdialogOpen(!dialogOpen);
  }
  const handleSearchingState = ( state ) => {
    setisSearching(state);
  }


  const handleChange = (event)=>{
    setValue(event.target.value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleQuery = (e) => {
    //get title from ads
    //check which title start with query
    //send back items
    //if clicked will send to the right ad on the page

    //results of search with placment
  };

  var searchDelayTimer;
  const getDataFromAPI = async (e) => {
    handleSearchingState( false );
    clearTimeout(searchDelayTimer);
    searchDelayTimer = await setTimeout( async function() {
      handleSearchingState( true );
      const query = e.target.value;
      let result = await searchPost( query );
      setmyOptions( result );
      handleSearchingState( false );
    }, 700);
  }

  

    // React.useEffect(() => {
    // async function fetchPosts() {
    //     $.ajax({
    //     type: "POST",
    //     url: "http://localhost:8080/posts/listPosts",      
    //     }).done(function(fetchData) {
    //     let id,value
    //     let counter=0

    //     let posts=fetchData.posts.map(el=>{
    //         id=counter++
    //         value=el.title+' '+el.post

    //         return {"id":id,"value":value}
    //     })
    //     setBlog(posts)
    //     console.log(posts)
    //     })
    //     .fail(function(jqXhr) {
    //         console.log(jqXhr)
    //     })
    // }
    // fetchPosts();
    // }, []);
  const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));


  const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
  }));
  const SearchNav = styled('nav')(({ theme }) => ({
    color: 'black', 
    width: '100%',
  }));
  const SearchList = styled('ul')(({ theme }) => ({
    listStyle: 'none',
    padding: '0px',
    margin: '0px'
  }));
  const SearchListItem = styled('li')(({ theme }) => ({
    position: 'relative', 
    display: 'block',
    color: 'black',
    padding: '10px',
    cursor: 'pointer',
    '&:hover' : {
      backgroundColor : 'rgba(0, 0, 0, 0.1)'
    }
  }));

  const SearchInputStyle = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
 
  return (
    <div>
    <AppBar style={{backgroundColor:"#1565C0"}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            color = "white"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            The Web Bulletin
          </Typography>

          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'flex', md: 'none' }
             }}>
            <IconButton
              size="normal"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {Object.keys(pages).map((page,list) => (
                <Select key={page} onClick={handleCloseNavMenu}>
                {list.map((ele) => (
                <MenuItem key={ele} >
                  <Typography textAlign="center" fontFamily="arial" fontWeight="normal">{ele}</Typography>
                </MenuItem>))} 
                </Select>
              ))} */}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            The Web Bulletin
          </Typography>
          <Box  sx={{  flexGrow: 1,  display: { xs: 'none', md: 'flex' } }} >
            {Object.keys(pages).map((key) => (
              <SimpleMenu key={key} dataFromParent = {{"title":{key},"list":pages[key]}}/>
            ))}
          </Box>
          <Box>

          <Button size="lg" variant="contained" style ={{backgroundColor:"darkblue", width:"200px"}} onClick={()=> { history.push("/Search") }}>
            <SearchIcon /> Search
          </Button>
    </Box>


        </Toolbar>
      </Container>
    </AppBar>

    <Container>
        <Switch>
        <Route exact path="/Homepage"
          component={Page}
          />
          <Route exact path="/Products"
          component={Page}
          />
          <Route exact path="/Entertainment"
          component={Page}
          />
          <Route exact path="/Social"
          component={Page}
          />
          <Route exact path="/Business"
          component={Page}
          />
          <Route exact path="/Food"
          component={Page}
          />
          <Route exact path="/Travel"
          component={Page}
          />
          <Route exact path="/Other"
          component={Page}
          />
          <Route exact path="/"
          component={Page}
          />

          
{/* Subcategory of Products:  */} 

             <Route exact path="/Technology"
              component={Page}
             />
             <Route exact path="/Household Items"
              component={Page}
             />
             <Route exact path="/Clothes"
              component={Page}
             />
             <Route exact path="/Education and Work"
              component={Page}
             />
             <Route exact path="/Vehicles"
              component={Page}
             />
             <Route exact path="/Exercise"
              component={Page}
             />
             <Route exact path="/Shopping and Stores"
              component={Page}
             />

{/* Subcategory of Entertainment: */}
             
             <Route exact path="/Movies"
              component={Page}
             />
             <Route exact path="/TV Shows"
              component={Page}
             />
             <Route exact path="/Video Games"
              component={Page}
             />
             <Route exact path="/Music"
              component={Page}
             />
             <Route exact path="/Reading"
              component={Page}
             />
             <Route exact path="/Toys and Games"
              component={Page}
             />
             <Route exact path="/Sports"
              component={Page}
             />
             <Route exact path="/Other - Entertainment"
              component={Page}
             />

{/* Subcategory of Social: */}

             <Route exact path="/Events"
              component={Page}
             />
             <Route exact path="/Things To Do"
              component={Page}
             />
             <Route exact path="/Lifestyle"
              component={Page}
             />
             

{/* Subcategory of Business: */}

             <Route exact path="/Services"
              component={Page}
             />
             <Route exact path="/B2B"
              component={Page}
             />
             <Route exact path="/B2C"
              component={Page}
             />
             <Route exact path="/NPO"
              component={Page}
             />
             <Route exact path="/Companies and Organizations"
              component={Page}
             />
              <Route exact path="/New Businesses"
              component={Page}
             />
              <Route exact path="/Start Ups"
              component={Page}
             />
              <Route exact path="/Job Openings"
              component={Page}
             />

{/* Subcategory of Food: */}
            
            <Route exact path="/Food Products"
              component={Page}
             />
             <Route exact path="/Resturaunts"
              component={Page}
             />
             <Route exact path="/New Food"
              component={Page}
             />
             <Route exact path="/Other - Food"
              component={Page}
             />

{/* Subcategory of Travel: */}

             <Route exact path="/Flights"
              component={Page}
             />
             <Route exact path="/Hotels"
              component={Page}
             />
             <Route exact path="/Vacations"
              component={Page}
             />




          </Switch>
      </Container>
    </div>
  );
};


