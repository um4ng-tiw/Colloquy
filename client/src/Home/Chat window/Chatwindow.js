import React, { useState, useEffect } from "react";
import "./Chatwindow.css";
import Usercard from "../Usercard/Usercard";
import SidePanel from "../Side Panel/SidePanel";
import Searchbar from "./Searchbar";
import ChatList from "../Side Panel/ChatList";
import Chatarea from "./Chatarea";
import socket from "../../socket";

const Chatwindow = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserState, setStatus] = useState(false);
  const [connectedUsersList, updateUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchUser, insertUser] = useState("");
  const user_info = user;

  let usersList = [];
  const getSelectedUser = (e) => {
    let selectedUserDetails = e;
    console.log("This is Chatwindow", selectedUserDetails);
    setSelectedUser(selectedUserDetails);
    setStatus(true);
  };

  useEffect(() => {
    socket.on("db-messages-output", (result) => {
      console.log(result);
      setMessages(result);
    });
  }, []);

  const getUserList = (e) => {
    updateUserList(e);
    // usersList = [...usersList, e];
    console.log("UserList in Chatwindow", connectedUsersList);
  };

  const getSearchVal = (searchContent) => {
    let flag = 0;
    for (let i = 0; i < connectedUsersList.length; i++) {
      if (searchContent === connectedUsersList[i].username) {
        insertUser(searchContent);
        flag = 1;
      }
    }
    if (!flag) alert("User not found");
  };
  return (
    <div className="container-chat">
      <div className="wrapper1">
        <Usercard user={user_info} />
        <Searchbar giveSearchVal={(e) => getSearchVal(e)} />
        <SidePanel
          user={user_info}
          getUser={(e) => getSelectedUser(e)}
          sendUserList={(e) => getUserList(e)}
          newChat={searchUser}
        />
      </div>
      <div className="wrapper2">
        {selectedUserState ? (
          <Chatarea
            selectedUser={selectedUser}
            connectedUsers={connectedUsersList}
            myDetails={user_info}
            initialMsg={messages}
          />
        ) : (
          <div className="no-render-message">Click chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default Chatwindow;
