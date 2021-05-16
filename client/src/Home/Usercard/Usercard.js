import React from "react";
import { useDispatch } from "react-redux";
import "./Usercard.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Usercard = (props) => {
  const imageUrl = props.user.result.imageUrl;
  const name = props.user.result.name;
  const userid = props.user.result.email.split("@")[0];

  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    window.location.reload();
  };
  return (
    <div className="user-card-container">
      <div className="image-div">
        <img src={imageUrl} alt="Profile pic" className="profile-pic"></img>
      </div>
      <div className="user-text">
        <p className="user-name">{name}</p>
        <p className="user-id">{userid}</p>
      </div>
      <button className="logout-button" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} className="logout-icon" />
      </button>
    </div>
  );
};

export default Usercard;
