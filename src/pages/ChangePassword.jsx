import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

const ChangePassword = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [helper, setHelper] = useState("");
  const [redirect, setRedirect] = useState(false);
  const param = useParams();

  const passwordValidate = (e) => {
    const passwordInput = e.target.value;
    if (passwordInput.length >= 8) {
      setPassword(passwordInput);
      setHelper("");
    } else {
      setPassword("");
      setHelper("Password must be at least 8 characters long.");
    }
  };

  const verifyEmailUrl = async (userId, token) => {
    try {
      const body = {
        userId: userId,
        token: token,
      };
      const url = `${process.env.REACT_APP_API_URL}/authentication/recover/password/${param.userid}/${param.token}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const msg = await data.msg;
      if (res.status === 200) {
        setValidUrl(true);
        setMessage(msg);
      } else {
        setValidUrl(false);
        setMessage(msg);
      }
    } catch (err) {
      console.log(err);
      setValidUrl(false);
      setMessage("Invalid Link");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password !== "") {
      try {
        const body = {
          userId: param.userid,
          token: param.token,
          password: password,
        };
        const url = `${process.env.REACT_APP_API_URL}/authentication/recover/password/${param.userid}/${param.token}`;
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        const msg = await data.msg;
        setHelper(msg);
        setTimeout(() => {
            setRedirect(true);
        }, 3000);
      } catch (err) {
        console.log(err);
        setHelper("Reset Password Failed!")
      }
    }
  };
  useEffect(() => {
    verifyEmailUrl(param.userid, param.token);
  }, []);

  if (redirect) return <Navigate to="/" />

  return (
    <div className="v-container">
      {validUrl ? (
        <form onSubmit={(e) => resetPassword(e)}>
          <label>New Password:</label>
          <input onChange={(e) => passwordValidate(e)} type="password" />
          <p className="helper">{helper}</p>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
};

export default ChangePassword;
