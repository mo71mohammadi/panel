import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Icon, Button, message } from "antd";
import axios from "axios";
import Services from "./services";
import { UserState } from "./userState";

//const baseUrl = "http://45.92.95.69:5000/api//signup";

export default function SignUp(params: any) {
  const { userInfo, setUserInfo } = useContext(UserState);

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined || "");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    Services.getAll().then((initialNotes: any) => setNotes(initialNotes));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      Services.setToken(user.token);
    }
  }, []);

  console.log("useEffect user", user);

  const HandleLogin = async (event: any) => {
    message.info("logging in with");

    event.preventDefault();

    await axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/login ",
      data: {
        username: userInfo.username,
        password: userInfo.password
      }
    })
      .then((res: { data: any }) => {
        //setErrorMessage(res.data.message);
        //setUserInfo(res.data)
        // message.info("res.data =>", res.data);
        console.log("res.data", res.data);
      })
      .catch(() => console.log("Get Data Fail"));

    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
    //Services.setToken(user.token);
    setUser(user);
    //setUsername("");
    //setPassword("");
  };

  async function HandleSignUp(credentials: any) {
    console.log("userInfo", userInfo);

    await axios({
      method: "post",
      url: "http://45.92.95.69:5000/api//signup",
      data: {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email
      }
    })
      .then((res: { data: any }) => {
        setErrorMessage(res.data.message);
        message.info("res.data.message", res.data.message);
      })
      .catch(() => console.log("Get Data Fail"));
  }

  return (
    <>
      <Form onSubmit={HandleLogin}>
        <div>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            type="text"
            style={{ margin: 16, width: "50%" }}
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
          />
        </div>

        <div>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            type="text"
            style={{ margin: 16, width: "50%" }}
            value={userInfo.username}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, username: target.value })
            }
          />
        </div>
        <div>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
            type="password"
            style={{ margin: 16, width: "50%" }}
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
          />
        </div>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ margin: 16, width: "50%" }}
          >
            Login
          </Button>
          <Button style={{ margin: 16, width: "50%" }} onClick={HandleSignUp}>
            SignUp
          </Button>
        </div>
      </Form>
    </>
  );
}
