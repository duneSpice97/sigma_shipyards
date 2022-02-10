import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setTriSystems }) {
  const [profileExists, setProfileExists] = useState(true);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  // use effect for auth#auto_login
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
    }
  }, [])

  // login registered user
  function login(e) {
    e.preventDefault();

    function jwtReceived() {
      if (localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"));
        // navigate("/main_menu");
      } else console.log("token does not exist");
    }

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
        localStorage.setItem("token", data.jwt)
        // console.log(data)
        // jwtReceived();
        navigate("/main_menu")
      })
    setUsername("");
    setPassword("");
  }

  // register new user
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
      localStorage.setItem("token", data.include[0].jwt)
      console.log(data)
      // setProfileExists(true);
      // navigate("/main_menu")
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
    <div className="login_background">
      {profileExists ? (
        <div className="all_login_containers">
          <form className="login" onSubmit={login}>
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
            <div className="login_create_have_logout">
              <button className="login_submit" type="submit">
                <span>Login</span>
              </button>
              <button
                className="need_account"
                id="need_account"
                onClick={hideLogin}
              ><span>
                Register
                </span>
              </button>
              <div id="logout">
                <button
                  className="logout"
                  onClick={() => {
                    localStorage.setItem("token", "");
                    // navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="all_login_containers">
          <form className="login" onSubmit={createProfile}>
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
            <div className="login_create_have_logout">
              <button className="login_submit" type="submit">
                Create Profile & Re-enter credentials
              </button>
              <button onClick={showLogin}>Have an account?</button>
              <div id="logout">
                <button
                  className="logout"
                  onClick={() => {
                    localStorage.setItem("token", "");
                    // navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
