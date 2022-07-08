import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//1
const NavbarUser = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [wallet, setWallet] = useState(0);

    useEffect(() => {
        var em = localStorage.getItem("Uemail");
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
            .post("/backend/user/profile", inp)
            .then((response) => {
                if (!response.data) {
                    alert("Unauthorised access");
                    navigate("/login")
                }
                else
                {
                  setDetails(response.data);
                  setWallet(response.data.wallet);
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
              var v =localStorage.getItem("vid");
              if(Vem)
              {
                localStorage.removeItem("vid");
              }
              navigate("/")}}
          >
            Logout
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/profileUser/dashboard")}>
            dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileUser/orders")}>
            My orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileUser/addMoney")}>
            Add Money
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileUser/edit")}>
            Edit Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileUser")}>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/profileUser/addMoney")}>
            Balance: {wallet}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarUser;
