import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [message, setMessage] = useState("");
  const param = useParams();
  const verifyEmailUrl = async (userId, token) => {
    try {
      const body = {
        userId: userId,
        token: token,
      };
      const url = `${process.env.REACT_APP_API_URL}/authentication/${param.userid}/verify/${param.token}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      const msg = await data.msg;
      if (res.status === 200) {
        setValidUrl(true);
        setMessage(msg);
      }
    } catch (err) {
      console.log(err);
      setValidUrl(false);
    }
  };
  useEffect(() => {
    verifyEmailUrl(param.userid, param.token);
  }, []);
  return (
    <div className="email-verify">
      {validUrl ? (
        <>
          <h1>
            <span className="tick">
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
            <span>{message}</span>
          </h1>
          <div className="redirect">
            <Link to="/login">Log In</Link>
            <Link to="/">Homepage</Link>
          </div>
        </>
      ) : (
        <h1>Invalid Link</h1>
      )}
    </div>
  );
};

export default EmailVerify;
