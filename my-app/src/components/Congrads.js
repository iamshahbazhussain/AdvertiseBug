import { Button } from "@material-ui/core";
import React from "react";
import Typography from '@material-ui/core/Typography';


export default function Payment() {
    return (
        <div>
        <Typography variant="h1">
            Thank you for advertising with us!! 
        </Typography>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        
        <Button variant="contained">
        
            {/* Go Back To Homepage */}

            <a href = "/"> 
            Go Back To Homepage
            </a> 
         </Button>
        </div>
    );
}