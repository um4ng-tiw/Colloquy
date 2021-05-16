import React, { useState } from "react";
import "./Searchbar.css";
const Searchbar = (props) => {
  const [messageContentState, setMessageContent] = useState("");

  const getContent = (e) => {
    setMessageContent(e.target.value);
  };

  const sendSearch = (e, messageContentState) => {
    e.preventDefault();
    props.giveSearchVal(messageContentState);
    setMessageContent("");
  };
  return (
    <div className="search-user-bar-container">
      <form onSubmit={(e) => sendSearch(e, messageContentState)}>
        <input
          type="text"
          className="search-bar"
          placeholder="Enter username to chat"
          onChange={(e) => getContent(e)}
          value={messageContentState}
        ></input>
      </form>
    </div>
  );
};

export default Searchbar;
