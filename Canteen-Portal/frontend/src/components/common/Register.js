import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
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
const Register = (props) => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Bpass, setBpass] = useState("");
  const [Number, setNumber] = useState("");
  const [Age, setAge] = useState("");
  const [date, setDate] = useState(null);
  const [batch, setBatch] = useState("");



  const [Mname, setMname] = useState("");
  const [Sname, setSname] = useState("");
  const [Vemail, setVEmail] = useState("");
  const [VNumber, setVNumber] = useState("");
  const [OHours, setOHour] = useState("");
  const [CHours, setCHour] = useState("");
  const [OMinute, setOMinute] = useState("");
  const [CMinute, setCMinute] = useState("");
  const [Vpass, setVpass] = useState("");


  const onChangeUser = (event) => {
    setUser(event.target.value);
  };

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
    setUser("");
    setName("");
    setEmail("");
    setBpass("");
    setNumber("");
    setAge("");
    setBatch("")
    setDate(null);
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
    if (user === "Buyer") {
      const newUser = {
        name: name,
        age: Age,
        batch: batch,
        phone: Number,
        email: email,
        pass: Bpass,
        date: Date.now(),
      };
      console.log(newUser);
      axios
        .post("/backend/user/register", newUser)
        .then((response) => {
          if((response.data)!=null)
          {
            
            alert("Created\t" + response.data.name);
          }
          else
          {
            alert("Email already present");
            
          }
          // console.log(response.data);
        })
        .catch(function (error) {
          alert(error);
        });
      }
      else if(user === "Vendor"){
        var ct = (CHours.concat("/")).concat(CMinute);
        var ot= (OHours.concat("/")).concat(OMinute);
        const newVendor = {
          Mname: Mname,
          shop: Sname,
          phone: VNumber,
          otime: ot,
          ctime: ct,
          email: Vemail,
          pass: Vpass,
          date: Date.now(),
        };

        axios
          .post("/backend/vendor/register", newVendor)
          .then((response) => {
            if((response.data)!=null)
            {
              
              alert("Created\t" + response.data.Mname);
            }
            else
            {
              alert("Email already present");
              
            }
            console.log(response.data);
          })
          .catch(function (error) {
            alert(error);
          });
      }
    resetInputs();
  };
  return (
    <Grid container align="center" spacing={2}>
      <Grid item xs={12}>
        <FormControl size="large" style={{ width: '50%' }}>
          <InputLabel id="select-label" >User-Type</InputLabel>
          <Select
            labelId="select"
            id="select"
            value={user}
            label="User"
            onChange={onChangeUser}
            xs={12}
          >
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {user === "Vendor" &&
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
              Register
            </Button>
          </Grid>
        </Grid>

      }

      {
        user === "Buyer" &&
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
              Register
            </Button>
          </Grid>

        </Grid>
      }
    </Grid>);

};

export default Register;
