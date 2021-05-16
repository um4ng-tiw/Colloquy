import React, { useState, useEffect } from "react";
import socket from "../../socket";
import Usercard from "../Usercard/Usercard";
import ChatList from "./ChatList";
import "./SidePanel.css";

const SidePanel = (props) => {
  const [usersList, addUsers] = useState([]);
  const [contactList, addUserChat] = useState([]);

  useEffect(() => {
    socket.on("fetch-contact", (contacts) => {
      console.log("FETCH - CONTACT EVENT", contacts);
      for (let i = 0; i < contacts.length; i++) {
        addUserChat([...contactList, contacts[i].contact]);
      }
    });
  }, []);

  useEffect(() => {
    console.log("FETCH - CONTACT EVENT USERLIST", usersList);
    let copyContactList = [...contactList];
    console.log("COPY CONTACT", copyContactList);

    for (let i = 0; i < copyContactList.length; i++) {
      for (let j = 0; j < usersList.length; j++) {
        if (copyContactList[i].username === usersList[j].username) {
          copyContactList[i].userID = usersList[j].userID;
        }
      }
    }
    addUserChat(copyContactList);
    props.sendUserList(usersList);
  }, [usersList]);

  useEffect(() => {
    let flag = 0;
    for (let i = 0; i < usersList.length; i++) {
      if (props.newChat === usersList[i].username) {
        addUserChat([...contactList, usersList[i]]);
        socket.emit("contact-list-db", {
          user: props.user.result.email.split("@")[0],
          contact: usersList[i],
        });
      }
    }
  }, [props.newChat]);

  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
    });
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    addUsers(users);
  });

  socket.on("user connected", (user) => {
    let flag = 0;
    if (user) {
      const userListSize = usersList.length;
      for (let i = 0; i < userListSize; i++) {
        if (usersList[i].username === user.username) {
          flag = 1;
          usersList[i].userID = user.userID;
        }
      }
      if (!flag) {
        addUsers([...usersList, user]);
      }
    }
  });

  const getSelectedUser = (e) => {
    console.log("This is sidepanel", e);
    props.getUser(e);
  };
  return (
    <div className="Side-panel">
      <ChatList user_info={contactList} sendUser={(e) => getSelectedUser(e)} />
    </div>
  );
};

export default SidePanel;
