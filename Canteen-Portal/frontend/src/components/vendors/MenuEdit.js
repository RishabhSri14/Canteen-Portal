import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//2
const ProfileVendorMenuAdd = (props) => {
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
            navigate("/login");
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
    const [Fname, setFname] = useState("");
    const [price, setPrice] = useState(0);
    const [Ftype, setFtype] = useState("");
    // const [Vid, setVid] = useState("");

    const [Addons, setAddons] = useState([]);
    const [Aname, setAname] = useState("");
    const [Aprice, setAprice] = useState(0);


    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState("");

    const onChangeFoodname = (event) => {
        setFname(event.target.value);
    };
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const onChangeFtype = (event) => {
        setFtype(event.target.value);
    };
    const onChangetagName = (event) => {
        setTagName(event.target.value);
    };
    const onChangeAddons = (event) => {
        setAname(event.target.value);
    };
    const onChangeAddonsPrice = (event) => {
        setAprice(event.target.value);
    };

    const resetInputs = () => {
        setFname("");
        setPrice(0);
        setFtype("");
        setAname("");
        setAprice(0);
        setTagName("");
    }
    const onAddaddon = (event) => {
        if (Fname === "" || parseInt(price) === 0 || Ftype === "" || Aname === "" || parseInt(Aprice) === 0) {
            alert("Fill above food-details before adding add-on");
            resetInputs();
        }
        else {
            const temp = {
                addon: Aname,
                Aprice: parseInt(Aprice)
            };
            Addons.push(temp);
            setAname("");
            setAprice(0);
        }

    };
    const onAddtag = (event) => {
        if (Fname === "" || parseInt(price) === 0 || Ftype === "" || tagName === "") {
            alert("Fill above food-details before adding add-on");
            resetInputs();
        }
        else {
            tags.push(tagName);
            setTagName("");
        }

    };

    const onAdd = (event) => {
        if (Aname !== "" && parseInt(Aprice) !== 0) {
            const temp = {
                addon: Aname,
                Aprice: parseInt(Aprice)
            };
            Addons.push(temp);
            setAname("");
            setAprice(0);
        }
        if (tagName !== "") {
            tags.push(tagName);
            setTagName("");
        }
        const Fid= localStorage.getItem("Fid");
        const newFood = {
            name: Fname,
            price: parseInt(price),
            foodtype: Ftype,
            addons: Addons,
            tags: tags,
            fid: Fid
        };
        axios
            .post("/backend/vendor/foodEdit", newFood)
            .then((response) => {
                if ((response.data) != null) {

                    alert("Change\t" + response.data.name);
                }
                else {
                    alert("Food data already present");

                }
                console.log(response.data);
            })
            .catch(function (error) {
                alert(error);
            });
        resetInputs();
        setAddons([]);
        setTags([]);
    };
    return (
        <Grid container align="center" spacing={2}>

            <Grid item sx={12} md={12} lg={12}><Paper><h1><i><strong><u>Edit Item</u></strong></i></h1></Paper><br></br></Grid>
            <Grid item xs={12}>
                <TextField
                    label="Food Name"
                    variant="outlined"
                    value={Fname}
                    onChange={onChangeFoodname}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Price"
                    variant="outlined"
                    type={"number"}
                    value={price}
                    onChange={onChangePrice}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl size="large" style={{ width: '50%' }}>
                    <InputLabel id="select-label" >Food-Type</InputLabel>
                    <Select
                        labelId="select"
                        id="select"
                        value={Ftype}
                        label="Food-Type"
                        onChange={onChangeFtype}
                        xs={12}
                    >
                        <MenuItem value={"Veg"}>Veg</MenuItem>
                        <MenuItem value={"NonVeg"}>Non-veg</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Add-on"
                    variant="outlined"
                    value={Aname}
                    onChange={onChangeAddons}
                />
                <TextField
                    label="Add-on Price"
                    variant="outlined"
                    type={"number"}
                    value={Aprice}
                    onChange={onChangeAddonsPrice}
                />
                <Button variant="contained" onClick={onAddaddon}>
                    Add add-on for {Fname}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Tag Name"
                    variant="outlined"
                    value={tagName}
                    onChange={onChangetagName}
                />
                <Button variant="contained" onClick={onAddtag}>
                    Add tag for {Fname}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onAdd}>
                    Edit
                </Button>
            </Grid>

        </Grid>
    );
};


export default ProfileVendorMenuAdd;
