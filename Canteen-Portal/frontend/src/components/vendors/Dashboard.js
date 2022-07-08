import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import Rating from '@mui/material/Rating';
//11

const ProfileVendorDash = (props) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    var em = localStorage.getItem("Vemail")
    var inp;
    if (em) {
      inp = {
        email: em,
      };
    }
    else {
      inp = null;
      navigate("/login")
    }
    axios
      .post("/backend/vendor/profile", inp)
      .then((response) => {
        if (!response.data) {
          alert("Unauthorised access");
          navigate("/login")
        }
        else
          setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/backend/vendor/orders")
      .then((response) => {
        if (!response.data) {
          alert("Unable to fetch data");
          navigate("/profileVendor");
        }
        else {
          setOrder(response.data);
        }
      })
      .catch(function (error) {
        alert(error);
      });


  })

  //to be tested
  const getFoodName = (id) => {
    axios.get('/backend/vendor/getFood/' + id)
      .then(response => {
        return (response.data.name)
      })
      .catch(err => {
        // alert("Unable to get food data");
        return ("Undefined")
      });
    window.location.reload();
  }

  const Proceed = (event) => {
    var str;
    switch ((event.target.value).status) {
      case "PLACED":
        var num=0;
        axios.post("/backend/vendor/getStatus","ACCEPTED")
        .then(response =>
        {
          if(response.data!=null)
            num = num+response.data.length
        })
        .catch(err=>{
          console.log(err);
        })
        axios.post("/backend/vendor/getStatus","COOKING")
        .then(response =>
        {
          if(response.data!=null)
            num = num+response.data.length
        })
        .catch(err=>{
          console.log(err);
        })
        
        str = "ACCEPTED";
        if(num<=10)
        {
        axios.post('/backend/vendor/updateStatus/' + event.target.value._id, str)
          .then(response => {
            alert("Updated Status");
          })
          .catch(err => {
            alert("Unable to update status due to wrong order id");

          });
        }
        else
        {
          alert("Food Acceptance Limit reached")
        }

        break;
      case "ACCEPTED":
        str = "COOKING"
        axios.post('/backend/vendor/updateStatus/' + event.target.value._id, str)
          .then(response => {
            alert("Updated Status");
          })
          .catch(err => {
            alert("Unable to update status due to wrong order id");

          });
        break;
      case "COOKING":
        str = " READY FOR PICKUP"
        axios.post('/backend/vendor/updateStatus/' + event.target.value._id, str)
          .then(response => {
            alert("Updated Status");
          })
          .catch(err => {
            alert("Unable to update status due to wrong order id");

          });
        break;
      case "READY FOR PICKUP":
        str = "COMPLETED"
        axios.post('/backend/vendor/updateStatus/' + event.target.value._id, str)
          .then(response => {
            alert("Updated Status");
          })
          .catch(err => {
            alert("Unable to update status due to wrong order id");

          });
        break;
      case "COMPLETED":
        alert("Order is completed. Unable to move forward!")
        return;
      case "REJECTED":

        alert("Order is rejected. Unable to move forward!")
        return;
      default:
        alert("Unkown Status");
        return;

    }
  };

  const Reject = (event) => {
    const str = "REJECTED"
    axios.post('/backend/vendor/updateStatus/' + event.target.value._id, str)
      .then(response => {
        alert("Updated Status");
      })
      .catch(err => {
        alert("Unable to update status due to wrong order id");

      });
  }
  const Remove = (event) => {
    orders.map((order,ind)=>{
      if(order.Vendor_id == details._id && order.status=="REJECTED")
      {
        axios.delete("/backend/vendor/deleteOrder"+order._id)
        .then((response) => {
          if (response.data!=null) {
            console.log("Deleted an item");
          }
          else
            console.log("Unable to delete an item")
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    })
    window.location.reload();
  }

  return (
    <Grid container align="center" spacing={2}>

      <Grid item sx={12} md={12} lg={12}><Paper><h1><i><strong><u>Dashboard</u></strong></i></h1></Paper><br></br></Grid>
      <Grid item xs={12} md={9} lg={9}>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                {/* <TableCell> Sr No.</TableCell> */}
                <TableCell>Order Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Plced-Time</TableCell>
                <TableCell>Add-On</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, ind) =>

                order.Vendor_id == details._id ?
                  (
                    <TableRow key={ind}>
                      <TableCell>{getFoodName(order.Food_id)}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>{order.addons.map((current_object, i) => {
                        return <li key={i}>{current_object.addon}, price:{current_object.Aprice}</li>
                      })}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Grid item xs={12}>
                          <Button variant="contained" onClick={Proceed} value={order}>MOVE TO NEXT STAGE</Button>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Grid item xs={12}>
                          <Button variant="contained" onClick={Reject} value={order} >Reject</Button>
                        </Grid>
                      </TableCell>
                    </TableRow>

                  ) : null
              )}

            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9} lg={9}>
      <Button variant="contained" onClick={Remove} >Remove the rejected orders</Button>
      </Grid>
    </Grid>
  );
};


export default ProfileVendorDash;
