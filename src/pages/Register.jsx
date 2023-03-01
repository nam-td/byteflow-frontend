import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("success");
  const [usernameHelper, setUsernameHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [emailHelper, setEmailHelper] = useState("");

  const usernameFetch = async (username) => {
    const body = {
      username: username,
    };
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/authentication/validation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const msg = await data.msg;
      setUsernameHelper(msg);
    } catch (err) {
      console.log(err);
    }
  };

  const emailFetch = async (email) => {
    const body = {
      email: email,
    };
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/authentication/validation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const msg = await data.msg;
      setEmailHelper(msg);
    } catch (err) {
      console.log(err);
    }
  };

  const usernameValidate = async (e) => {
    const usernameInput = e.target.value;
    if (
      usernameInput.length < 6 ||
      usernameInput.length > 64 ||
      /[^\w-.]/.test(usernameInput)
    ) {
      setUsernameHelper(
        "Username must me 6-64 character long and can only include letters, digits, underscore, hyphen and period."
      );
      setUsername("");
    } else {
      setUsernameHelper("");
      setUsername(usernameInput);
    }
  };
  const emailValidate = async (e) => {
    const emailInput = e.target.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
      setEmailHelper("");
      setEmail(emailInput);
    } else {
      setEmailHelper("Invalid email!");
      setEmail("");
    }
  };
  const passwordValidate = (e) => {
    const passwordInput = e.target.value;
    if (passwordInput.length < 8) {
      setPasswordHelper("Password can't be less than 8 characters long.");
      setPassword("");
    } else {
      setPasswordHelper("");
      setPassword(passwordInput);
    }
  };
  const register = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "" && email !== "") {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/authentication/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
      const { msg } = await res.json();
      if (res.status === 200) {
        setStatus("success");
        setMessage(msg);
        setTimeout(() => {
          setRedirect(true);
        }, 3000);
      } else {
        setStatus("error");
        setMessage("Registration failed. Please try again later");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (username !== "") {
      usernameFetch(username);
    }
    if (email !== "") {
      emailFetch(email);
    }
  }, [username, email]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="v-container">
      <h1 className="page-title">Register</h1>
      <form className="register-form" onSubmit={register}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={(e) => usernameValidate(e)}
          required
        />
        <p className="helper">{usernameHelper}</p>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => passwordValidate(e)}
        />
        <p className="helper">{passwordHelper}</p>
        <label>Email Address:</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => emailValidate(e)}
        />
        <p className="helper">{emailHelper}</p>
        <input type="submit" value="Register" />
      </form>
      <div
        className={
          message !== ""
            ? `response-message response-active ${status}`
            : `response-message ${status}`
        }
      >
        {status === "error" ? (
          <span className="error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        ) : (
          <span className="success-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
        <span className="texts">{message}</span>
      </div>
    </div>
  );
};

export default Register;
