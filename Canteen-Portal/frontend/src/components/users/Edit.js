import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
//2
const ProfileUserEdit = (props) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  

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
      .post("/backend/user/profile", inp)//
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Bpass, setBpass] = useState("");
  const [Number, setNumber] = useState("");
  const [Age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [batch, setBatch] = useState("");
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };


  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeBpass = (event) => {
    setBpass(event.target.value);
  };

  const handleClickShowBPassword = () => {
    setBpass({
      ...Bpass,
      showPassword: !Bpass.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetInputs = () => {
    
    setName("");
    setEmail("");
    setBpass("");
    setNumber("");
    setAge("");
    setBatch("")
  };
  const onSubmit = (event) => {

    event.preventDefault();
    const newUser = {
      name: name,
      age: Age,
      batch: batch,
      phone: Number,
      email: email,
      pemail: details.email,
      pass: Bpass,
      date: details.date,
    };
    axios
      .post("http://localhost:4000/user/edit", newUser)//
      .then((response) => {
        if ((response.data) != null) {

          alert("Changed your informations,\t" + newUser.name);
        }
        else {
          alert("Failed to perform change");

        }
        console.log(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
    resetInputs();
  }
  return (
    <Grid container align="center" spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Phone-Number"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">(+91)</InputAdornment>,
          }}
          value={Number}
          onChange={onChangeNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          type={"number"}
          value={Age}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl size="large" style={{ width: '15%', align: 'center' }}>
          <InputLabel id="select-Batch" >Batch</InputLabel>
          <Select
            labelId="select-Batch"
            id="Batch-simple-select"
            value={batch}
            label="Batch"
            onChange={onChangeBatch}
            xs={12}
          >
            <MenuItem value={"UG1"}>UG1</MenuItem>
            <MenuItem value={"UG2"}>UG2</MenuItem>
            <MenuItem value={"UG3"}>UG3</MenuItem>
            <MenuItem value={"UG4"}>UG4</MenuItem>
            <MenuItem value={"UG5"}>UG5</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>

      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password"> Create-Password</InputLabel>
          <OutlinedInput
            id="Vendorpassword"
            type={Bpass.showPassword ? 'text' : 'password'}
            value={Bpass.password}
            onChange={onChangeBpass}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowBPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {Bpass.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Change
        </Button>
      </Grid>

    </Grid>
  );

};

export default ProfileUserEdit;
