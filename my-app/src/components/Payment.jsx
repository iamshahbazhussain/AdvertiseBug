import { Button } from "@material-ui/core";
import React, { useState } from "react";
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { singleFileUpload, addPost, getAmountTopPage, getMultipleFiles, getSingleFiles, getSubSubject, getSubject, getTopPage, getTopRated, listAllAds, multipleFilesUpload } from "../data/api";
import { randomInt } from "crypto";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Circle, TramRounded } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


import "./Payment.scss"
// This values are the props in the UI
const choosen_day = { startTime: [], endTime: [] };
const choosen_page = { pages: [] };
const day = [0, 24, 48, 72, 96, 120, 144, 168];
const currency = "USD";
const style = { "layout": "vertical" };
let amount = 0;
const prices = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 10, 10, 10, 10, 10, 10],
  [0, 0, 10, 20, 20, 20, 20, 20, 20],
  [0, 0, 0, 15, 15, 15, 15, 15, 15],
  [0, 10, 30, 50, 50, 50, 50, 50, 50],
  [0, 0, 50, 100, 100, 100, 100, 100, 100],
  [0, 20, 100, 200, 200, 200, 200, 200, 200],
]

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Payment = ()=>{

  let tableData = [
    {
      id:"sub",
      title:"Advertisement on subcategory page",
      pricing:[{id:"1", selected:false , value:0} , {id:"2", selected:false , value:0} , {id:"3", selected:false , value:10} , {id:"4", selected:false , value:10} , {id:"5", selected:false , value:10} ,{id:"6", selected:false , value:10} ,{id:"7", selected:false , value:10}]
    },
    {
      id:"subTop",
      title:"Advertisement on top 2 rows of subcategory page",
      pricing:[{id:"1", selected:false , value:0} , {id:"2", selected:false , value:10} , {id:"3", selected:false , value:20} , {id:"4", selected:false , value:20} , {id:"5", selected:false , value:20} ,{id:"6", selected:false , value:20} ,{id:"7", selected:false , value:20}]
    },
    {
      id:"main",
      title:"Advertisement on main category page",
      pricing:[{id:"1", selected:false , value:0} , {id:"2", selected:false , value:0} , {id:"3", selected:false , value:15} , {id:"4", selected:false , value:15} , {id:"5", selected:false , value:15} ,{id:"6", selected:false , value:15} ,{id:"7", selected:false , value:15}]
    },
    {
      id:"mainTop",
      title:"Advertisement on top 2 rows of main category",
      pricing:[{id:"1", selected:false , value:10} , {id:"2", selected:false , value:30} , {id:"3", selected:false , value:50} , {id:"4", selected:false , value:50} , {id:"5", selected:false , value:50} ,{id:"6", selected:false , value:50} ,{id:"7", selected:false , value:50}]
    },
    {
      id:"home",
      title:"Advertisement on Homepage",
      pricing:[{id:"1", selected:false , value:0} , {id:"2", selected:false , value:50} , {id:"3", selected:false , value:100} , {id:"4", selected:false , value:100} , {id:"5", selected:false , value:100} ,{id:"6", selected:false , value:100} ,{id:"7", selected:false , value:100}]
    },
    {
      id:"homeTop",
      title:"Advertisement on top 2 rows of Homepage",
      pricing:[{id:"1", selected:false , value:20} , {id:"2", selected:false , value:100} , {id:"3", selected:false , value:200} , {id:"4", selected:false , value:200} , {id:"5", selected:false , value:200} ,{id:"6", selected:false , value:200} ,{id:"7", selected:false , value:200}]
    },
  ]

  const [data , setData] = useState(tableData)
  const [sub , setsub] = useState([])
  const [subTop , setSubTop] = useState([])
  const [main , setMain] = useState([])
  const [mainTop , setMainTop] = useState([])
  const [home , setHome] = useState([])
  const [homeTop , setHomeTop] = useState([])

  const entringData = (priceobj , cat)=>{
   let driveData = data.map((val , index)=>{
    if(val.id == cat){
      return {
        ...val,
        pricing: val.pricing.map((pval,ind)=>{
          if(pval.id == priceobj.id){
            return{
              ...pval,
              selected: !pval.selected
            }
          }
          return pval
        })
      }
    }
    return val
   })

   if(cat == "sub"){
    if(priceobj.selected == true){
      // set
    }
   }

setData(driveData)
   console.log(driveData);
  }

return (
  <>
  <div className="table_container">
    <table>
      <tr>
        <th> Advertisement location </th>
        <th> Ad for today day 1 </th>
        <th> Ad for today day 2 </th>
        <th> Ad for today day 3 </th>
        <th> Ad for today day 4 </th>
        <th> Ad for today day 5 </th>
        <th> Ad for today day 6 </th>
        <th> Ad for today day 7 </th>
      </tr>
  {
    data.map((data)=>{
      return(
        <>
        <tr> 
          <td> {data.title} </td> 
        {
          data.pricing.map((val , index)=>{
            return(
              <>
              <td style={val.selected == null ? {backgroundColor:"#ff000061" , cursor:"no-drop"} : val.selected == true ? {backgroundColor:"#3f51b5"} : null} onClick={val.selected != null ? ()=> entringData(val , data.id) : null} >{val.value == 0 ? "Free" : `$${val.value}`}</td>
              </>
            )
          })
        }
        </tr>
        </>
      )
    })
  }
    </table>
    <Button className="btn" onClick={entringData}> Submit </Button>
  </div>
  </>
)
}

export default Payment



// export default class Table extends React.Component {
//   state = {
//     cells: [
//       [true, true, true, true, true, true, true, true],
//       [true, false, false, false, false, false, false, false],
//       [true, false, false, false, false, false, false, false],
//       [true, false, false, false, false, false, false, false],
//       [true, false, false, false, false, false, false, false],
//       [true, false, false, false, false, false, false, false],
//       [true, false, false, false, false, false, false, false]
//     ],
//     disabled: this.props.dataFromParent.disabled_cells,
//     open: false,
//     openPayment: false,
//     singleProgress: 0,
//     accpect_terms: false,
//     is_28_days: false,
//     is_full_sub: false,
//     selectedDate: "1/1/1",
//     snakOpen: false
//   };

//   componentDidMount() {
//     console.log(this.props.dataFromParent.disabled_cells)
//     console.log(this.state.disabled)
//   }

//   // clickBackHome(){ 
//   //   this.props.dataFromParent.history.push("/Homepage") ;
//   // }


//   handleTwentyEightDays = (event) => {
//     console.log(event)
//     this.setState({ ...this.state, is_28_days: event.target.checked });
//   };

//   handleAcceptTrems = (event) => {
//     this.setState({ ...this.state, checked: event.target.checked });
//   };

//   singleFileOptions = {
//     onUploadProgress: (progressEvent) => {
//       const { loaded, total } = progressEvent;
//       const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
//       this.setState({ ...this.state, singleProgress: percentage });
//     }
//   }
//   uploadSingleFile = async (singleFile, id) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', singleFile);
//       formData.append('id', id);
//       console.log(formData)
//       await singleFileUpload(formData, this.singleFileOptions);
//       // props.getsingle();
//     } catch (err) {
//       console.log("error!uploadSingleFile");
//     }
//   }


//   onNextClick = async () => {
//     //need fix: make sure it's approved!


//     let singlfile = this.props.dataFromParent.singleFile;
//     console.log(this.singleProgress)
//     let title = this.props.dataFromParent.title;
//     let description = this.props.dataFromParent.description;
//     let link = this.props.dataFromParent.link;
//     let company = this.props.dataFromParent.company;
//     let subject = this.props.dataFromParent.subject; //this is an array
//     let subsubject = this.props.dataFromParent.subsubject;//this ia an array
//     console.log(subject)
//     console.log(this.props.dataFromParent)
//     amount = 0;
//     let isTopPage = [];
//     for (let i = 0; i < this.state.cells.length; i++) {
//       for (let j = 0; j < this.state.cells[0].length; j++) {
//         if (this.state.cells[i][j] == true) {
//           amount += prices[i][j];
//           if (i > 0 && j > 0) {
//             if (this.state.is_28_days && prices[i][j] != 0) {
//               let k = 0
//               while (k < 4) {
//                 choosen_day.endTime.push(Date.now() + day[j] * 60 * 60 * 1000 + 2073600 * k);
//                 choosen_day.startTime.push(Date.now() + day[j - 1] * 60 * 60 * 1000 + 2073600 * k);
//                 k += 1
//               }
//             } else {
//               choosen_day.endTime.push(Date.now() + day[j] * 60 * 60 * 1000);
//               choosen_day.startTime.push(Date.now() + day[j - 1] * 60 * 60 * 1000);
//             }
//             console.log(choosen_day)
//             switch (i) {
//               case 1: { choosen_page.pages.push(subsubject); isTopPage.push(false); break; }
//               case 2: { choosen_page.pages.push(subsubject); isTopPage.push(true); break; }
//               case 3: { choosen_page.pages.push(subject); isTopPage.push(false); break; }
//               case 4: { choosen_page.pages.push(subject); isTopPage.push(true); break; }
//               case 5: { choosen_page.pages.push("Homepage"); isTopPage.push(false); break; }
//               case 6: { choosen_page.pages.push("Homepage"); isTopPage.push(true); break; }
//             }
//             console.log(i)
//           }
//           console.log(amount);
//         }
//       }
//     }
//     if (!this.props.dataFromParent.singleFile || isTopPage.length <= 0) {
//       this.setState({ ...this.state, snakOpen: true })
//       return
//     }
//     if (this.state.is_28_days) {
//       amount = amount * 4
//       console.log(amount)
//     }

//     let data = await addPost({
//       ...choosen_page,
//       ...choosen_day,
//       isTopPage,
//       title,
//       description,
//       link,
//       company,
//       subject,
//       subsubject,
//       file: singlfile
//     });
//     // resetParams(); 

//     console.log(data);

//     if (amount > 0) {
//       this.handleClickOpenPayment();
//     }
//     else {
//       // console.log(this.props)
//       // this.props.history.push({
//       //     pathname: "./Congrads",});
//       this.handleClickOpen();
//     }
//   }

//   handleClickOpen = () => {
//     this.setState({ ...this.state, open: true });
//   };

//   handleClose = () => {
//     this.setState({ ...this.state, open: false });
//   };
//   handleClickOpenPayment = () => {
//     this.setState({ ...this.state, openPayment: true });
//   };

//   handleClosePayment = () => {
//     this.setState({ ...this.state, openPayment: false });
//   };
//   getColor = (cond) => {
//     console.log(cond)
//     if (cond == false) {
//       return "default"
//     } else {
//       return "red"
//     }
//   }
//   render() {
//     return (
//       <div
//         style={{ paddingTop: "2%", paddingBottom: "3%" }}
//       >
//         <TableDragSelect
//           value={this.state.cells}
//           onChange={cells => { this.setState({ ...this.state, cells: cells }) }}
//         >
//           <tr>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Advertisement location</td>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Ad for today day 1 </td>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Ad for tomorrow day 2</td>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Ad for day 3 </td>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Ad for day 4 </td>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Ad for day 5 </td>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Ad for day 6 </td>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Ad for day 7 </td>
//           </tr>
//           <tr>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Advertisement on subcategory page </td>
//             <td> Free </td>
//             <td> Free </td>
//             <td> $10 </td>
//             <td> $10 </td>
//             <td> $10 </td>
//             <td> $10 </td>
//             <td> $10 </td>
//           </tr>
//           <tr>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Advertisement on top 2 rows of subcategory page </td>
//             <td disabled={this.state.disabled[0][0]} style={{ backgroundColor: this.getColor(this.state.disabled[0][0]) }}> Free </td>
//             <td disabled={this.state.disabled[0][1]} style={{ backgroundColor: this.getColor(this.state.disabled[0][1]) }}> $10 </td>
//             <td disabled={this.state.disabled[0][2]} style={{ backgroundColor: this.getColor(this.state.disabled[0][2]) }}> $20 </td>
//             <td disabled={this.state.disabled[0][3]} style={{ backgroundColor: this.getColor(this.state.disabled[0][3]) }}> $20 </td>
//             <td disabled={this.state.disabled[0][4]} style={{ backgroundColor: this.getColor(this.state.disabled[0][4]) }}> $20 </td>
//             <td disabled={this.state.disabled[0][5]} style={{ backgroundColor: this.getColor(this.state.disabled[0][5]) }}> $20 </td>
//             <td disabled={this.state.disabled[0][6]} style={{ backgroundColor: this.getColor(this.state.disabled[0][6]) }}> $20 </td>
//           </tr>
//           <tr>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Advertisement on main category page </td>
//             <td> Free </td>
//             <td> Free </td>
//             <td> $15 </td>
//             <td> $15 </td>
//             <td> $15 </td>
//             <td> $15 </td>
//             <td> $15 </td>
//           </tr>
//           <tr>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Advertisement on top 2 rows of main category </td>
//             <td disabled={this.state.disabled[1][0]} style={{ backgroundColor: this.getColor(this.state.disabled[1][0]) }}> $10 </td>
//             <td disabled={this.state.disabled[1][1]} style={{ backgroundColor: this.getColor(this.state.disabled[1][1]) }}> $30 </td>
//             <td disabled={this.state.disabled[1][2]} style={{ backgroundColor: this.getColor(this.state.disabled[1][2]) }}> $50 </td>
//             <td disabled={this.state.disabled[1][3]} style={{ backgroundColor: this.getColor(this.state.disabled[1][3]) }}> $50  </td>
//             <td disabled={this.state.disabled[1][4]} style={{ backgroundColor: this.getColor(this.state.disabled[1][4]) }}> $50 </td>
//             <td disabled={this.state.disabled[1][5]} style={{ backgroundColor: this.getColor(this.state.disabled[1][5]) }}> $50 </td>
//             <td disabled={this.state.disabled[1][6]} style={{ backgroundColor: this.getColor(this.state.disabled[1][6]) }}> $50 </td>
//           </tr>
//           <tr>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Advertisement on Homepage </td>
//             <td> Free </td>
//             <td> $50 </td>
//             <td> $100 </td>
//             <td> $100 </td>
//             <td> $100 </td>
//             <td> $100 </td>
//             <td> $100 </td>
//           </tr>
//           <tr>
//             <td disabled style={{ backgroundColor: "skyblue" }}> Advertisement on top 2 rows of Homepage </td>
//             <td disabled={this.state.disabled[2][0]} style={{ backgroundColor: this.getColor(this.state.disabled[2][0]) }}> $20 </td>
//             <td disabled={this.state.disabled[2][1]} style={{ backgroundColor: this.getColor(this.state.disabled[2][1]) }}> $100 </td>
//             <td disabled={this.state.disabled[2][2]} style={{ backgroundColor: this.getColor(this.state.disabled[2][2]) }}> $200 </td>
//             <td disabled={this.state.disabled[2][3]} style={{ backgroundColor: this.getColor(this.state.disabled[2][3]) }}> $200 </td>
//             <td disabled={this.state.disabled[2][4]} style={{ backgroundColor: this.getColor(this.state.disabled[2][4]) }}> $200 </td>
//             <td disabled={this.state.disabled[2][5]} style={{ backgroundColor: this.getColor(this.state.disabled[2][5]) }}> $200 </td>
//             <td disabled={this.state.disabled[2][6]} style={{ backgroundColor: this.getColor(this.state.disabled[2][6]) }}> $200 </td>
//           </tr>
//         </TableDragSelect>

//         <Box
//           paddingLeft="3%">
//           <FormControlLabel
//             control=
//             {<Checkbox
//               checked={this.state.is_28_days}
//               onChange={this.handleTwentyEightDays}
//               inputProps={{ 'aria-label': 'controlled' }}
//             />}

//             label="Apply settings for the next month (28 days)" />
//         </Box>

//         {/*     
//      <FormControlLabel control={<Checkbox
//     checked={this.state.accpect_terms}
//     onChange={this.handleAcceptTrems}
//     inputProps={{ 'aria-label': 'controlled' }}
   
//     />}
//     label="Accept terms and requirements" 
//     /> */}


//         <Box textAlign='center'>
//           <br></br>
//           <Button
//             style={{
//               borderColor: "skyblue",
//               width: "300px",
//               backgroundColor: "darkblue",
//               color: "#fff",
//               height: "50px"
//             }}
//             variant="contained"
//             onClick={this.onNextClick}
//             size="large"
//           >
//             Submit
//           </Button>
//         </Box>
//         <Box textAlign='center'>
//           <Dialog open={this.state.openPayment} onClose={this.handleClosePayment} aria-labelledby="form-dialog-title" fullWidth={true}
//             maxWidth={'sm'}>
//             <DialogTitle id="form-dialog-title">Advertise With Us</DialogTitle>
//             <DialogContent container spacing={0} >
//               <Grid container spacing={0} >
//                 <Grid item lg={12}>
//                   <PayPalScriptProvider textAlign='center'>
//                     <PayPalButtons
//                       options={{
//                         "client-id": "paypal url should be here",
//                         components: "buttons",
//                         currency: "USD"
//                       }}
//                       style={style}
//                       disabled={false}
//                       forceReRender={[this.amount, currency, style]}
//                       fundingSource={undefined}
//                       createOrder={(data, actions) => {
//                         return actions.order
//                           .create({
//                             purchase_units: [
//                               {
//                                 amount: {
//                                   currency_code: currency,
//                                   value: amount,
//                                 },
//                               },
//                             ],
//                           })
//                           .then((orderId) => {
//                             // Your code here after create the order
//                             return orderId;
//                           });
//                       }}
//                       onApprove={function (data, actions) {
//                         return actions.order.capture().then(function () {
//                           console.log("It was approved!!")
//                         });
//                       }}
//                     />
//                   </PayPalScriptProvider>
//                 </Grid>
//               </Grid>
//             </DialogContent>
//           </Dialog>
//         </Box>
//         <div>
//           <Dialog
//             open={this.state.open}
//             onClose={this.handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//             fullWidth={true}
//             maxWidth={'sm'}
//           >
//             <DialogTitle id="alert-dialog-title">
//               {"Thank You!"}
//             </DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Thank you very much for advertising with us!
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button
//               // onClick={this.clickBackHome}
//               >
//                 <a href="/Homepage">
//                   Return to Home
//                 </a>
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>
//         <Snackbar open={this.state.snakOpen} autoHideDuration={6000} onClose={() => this.setState({ ...this.state, snakOpen: false })}>
//           <Alert onClose={() => this.setState({ ...this.state, snakOpen: false })} severity="error" sx={{ width: '100%' }}>
//             Please Upload a Valid Image / ADD Advertise Date!
//           </Alert>
//         </Snackbar>
//       </div>
//     )
//   }
// }
