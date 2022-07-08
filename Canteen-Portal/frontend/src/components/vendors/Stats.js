import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
//8
const ProfileVendorStats = (props) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [orders, setOrder] = useState([]);
  const [Plorders, setPlOrder] = useState(0);
  const [Peorders, setPeOrder] = useState(0);
  const [Corders, setCOrder] = useState(0);
  var pending = 0;


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
    const inp1 = {
      id: details.id,
      str: "PLACED"
    }
    axios
      .post("/backend/vendor/getStatus", inp1.str)
      .then((response) => {
        if (response.data != null)
          setPlOrder(response.data.length)
      })
      .catch(function (error) {
        console.log("error");
      });
    inp1.str = "COMPLETED"
    axios
      .post("/backend/vendor/getStatus", inp1.str)
      .then((response) => {
        if (response.data != null)
          setCOrder(response.data.length)
      })
      .catch(function (error) {
        console.log("error");
      });
    pending = 0;
    inp1.str = "PLACED"
    axios
      .post("/backend/vendor/getStatus", inp1.str)
      .then((response) => {
        if (response.data != null)
          pending = pending + response.data.length
      })
      .catch(function (error) {
        console.log("error");
      });
    inp1.str = "COOKING"
    axios
      .post("/backend/vendor/getStatus", inp1.str)
      .then((response) => {
        if (response.data != null)
          pending = pending + response.data.length
      })
      .catch(function (error) {
        console.log("error");
      });
    inp1.str = "READY FOR PICKUP"
    axios
      .post("/backend/vendor/getStatus", inp1.str)
      .then((response) => {
        if (response.data != null)
          pending = pending + response.data.length
      })
      .catch(function (error) {
        console.log("error");
      });
    setPeOrder(pending)
  })



  var C = new Map();

  orders.map(order => {
    C.set(getFoodName(order._id), 0);
  })

  orders.map(order => {
    C.set(getFoodName(order._id), C.get(getFoodName(order._id)) + order.quantity);
  })

  // The following function sorts the data in reverse
  const Sort = new Map([...C.entries()].sort((a, b) => b[1] - a[1]));

  let An = [];
  for (const itemname of Sort.keys()) {
    An.push(itemname);
  }

  let Tn = []
  for (var i = 0; i < 5 && i < An.length; i++) {
    Tn.push(An[i]);
  }

  return (
    <Grid container align="center" spacing={2}>

      <Grid item sx={12} md={12} lg={12}><Paper><h1><i><strong><u>Statistics</u></strong></i></h1></Paper><br></br></Grid>
      <Grid item sx={12} md={12} lg={12}><Paper><h1><i><strong>Top Five Orders:</strong></i></h1></Paper><br></br></Grid>
      <Grid item>
        {Tn.map(name => <li>{name}</li>)}
      </Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={7} sx={6} md={6} lg={6}>Placed Orders:-  {Plorders}</Paper></strong></i></h1></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={6} sx={6} md={6} lg={6}>Pending Orders:-  {Peorders}</Paper></strong></i></h1></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={5} sx={6} md={6} lg={6}>Completed Orders:-  {Corders}</Paper></strong></i></h1></Grid>

    </Grid>

  )
};

export default ProfileVendorStats;
