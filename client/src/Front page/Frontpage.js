import React, { useState, useEffect } from "react";
import "./Frontpage.css";
import logo from "./logo.png";
import google_icon from "./google_icon.png";
import Particles from "react-particles-js";
import Footer from "./Footer";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const Frontpage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const location = useLocation();

  const history = useHistory();
  const googleSuccess = async (res) => {
    const result = res?.profileObj; //?. used so that error is not thrown if res is unavailable
    const token = res?.tokenId;

    //Because async function
    try {
      dispatch({ type: "AUTH", data: { result, token } });

      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Google sign In was unsuccessful. Try again later");
    alert("LOGIN UNSUCCESSFUL. CHECK CREDENTIALS");
  };

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="NavBar">
      <div className="container">
        <img src={logo} alt="logo" className="Nav-logo"></img>
        <div className="main-logo-div">
          <img src={logo} alt="logo" className="main-logo"></img>
          <p className="main-text">
            An engineering solution to meeting friends, family or work, free and
            easy to use.
          </p>

          <GoogleLogin
            clientId="215964193049-dquscbtckk8qrt0jdr7hjeih434m96jt.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="button-1"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img src={google_icon} alt="" className="g-icon"></img>Sign in
                with Google
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <hr className="rule"></hr>
          <p className="learn-more">
            <span style={{ color: "#44D096" }}>Learn More</span> about Colloquy
          </p>
        </div>

        <div className="Particles">
          <Particles
            params={{
              particles: {
                number: {
                  value: 85,
                  density: {
                    enable: true,
                    value_area: 700,
                  },
                },
                color: {
                  value: "#ffffff",
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000",
                  },
                  polygon: {
                    nb_sides: 5,
                  },
                  image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100,
                  },
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 0.75,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 6,
                  direction: "none",
                  random: false,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: false,
                    mode: "grab",
                  },
                  onclick: {
                    enable: true,
                    mode: "push",
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 400,
                    line_linked: {
                      opacity: 1,
                    },
                  },
                  bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                  push: {
                    particles_nb: 4,
                  },
                  remove: {
                    particles_nb: 2,
                  },
                },
              },
              retina_detect: true,
            }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Frontpage;
