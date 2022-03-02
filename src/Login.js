import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from 'use-sound';
import main_menu from "./Sounds/main_menu.mp3"


function Login() {
  const [profileExists, setProfileExists] = useState(true);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const [triggerMenuSound] = useSound(main_menu)

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if(token){
  //     fetch(`https://sigma-shipyards-backend.herokuapp.com/auto_login`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(data)
  //     })
  //   }
  // }, [])

  function login(e) {
    e.preventDefault();

    const loginData = {
      user: { username: username, password: password },
    };

    fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem("token", data.jwt)
        navigate("/main_menu")
      })
    setUsername("");
    setPassword("");
  }

  function createProfile(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password: password}),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      localStorage.setItem("token", data.include[0].jwt)
      navigate("/main_menu")
    });
    setUsername("")
    setPassword("")
  }
  
  function hideLogin(e) {
    e.preventDefault();
    setProfileExists(false);
  }

  function showLogin(e) {
    e.preventDefault();
    setProfileExists(true);
  }

  return (
    <div id="login_background">
      {profileExists ? (
        <div className="all_login_containers">
          <form id="login" onSubmit={(e) => {
            triggerMenuSound()
            login(e)
          }
            }>
            <div className="username_password">
              Username:{" "}
              <input
                className="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              Password:{" "}
              <input
                className="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="login_create">
              <button className="login_submit" type="submit">
                <span>Login</span>
              </button>
              <button
                id="need_account"
                onClick={hideLogin}
              ><span>
                New registration
                </span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="all_login_containers">
          <form className="login" onSubmit={(e) => {
            triggerMenuSound()
            createProfile(e)
          }
            }>
            <div className="username_password">
              Username:{" "}
              <input
                className="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Create Username"
              />
              Password:{" "}
              <input
                className="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
              />
            </div>
            <div className="login_create">
              <button className="login_submit" type="submit">
                <span>Register</span>
              </button>
              <button onClick={showLogin}><span>Already registered?</span></button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
