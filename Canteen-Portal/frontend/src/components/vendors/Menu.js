import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import Rating from '@mui/material/Rating';
//3

const ProfileVendorMenu = (props) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [foods, setFood] = useState([]);
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

    axios
      .get("/backend/vendor/food")
      .then((response) => {
        if (!response.data) {
          alert("Unable to fetch data");
          navigate("/profileVendor");
        }
        else {
          setFood(response.data);
        }
      })
      // .catch(function (error) {
      //   alert(error);
      // });
  });


  const onAdd = (event) => {
    console.log(foods);
    console.log(details);
    navigate("/profileVendor/menuAdd");
  };

  const EditFood = (event) => {
    var em = localStorage.getItem("Fid");
    if (em) {
      localStorage.removeItem("Fid");
    }
    localStorage.setItem("Fid", event.target.value);
    navigate("/profileVendor/menuEdit");
  };

  const DeleteFood = (event) => {
    axios.delete('/backend/vendor/deleteFood/'+event.target.value)
    .then(response => { 
      console.log(response.data);
    });
    window.location.reload();
  };
  return (
    <Grid container align="center" spacing={2}>

      <Grid item sx={12} md={12} lg={12}><Paper><h1><i><strong><u>Menu</u></strong></i></h1></Paper><br></br></Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onAdd}>
          Add
        </Button>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Add-On</TableCell>
                  <TableCell>Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foods.map((food, ind) =>

                  food.Vendor_id == details._id ?
                    (
                      <TableRow key={ind}>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.foodtype}</TableCell>
                        <TableCell>{food.price}</TableCell>
                        <TableCell><Rating name="Food rating" value={food.rating} readOnly /></TableCell>
                        <TableCell>{food.addons.map((current_object, i) => {
                          return <li key={i}>{current_object.addon}, price:{current_object.Aprice}</li>
                        })}</TableCell>
                        <TableCell>{food.tags.map((current_tag, i) => {
                          return <li key={i}>{current_tag}</li>
                        })}</TableCell>
                        <TableCell>
                          <Grid item xs={12}>
                            <Button variant="contained" onClick={EditFood} value={food._id}>Edit</Button>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid item xs={12}>
                            <Button variant="contained" onClick={DeleteFood} value={food._id} >Delete</Button>
                          </Grid>
                        </TableCell>
                      </TableRow>

                    ) : null
                )}

              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>


    </Grid>
  );
};

export default ProfileVendorMenu;
