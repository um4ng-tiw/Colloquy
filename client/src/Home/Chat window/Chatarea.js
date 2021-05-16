import React, { useState, useEffect, useRef } from "react";
import "./Chatarea.css";
import socket from "../../socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSmile,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Videocall from "./Videocall";

const Chatarea = (props) => {
  let selectedUser = props.selectedUser;
  let ref = { target: { value: " " } }; //Ref to input tag to disable default behavior

  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setEmojiPickerShowStatus] = useState(false);
  const [messageContentState, setMessageContent] = useState("");
  const [showVideoCall, setShowVideoCall] = useState(false);
  const getContent = (e) => {
    ref = e;
    console.log(ref);
    setMessageContent(ref.target.value);
  };

  const getEmoji = (e) => {
    console.log("Emoji event", e.native);
    setMessageContent((messageContentState) => messageContentState + e.native);
  };

  const messageEl = useRef(null);

  const toggleVideoCall = () => {
    setShowVideoCall(!showVideoCall);
  };

  useEffect(() => {
    const dbMsgArr = props.initialMsg;
    const arrSize = dbMsgArr.length;
    const myUserName = props.myDetails.result.email.split("@")[0];
    for (let i = 0; i < arrSize; i++) {
      if (dbMsgArr[i].toUser === myUserName) {
        dbMsgArr[i].fromSelf = false;
      }
    }
    setMessages(props.initialMsg);
  }, []);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages]);

  const emojiToggle = () => {
    setEmojiPickerShowStatus(!showEmojiPicker);
  };

  const onMessage = (e, content) => {
    if (showEmojiPicker) setEmojiPickerShowStatus(false);
    e.preventDefault();
    if (messageContentState === "") return;
    console.log("Message is", content);
    setMessageContent("");
    if (props.selectedUser) {
      socket.emit("private message", {
        content,
        to: props.selectedUser.userID,
      });
      //Newly added
      socket.emit("database-message", {
        toUser: props.selectedUser.username,
        content,
        fromSelf: true,
        fromUser: props.myDetails.result.email.split("@")[0],
      });
      setMessages((messages) => [
        ...messages,
        {
          toUser: props.selectedUser.username,
          content,
          fromSelf: true,
          fromUser: props.myDetails.result.email.split("@")[0],
        },
      ]);
    }
  };

  const showMessages = messages.map((message, index) => {
    if (
      message.fromSelf === true &&
      message.toUser === props.selectedUser.username
    )
      return (
        <div
          key={index}
          className={`${
            showVideoCall ? "message-ribbon-sent-small" : "message-ribbon-sent"
          }`}
        >
          {message.content}
        </div>
      );
    if (
      message.fromSelf === false &&
      message.fromUser === props.selectedUser.username
    )
      return (
        <div
          key={index}
          className={`${
            showVideoCall
              ? "message-ribbon-received-small"
              : "message-ribbon-received"
          }`}
        >
          {message.content}
        </div>
      );
  });

  socket.on("private message", ({ content, from }) => {
    console.log("Received message yey", content, "from", from);
    console.log("Chat area", props.connectedUsers);
    let newMessages = {};
    for (let i = 0; i < props.connectedUsers.length; i++) {
      const user = props.connectedUsers[i];
      console.log("Iteration:", i);
      console.log("Zero user", user[0]);
      if (user.userID === from) {
        console.log("Iteration:", i);
        newMessages = {
          fromUser: props.connectedUsers[i].username,
          content,
          fromSelf: false,
          toUser: props.myDetails.result.email.split("@")[0],
        };

        const messagesList = [...messages, newMessages];
        setMessages(messagesList);
        // console.log("I am printing the messages", messages);
      }
    }
  });

  const checkVideoCallStatus = (val) => {
    console.log("In call status");
    if (!val) {
      setShowVideoCall(false);
    }
  };

  return (
    <div className="chat-area-master">
      <div className="chat-header">
        <div className="chat-header-dp-container">
          <img src={selectedUser.dpUrl} alt="userdp"></img>
        </div>
        <div className="chat-header-user-container">{selectedUser.name}</div>
        <div className="video-cam-icon-container" onClick={toggleVideoCall}>
          <FontAwesomeIcon icon={faVideo} className="video-cam-icon" />
        </div>
      </div>

      <div className="message-area" ref={messageEl}>
        <div
          className={`${
            showVideoCall ? "temp-msg-container-small" : "temp-msg-container"
          }`}
        >
          {showMessages}
          {showEmojiPicker && (
            <span className="emoji-picker-span">
              <Picker onSelect={getEmoji} />
            </span>
          )}
        </div>
        <div className="video-call">
          {showVideoCall && (
            <Videocall
              currentUser={props.selectedUser}
              myInfo={props.myDetails}
              showCallStatus={checkVideoCallStatus}
              isVisible={showVideoCall}
            />
          )}
        </div>
      </div>

      <div className="send-message-area">
        <form onSubmit={(e) => onMessage(e, messageContentState)}>
          <input
            className="chat-text-area"
            placeholder="Enter message to send"
            onChange={(e) => getContent(e)}
            value={messageContentState}
          ></input>
          <span className="emoji-icon-container" onClick={emojiToggle}>
            <FontAwesomeIcon icon={faSmile} className="emoji-icon" />
          </span>

          <button type="submit" className="send-message-button">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="send-message-icon"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatarea;
