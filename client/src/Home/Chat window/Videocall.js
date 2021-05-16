import React, { useState, useEffect, useRef } from "react";
import socket from "../../socket";
import Peer from "simple-peer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Videocall.css";
import {
  faPhone,
  faPhoneSlash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Videocall = (props) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState(
    props.myInfo.result.givenName +
      " " +
      props.myInfo.result.familyName +
      "(" +
      props.myInfo.result.email.split("@")[0] +
      ")"
  );

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    //Webcam streaming enabled here
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
    setIdToCall(props.currentUser.userID);
    setMe(socket.id);

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, [props.showVideoCall]);

  const callUser = (id) => {
    console.log("Call user activated");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit("callEnded", { to: caller });
    setCallEnded(true);
    connectionRef.current.destroy();
    if (stream != null) {
      stream.getTracks().map(function (val) {
        val.stop();
      });
    }
    props.showCallStatus(callEnded);
    return;
  };

  socket.on("callEnded", () => {
    console.log("Call ended with user");
    setCallEnded(true);
    connectionRef.current.destroy();
    if (stream != null) {
      stream.getTracks().map(function (val) {
        val.stop();
      });
    }
    props.showCallStatus(callEnded);
  });

  const closeVideoCallComponent = () => {
    if (connectionRef.current) {
      leaveCall();
    } else {
      if (stream != null) {
        stream.getTracks().map(function (val) {
          val.stop();
        });
      }
      props.showCallStatus(callEnded);
    }
  };

  return (
    <div className="video-call-container">
      <div className="cross-button-container">
        <FontAwesomeIcon
          icon={faTimes}
          className="cross-button"
          onClick={closeVideoCallComponent}
        ></FontAwesomeIcon>
      </div>
      <div className="my-video-container">
        <div className="user-video">
          {callAccepted && !callEnded ? (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: "500px" }}
            />
          ) : (
            <div className="waiting-user-feed">Waiting for user feed</div>
          )}
        </div>

        <div className="my-video">
          {stream && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: "200px" }}
            />
          )}
        </div>
      </div>

      <div className="Button-container-1">
        {callAccepted && !callEnded ? (
          <div onClick={leaveCall} className="end-call-button">
            <FontAwesomeIcon
              icon={faPhoneSlash}
              className="end-call-icon"
            ></FontAwesomeIcon>
          </div>
        ) : (
          <div onClick={() => callUser(idToCall)} className="make-call-button">
            <FontAwesomeIcon
              icon={faPhone}
              className="make-call-icon"
            ></FontAwesomeIcon>
          </div>
        )}
      </div>

      <div className="see-this">
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>{name} is calling...</h1>
            <button onClick={answerCall} className="answer-call-button">
              {" "}
              Answer Call{" "}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Videocall;
