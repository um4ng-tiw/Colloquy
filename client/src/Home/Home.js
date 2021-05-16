import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Chatwindow from "./Chat window/Chatwindow";
import Snow from "./Snow/Snow";
import "./Home.css";

import socket from "../socket";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [userName, setUserName] = useState("");

  console.log("This is in home component", user);

  useEffect(() => {
    const userName = user.result.email.split("@")[0];
    const name = user.result.givenName + " " + user.result.familyName;
    const imgUrl = user.result.imageUrl;
    setUserName(userName);
    socket.auth = { userName, name, imgUrl };
    socket.connect();
    socket.emit("new-user-sending", { userName, name, imgUrl });
  }, []);

  return (
    <div className="Home">
      <Snow />
      <Chatwindow />
    </div>
  );
};

export default Home;
