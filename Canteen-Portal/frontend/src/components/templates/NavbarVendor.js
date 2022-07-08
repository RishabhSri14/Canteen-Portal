import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";


const NavbarVendor = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  // const [wallet, setWallet] = useState(0);

    useEffect(() => {
        var em = localStorage.getItem("Vemail");
        var v = localStorage.getItem("vid");
        var inp;
        if (em!=null && v!=null) {
            inp = {
                email: em,
                Vid: v
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
                {
                  setDetails(response.data);
                  // setWallet(response.data.wallet);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              var Uem =localStorage.getItem("Uemail");
              if(Uem)
              {
                localStorage.removeItem("Uemail");
              }
              var Vem =localStorage.getItem("Vemail");
              if(Vem)
              {
                localStorage.removeItem("Vemail");
              }
              navigate("/")
            }
          }
          >
            Logout
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/profileVendor/stats")}>
            Statistics
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileVendor/dashboard")}>
            dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileVendor/menu")}>
            Food Menu
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileVendor/edit")}>
            Edit Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileVendor")}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarVendor;
