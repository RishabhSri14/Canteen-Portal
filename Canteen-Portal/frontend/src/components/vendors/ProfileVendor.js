import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
//1
const ProfileVendor = (props) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    var em = localStorage.getItem("Vemail");
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
  }, []);
  return (
    <Grid container align="center" spacing={2}>
      <Grid item sx={12} md={12} lg={12}><Paper><h1><i><strong><u>Vendor Profile</u></strong></i></h1></Paper><br></br></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={7} sx={6} md={6} lg={6}>Name:-  {details.Mname}</Paper></strong></i></h1></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={6} sx={6} md={6} lg={6}>Shop:-  {details.shop}</Paper></strong></i></h1></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={5} sx={6} md={6} lg={6}>Phone number:-  {details.phone}</Paper></strong></i></h1></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={4} sx={6} md={6} lg={6}>Opening time:-  {details.otime}</Paper></strong></i></h1></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={3} sx={6} md={6} lg={6}>Closing time:-  {details.ctime}</Paper></strong></i></h1></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={2} sx={6} md={6} lg={6}>Email:-  {details.email}</Paper></strong></i></h1></Grid>
      <Grid item sx={12} md={12} lg={12}><h1><i><strong><Paper elevation={1} sx={6} md={6} lg={6}>Date of registration:-  {details.date}</Paper></strong></i></h1></Grid>
    </Grid>

  );
};

export default ProfileVendor;
