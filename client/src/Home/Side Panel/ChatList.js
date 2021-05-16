import React, { useState } from "react";
import "./ChatList.css";

const ChatList = (props) => {
  let listOfChat = props.user_info;

  let selectedUser = "";

  const getSelectedUser = (e) => {
    selectedUser = e.target.innerText;
    console.log(selectedUser);
    let selectedUserDetails = listOfChat.find(
      (user) => user.username === selectedUser
    );

    console.log("Selected user in ChatList component:", selectedUserDetails);

    props.sendUser(selectedUserDetails);
  };

  let users = listOfChat.map((user) => {
    return (
      <div className="chat-list-element" key={user.key}>
        <div onClick={getSelectedUser} className="user-element">
          {user.username}
        </div>
        <div style={{ fontSize: "10px" }}>{user.name}</div>
      </div>
    );
  });
  return <div className="chat-list-element-container">{users}</div>;
};

export default ChatList;
