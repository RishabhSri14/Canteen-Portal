import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
//2
const ProfileUserAddMoney = (props) => {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [wallet, setWallet] = useState(0);

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
    const onChangewallet = (event) => {
        setWallet(event.target.value);
        details.wallet = parseInt( event.target.value);
    };
    const onSubmit = (event) => {
        axios
            .post("/backend/user/AddMoney", details)//
            .then((response) => {
                if (!response.data) {
                    alert("Unable to add Money");
                }
                else
                    alert("Money added to your account");
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);

            });
        setWallet(0);
    };
    return (
        <Grid container align="center" spacing={2}>
            <Grid item sx={12} md={12} lg={12}><Paper><h1><i><strong><u>Add Money</u></strong></i></h1></Paper><br></br></Grid>
            <Grid item xs={12}>
                <TextField
                    label="Amount"
                    variant="outlined"
                    value={wallet}
                    type={"number"}
                    onChange={onChangewallet}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Add
                </Button>
            </Grid>
        </Grid>
    );
};

export default ProfileUserAddMoney;
