import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//1
const ProfileUserDash = (props) => {
  const navigate =useNavigate();
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
  return <div>User Profile dashboard</div>;
};

export default ProfileUserDash;
