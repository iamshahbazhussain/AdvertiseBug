import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter,MemoryRouter} from "react-router-dom"
import { CssBaseline } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Switch, Route } from "react-router-dom";
import ResponsiveAppBar from './topBar'
import AdWithUs from "./AdWithUs";
import Congrads from "./Congrads";
import SearchPage from './Search';

import Travel from "./Pages/Travel/Travel";
import Social from "./Pages/Social/Social";
import Products from "./Pages/Products/Products";
import Food from "./Pages/Food/Food";
import Entertainment from "./Pages/Entertainment/Entertainment";
import Business from "./Pages/Business/Business";
import Homepage from "./Pages/Homepage";
import Other from "./Pages/Other";
import Payment from "./Payment";
import Page from './Page';
import button_drop from "./button_drop";
import List from "./List";
//import table from "./table";

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


export default function App() {
  return (
        <div>
          <Container />
          <Switch>
          <BrowserRouter>
            <Route
              exact path="/"
              component={ResponsiveAppBar}
            />
          
            <Route exact path="/Homepage"
              component={ResponsiveAppBar}
             />
            <Route exact path="/Products"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Entertainment"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Social"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Business"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Food"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Travel"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Other"
              component={ResponsiveAppBar}
             />
             <Route exact path="/AdWithUs"
              component={AdWithUs}
             />
             <Route exact path="/Congrads"
              component={Congrads}
             />


{/* Subcategory of Products:  */} 

              <Route exact path="/Technology"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Household Items"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Clothes"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Education and Work"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Vehicles"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Exercise"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Shopping and Stores"
              component={ResponsiveAppBar}
             />

{/* Subcategory of Entertainment: */}
             
             <Route exact path="/Movies"
              component={ResponsiveAppBar}
             />
             <Route exact path="/TV Shows"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Video Games"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Music"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Reading"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Toys and Games"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Sports"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Other - Entertainment"
              component={ResponsiveAppBar}
             /> 

{/* Subcategory of Social: */}

             <Route exact path="/Events"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Things To Do"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Lifestyle"
              component={ResponsiveAppBar}
             />
             

{/* Subcategory of Business: */}

             <Route exact path="/Services"
              component={ResponsiveAppBar}
             />
             <Route exact path="/B2B"
              component={ResponsiveAppBar}
             />
             <Route exact path="/B2C"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Companies and Organizations"
              component={ResponsiveAppBar}
             />
              <Route exact path="/New Businesses"
              component={ResponsiveAppBar}
             /> 
               <Route exact path="/NPO"
              component={ResponsiveAppBar}
             />
              <Route exact path="/Start Ups"
              component={ResponsiveAppBar}
             />
              <Route exact path="/Job Openings"
              component={ResponsiveAppBar}
             />

{/* Subcategory of Food: */}
            
            <Route exact path="/Food Products"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Resturaunts"
              component={ResponsiveAppBar}
             />
             <Route exact path="/New food"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Other - Food"
              component={ResponsiveAppBar}
             />

{/* Subcategory of Travel: */}

             <Route exact path="/Flights"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Hotels"
              component={ResponsiveAppBar}
             />
             <Route exact path="/Vacations"
              component={ResponsiveAppBar}
             />

            <Route exact path="/Search" component={SearchPage} />





{/* Other index's:  */}
{/* 
             <Route exact path="/AdWithUs"
              component={AdWithUs}
             />
             <Route exact path="/Payment"
              component={Payment}
             />
             <Route exact path="/Congrads"
              component={Congrads}
             />
             <Route exact path="/Page"
              component={Page}
             />

             <Route exact path="/button_drop"
              component={button_drop}
             /> 

             <Route exact path="/List"
              component={List}
             />

             <Route exact path="/table"
              component={table}
             /> */}
            
             </BrowserRouter>
             </Switch>
             <CssBaseline />
          </div>
  )
}