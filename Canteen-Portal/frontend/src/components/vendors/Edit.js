import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
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
const ProfileVendorEdit = (props) => {
 
  
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);

  const [Mname, setMname] = useState("");
  const [Sname, setSname] = useState("");
  const [Vemail, setVEmail] = useState("");
  const [VNumber, setVNumber] = useState("");
  const [OHours, setOHour] = useState("");
  const [CHours, setCHour] = useState("");
  const [OMinute, setOMinute] = useState("");
  const [CMinute, setCMinute] = useState("");
  const [Vpass, setVpass] = useState("");



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


  const onChangeManagername = (event) => {
    setMname(event.target.value);
  };

  const onChangeShopname = (event) => {
    setSname(event.target.value);
  };
  const onChangeVEmail = (event) => {
    setVEmail(event.target.value);
  };
  const onChangeVPass = (event) => {
    setVpass(event.target.value);
  };
  const onChangeVNumber = (event) => {
    setVNumber(event.target.value);
  };
  const onChangeOHour = (event) => {
    setOHour(event.target.value);
  };
  const onChangeCHour = (event) => {
    setCHour(event.target.value);
  };
  const onChangeOMinute = (event) => {
    setOMinute(event.target.value);
  };
  const onChangeCMinute = (event) => {
    setCMinute(event.target.value);
  };
  const handleClickShowVPassword = () => {
    setVpass({
      ...Vpass,
      showPassword: !Vpass.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetInputs = () => {
    setMname("");
    setVEmail("");
    setVNumber("");
    setOHour("");
    setCHour("");
    setOMinute("");
    setCMinute("");
    setVpass("");
    setSname("");
  };


  const onSubmit = (event) => {

    event.preventDefault();
    var ct = (CHours.concat("/")).concat(CMinute);
    var ot = (OHours.concat("/")).concat(OMinute);
    const newVendor = {
      Mname: Mname,
      shop: Sname,
      phone: VNumber,
      otime: ot,
      ctime: ct,
      email: Vemail,
      pemail: details.email,
      pass: Vpass,
      date: details.date,
    };

    axios
      .post("/backend/vendor/edit", newVendor)
      .then((response) => {
        if ((response.data) != null) {

          alert("Changed your informations\t" + response.data.Mname);
        }
        else {
          alert("Failed to perform changes");

        }
        console.log(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
    resetInputs();
  }

  return(
    <Grid container align="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Manager's Name"
              variant="outlined"
              value={Mname}
              onChange={onChangeManagername}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl size="large" style={{ width: '15%', align: 'center' }}>
              <InputLabel id="select-Shop" >Shop Name</InputLabel>
              <Select
                labelId="select-Shop"
                id="Shop-simple-select"
                value={Sname}
                label="Shop Name"
                onChange={onChangeShopname}
                xs={12}
              >
                <MenuItem value={"JC"}>JC</MenuItem>
                <MenuItem value={"VC"}>VC</MenuItem>
                <MenuItem value={"BBC"}>BBC</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Phone-Number"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">(+91)</InputAdornment>,
              }}
              value={VNumber}
              onChange={onChangeVNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>Opening Time</Box>
            <TextField
              variant="standard"
              id="Time-Hours"
              label="Hours"
              type={"number"}
              value={OHours}
              onChange={onChangeOHour}
            />
            <FormControl size="large" style={{ width: '5%', align: 'center' }}>_________</FormControl>
            <TextField id="Time-Minutes" variant="standard" label="Minutes" type={"number"} value={OMinute} onChange={onChangeOMinute} />
          </Grid>
          <Grid item xs={12}>
            <Box>Closing Time</Box>
            <TextField
              id="Time-Hour"
              label="Hours"
              variant="standard"
              type={"number"}
              value={CHours}
              onChange={onChangeCHour}
            />
            <FormControl size="large" style={{ width: '5%', align: 'center' }}>_________</FormControl>
            <TextField id="Time-Minute" variant="standard" label="Minutes" type={"number"} value={CMinute} onChange={onChangeCMinute} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Vendor's Email"
              variant="outlined"
              value={Vemail}
              onChange={onChangeVEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password"> Create-Password</InputLabel>
              <OutlinedInput
                id="Vendorpassword"
                type={Vpass.showPassword ? 'text' : 'password'}
                value={Vpass.password}
                onChange={onChangeVPass}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowVPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {Vpass.showPassword ? <VisibilityOff /> : <Visibility />}
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

export default ProfileVendorEdit;
