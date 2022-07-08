import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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
const Login = (props) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [Bpass, setBpass] = useState("");
  const [Vemail, setVEmail] = useState("");
  const [Vpass, setVpass] = useState("");

  const navigate = useNavigate();

  const onChangeUser = (event) => {
    setUser(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeBpass = (event) => {
    setBpass(event.target.value);
  };
  const onChangeVEmail = (event) => {
    setVEmail(event.target.value);
  };
  const onChangeVPass = (event) => {
    setVpass(event.target.value);
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
    setBpass("");
    setEmail("");
    setVEmail("");
    setVpass("");
  };

  const onSubmit = (event) => {

    event.preventDefault();
    if (user === "Buyer") {
      const newUser = {
        email: email,
        pass: Bpass,
      };

      axios
        .post("/backend/user/login", newUser)
        .then((response) => {
          if ((response.data) != null) {
            var em = localStorage.getItem("Uemail");
            if (em) {
              localStorage.removeItem("Uemail");
            }
            localStorage.setItem("Uemail", email);
            
            navigate("/profileUser");
          }
          else {
            alert("Wrong email or password ");

          }
          console.log(response.data);
        })
        .catch(function (error) {
          alert(error);
        });
    }
    else if (user === "Vendor") {
      const newVendor = {
        email: Vemail,
        pass: Vpass,
      };

      axios
        .post("/backend/vendor/login", newVendor)
        .then((response) => {
          if ((response.data) != null) {
            var em = localStorage.getItem("Vemail");
            if (em) {
              localStorage.removeItem("Vemail");
            }
            localStorage.setItem("Vemail", Vemail);
            var v = localStorage.getItem("vid");
            if (v) {
              localStorage.removeItem("vid");
            }
            // console.log(response.data._id);
            localStorage.setItem("vid", response.data._id);
            
            navigate("/profileVendor");
          }
          else {
            alert("Wrong email or password ");

          }
          // console.log(response.data);
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
              label="Vendor's Email"
              variant="outlined"
              value={Vemail}
              onChange={onChangeVEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password"> Password</InputLabel>
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
              Login
            </Button>
          </Grid>
        </Grid>

      }

      {
        user === "Buyer" &&
        <Grid container align="center" spacing={2}>
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
              <InputLabel htmlFor="outlined-adornment-password"> Password</InputLabel>
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
              Login
            </Button>
          </Grid>

        </Grid>
      }
    </Grid>);

};

export default Login;
