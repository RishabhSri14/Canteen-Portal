import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Rating from '@mui/material/Rating';
//8
const ProfileUserOrders = (props) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [orders, setOrder] = useState([]);
  const [rat, setRat] = useState(0);
  useEffect(() => {
    var em = localStorage.getItem("Uemail");
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
      .post("/backend/user/profile", inp)
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
  });
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
  const getFoodRat = (id) => {
    axios.get('/backend/vendor/getFood/' + id)
      .then(response => {
        return (response.data.rating)
      })
      .catch(err => {
        // alert("Unable to get food data");
        return (0)
      });
    window.location.reload();
  }

  const setFoodRat = (event, id) => {
    axios.post('/backend/vendor/setFoodRat/' + id)
      .then(response => {
        console.log(response.data.name)
      })
      .catch(err => {
        // alert("Unable to get food data");
        return ("Undefined")
      });
    window.location.reload();
  }


  const getVendorName = (id) => {
    axios.get('/backend/vendor/getVname' + id)
      .then(response => {
        return (response.data.Mname)
      })
      .catch(err => {
        // alert("Unable to get food data");
        return ("Undefined")
      });
    window.location.reload();
  }

  const Proceed = (event) => {
    axios.post('/backend/vendor/updateStatus' + event.target.value, "COMPLETED")
      .then(response => {
        console.log(response.data.Mname)
      })
      .catch(err => {
        // alert("Unable to get food data");
        console.log(err)
      });
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
                <TableCell>Vendor Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Plced-Time</TableCell>
                <TableCell>Add-On</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, ind) =>

                order.User_id == details._id ?
                  (
                    <TableRow key={ind}>
                      <TableCell>{getFoodName(order.Food_id)}</TableCell>
                      <TableCell>{getVendorName(order.Vendor_id)}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>{order.addons.map((current_object, i) => {
                        return <li key={i}>{current_object.addon}, price:{current_object.Aprice}</li>
                      })}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        {order.status == "READY FOR PICKUP" &&
                          <Grid item xs={12}>
                            <Button variant="contained" onClick={Proceed} value={order._id}>MOVE TO NEXT STAGE</Button>
                          </Grid>
                        }
                        {order.status == "COMPLETED" &&
                          <Grid container align="center">
                            <Paper>Ratings</Paper>

                            <Grid item xs={12}>

                              <Rating
                                name="rating"
                                value={getFoodRat(order.Food_id)}
                                onChange={(event, newValue) => {
                                  setRat(newValue);
                                  axios.post('/backend/vendor/setFoodRat/' + order.Food_id, newValue)
                                    .then(response => {
                                      console.log(response.data.name)
                                    })
                                    .catch(err => {
                                      // alert("Unable to get food data");
                                        console.log(err);
                                    });
                                  window.location.reload();
                                }}
                              />
                            </Grid>
                          </Grid>
                        }
                      </TableCell>
                    </TableRow>

                  ) : null
              )}

            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileUserOrders;
