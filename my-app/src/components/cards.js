import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@mui/material';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
// Lightbox for images + videos
import FsLightbox from 'fslightbox-react';

import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    cardImage : {
        width: "100%",
        objectFit: 'contain',
        height: '300px',
        backgroundSize: 'contain'
    }
}));

export default function AdCard( data ){
    const classes = useStyles();
    const [isLightboxOpen, setLightbox] = React.useState(false);
    const [lightboxSource, setLightboxSource] = React.useState(false);

    const [expand, setExpand] = React.useState(false);

    const onToggleText = () => {
        setExpand(!expand)
      };

    const getFileType = ( file ) => {
        const types = new Map([
          ["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["tiff", "img"],
          ["mp4", "video"], ["3gp", "video"], ["ogg", "video"], ["avi", "video"], ["mov", "video"]
        ]);
        const url = new URL( file );
        const extension = url.pathname.split(".").pop();
        return types.get(extension);
    }

    const truncateString = ( string, length ) => {
        if( string.length > length ){
          return string.substring(0, length)+'...';
        }
        return string
    }
    
    return (
        <div>
            <FsLightbox
                toggler={isLightboxOpen}
                sources={[lightboxSource]}
            />
            <Grid container spacing={3}>
                { ( data.posts.length == 0 ) ? '0 result found' : '' }
                { 
                    data.posts.map( ( post ) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card style={{maxWidth: "100%",maxHeight:"100%",borderColor:post.border,borderStyle: "solid"}} >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.cardImage}
                                        component={getFileType('http://localhost:8080/'+(post?.image?.filePath || ''))}
                                        image = {'http://localhost:8080/'+(post?.image?.filePath || '')}
                                        title={post.title}
                                        //autoPlay
                                        //controls
                                        onClick={() => {
                                            setLightboxSource('http://localhost:8080/'+(post?.image?.filePath || ''));
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
                                        <Typography style={{ fontFamily: 'Arial', fontSize:"16px" }} 
                                        variant="body2" 
                                        color="secondary" 
                                        component="p">
                                        <ShowMoreText lines={2} 
                                            // more={<ExpandMore/>} 
                                            // less={<ExpandLess/>} 
                                            onClick={onToggleText} 
                                            expanded={expand} 
                                            // width={450} 
                                            >
                                        {truncateString(post.description, 300)}

                                        </ShowMoreText>
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
                                        // variant="subtitle1" 
                                        component="p" 
                                        style={{ fontFamily: 'Arial', fontSize:"16px" }}>
                                            {post.company}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}
