import * as React from 'react';
import { DataGrid, GridFilterInputMultipleValue } from '@mui/x-data-grid';
import { CMultiSelect } from '@coreui/react-pro';
import Button from '@mui/material/Button';
import Payment from "./Payment";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import TextField from '@material-ui/core/TextField';
import $ from 'jquery'
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
import { singleFileUpload, addPost, getAmountTopPage, getMultipleFiles, getSingleFiles, getSubSubject, getSubject, getTopPage, getTopRated, listAllAds, multipleFilesUpload } from "../data/api";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { randomInt } from 'crypto';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categorys = [
  'Products',
  'Entertainment',
  'Social',
  'Business',
  'Food',
  'Travel',
  'Other',
];

const pages = {
  'Homepage': [],
  'Products': ['Technology', 'Household Items', 'Clothes', 'Education and Work', 'Vehicles', 'Exercise', 'Shopping and Stores'],
  'Entertainment': ['Movies', 'TV Shows', 'Video Games', 'Music', 'Reading', 'Toys and Games', 'Sports', 'Other'],
  'Social': ['Events', 'Things To Do', 'Lifestyle'],
  'Business': ['Services', 'B2C', 'B2B', 'NPO', 'Companies and Organization', 'New Businesses', 'Start Up', 'Job Openings'],
  'Food': ['Food Products', 'Resturaunts', 'New', 'Other'],
  'Travel': ['Flights', 'Hotels', 'Vacations'],
  'Other': []
};



export default function AdWithUs() {
  const history = useHistory();
  const [singleProgress, setSingleProgress] = React.useState(0);
  const [title, setTitle] = React.useState([]);
  const [post, setPost] = React.useState([]);



  const [mainCategory, setMainCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [subcategorys, setsubcategorys] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [singleFileId, setSingleFileId] = React.useState(123);
  const [company, setCompany] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [link, setLink] = React.useState([]);

  const [snakOpen, setSnakOpen] = React.useState(false);


  const [singleFile, setSingleFile] = React.useState('');
  const [multipleFiles, setMultipleFiles] = React.useState('');
  const [multipleProgress, setMultipleProgress] = React.useState(0);
  const subjects = ['Homepage', 'Products', 'Entertainment', 'Social', 'Business', 'Food', 'Travel', 'Other']
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [disabled_cells, setdisabled_cells] = React.useState([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],]);
  let top_cells = [
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],]

  const day = [0, 24, 48, 72, 96, 120, 144, 168];
  React.useEffect(async () => {
    let today = Date.now();
    let topPages;

    for (let i = 0; i < day.length; i++) {
      console.log(today + day[i] * 60 * 60 * 1000)
      topPages = await getAmountTopPage(today + day[i] * 60 * 60 * 1000);
      top_cells[0][i] = topPages.data.topSubsub > 5 ? true : false
      top_cells[1][i] = topPages.data.topSub > 5 ? true : false
      top_cells[2][i] = topPages.data.topHome > 5 ? true : false
      console.log(topPages)
    }
    setdisabled_cells(top_cells)
    console.log(top_cells)
    console.log(disabled_cells);

  }, []);


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  }
  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setSingleProgress(percentage);
    }
  }
  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    }
  }

  const uploadSingleFile = async () => {
    try {
      setSingleFileId(randomInt());
      const formData = new FormData();
      formData.append('file', singleFile);
      console.log(singleFile);
      await singleFileUpload(formData, singleFileOptions);
      // props.getsingle();
    } catch (err) {
      console.log("error!uploadSingleFile");
    }
  }
  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append('title', title);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append('files', multipleFiles[i]);
    }
    await multipleFilesUpload(formData, mulitpleFileOptions);
    // props.getMultiple();
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    //ADD POST
    try {
      await uploadSingleFile();
    } catch (err) {
      console.log("error!");
    }
    setOpen(false);
    // history.push({pathname:"/AdWithUs", dataFromParent:{title, post, singleFile,mainCategory,subCategory} });
  };
  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
    setSingleProgress(100);
    console.log(e.target.files[0]);
  }



  return (
    <div style={{
      height: 500,
      width: '100%',
      paddingLeft: '8%',
      paddingRight: '8%',
      paddingTop: '3%',
      // backgroundImage: "linear-gradient(to top, #f1fffe , #b4fdb4 )"
      // paddingLeft:'40%'

    }}>
      <Typography
        variant="h2"
        color="primary"
        align="center"
      >
        Your Advertisment
      </Typography>
      <br>
      </br>

      <Box align="center"
      // paddingRight="70px"
      >
        {/*     
    <div style={{ height: 500, width: '100%',padding:'5%'  }}> */}
        {/* <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box> */}

        {/* <Box sx={{ display: 'flex', flexWrap: 'wrap' }}> */}

        <Grid container spacing={3}>
          <Grid item md={12}>
            <Button
              variant="contained"
              component="label"
              onChange={(e) => SingleFileChange(e)}>

              <Typography>
                <b>
                  Upload your advertisment picture or video
                  {/* (The ratio of height:length is 1:1.16, for the area of the image) */}

                </b>
              </Typography>
              <input
                type="file"
                hidden
              />
              <CircularProgressbar
                value={singleProgress}
                text={`${singleProgress}%`}
                styles={buildStyles({
                  rotation: 1,
                  strokeLinecap: 'butt',
                  textSize: '16px',
                  pathTransitionDuration: 0.7,
                  pathColor: `rgba(122, 219, 104, ${singleProgress / 100})`,
                  textColor: '#fff',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e9"8c7',
                })}
              />
              <br>
              </br>
            </Button>
            <TextField
              autoFocus
              margin="normal"
              id="title"
              label="Company Name:"
              type="text"
              variant="outlined"
              fullWidth
              onChange={(event) => setCompany(event.target.value)}
            />
            <br>
            </br>
            <TextField
              autoFocus
              margin="normal"
              id="title"
              label="Advertisement Title:"
              type="text"
              variant="outlined"
              fullWidth
              onChange={(event) => { setTitle(event.target.value); console.log(event.target.value) }}
            />
            {/* </Grid>
           <Grid item xs={12}> */}

            <br>
            </br>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              value={description}
              rows={6}
              name="post"
              label={`Advertisement Description: (${description.length}/300 character limit)`}
              id="post"
              onChange={(event) => event.target.value && event.target.value.length <= 300 ? setDescription(event.target.value) : null}
            />
            <br>
            </br>

            <TextField
              autoFocus
              margin="normal"
              id="title"
              label="URL link for company website:"
              type="text"
              variant="outlined"
              fullWidth
              onChange={(event) => setLink(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <br>
          </br>



          <Grid item>
            <Typography>
              <div> Please select which main category page you would want your adverstiment to be on:
              </div>
            </Typography>

            <div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categorys}
                sx={{ width: 300 }}
                onChange={(event, value) => { setMainCategory(value); setsubcategorys(pages[value]); }} // prints the selected value
                renderInput={(params) => <TextField {...params} label="Main Category" />}
              />
            </div>  </Grid>
          <Grid item>


            <Typography>
              <div> Please select which subcategory page you would want your adverstiment to be on:
              </div>
            </Typography>

            <div>
              <Autocomplete
                disablePortal
                autoHighlight
                id="combo-box-demo"
                options={subcategorys}
                sx={{ width: 300 }}
                onChange={(event, value) => setSubCategory(value)}
                renderInput={(params) => <TextField {...params} label="Subcategory" />}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Payment dataFromParent={{ title, description, singleFile: singleFile, subject: mainCategory, subsubject: subCategory, company, link, disabled_cells: top_cells }}></Payment>

    </div>
  );
}
