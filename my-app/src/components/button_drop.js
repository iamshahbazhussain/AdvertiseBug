import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import { ListItemText } from '@material-ui/core';
import {$,jQuery} from 'jquery';


export default function SimpleMenu(state) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history=useHistory()
  console.log(state)
  React.useEffect(() => {
    if (localStorage.getItem('isOpen')!=null && localStorage.getItem('isOpen')==state.dataFromParent.title.key ){
      let temp = document.getElementById(state.dataFromParent.title.key);
      setAnchorEl(temp)
      localStorage.setItem('isOpen',null);
      history.push({pathname:"/"+(window.location.pathname).substring(1)})
    }
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    localStorage.setItem('isOpen',state.dataFromParent.title.key);
    history.push({pathname:"/"+event.target.innerHTML})
    
    
    // history.push("/"+event.target.innerHTML)
  };
  const menuClick = (event)=>{
    console.log((event.target.innerHTML).replace(/\s/g, '') )
    history.push({pathname:"/"+event.target.innerHTML})
  }


  const handleClose = () => {
    // if window.location.pathname!==
    setAnchorEl(null);
  };

  return (
    <div id={state.dataFromParent.title.key}>
      <Button onclick={handleClick} style={{fontFamily:'arial', color:"white", textTransform: 'Capitalize', fontSize:'large'}} 
      aria-controls="simple-menu" 
      aria-haspopup="true" 
      onClick={handleClick} >
       {state.dataFromParent.title.key}
      </Button >
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        {state.dataFromParent.list.map((element)=>(
             <MenuItem onClick={menuClick}><ListItemText>{element}</ListItemText></MenuItem>
        ))
        }
      </Menu>
    </div>
  )
} 


