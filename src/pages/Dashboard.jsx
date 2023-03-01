import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const fetchID = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/authentication/profile`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((info) => {
        setUserInfo(info);
      });
    } else {
      setUserInfo({ username: "guest" });
    }
  };
  function PostItem({ _id, title, author, createdAt }) {
    const deletePost = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.set("id", _id);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${_id}`, {
        method: "DELETE",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        fetch(`${process.env.REACT_APP_API_URL}/posts`).then((response) => {
          response.json().then((posts) => {
            setPosts(posts);
          });
        });
      }
    };
    return (
      <li>
        <div className="title">
          <Link to={`/post/${_id}`}>{title}</Link>
        </div>
        <div className="info">
          <div className="author">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>by {author?.username}</span>
          </div>
          <time>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
              <path
                fillRule="evenodd"
                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                clipRule="evenodd"
              />
            </svg>
            <span>{format(new Date(createdAt), "MMM d, yyyy - HH:mm")}</span>
          </time>
          {userInfo.id === author?._id && (
            <div className="modifying">
              <Link to={`/edit/${_id}`} className="edit">
                Edit
              </Link>
              <button className="delete" onClick={deletePost}>
                Delete
              </button>
            </div>
          )}
        </div>
      </li>
    );
  }

  useEffect(() => {
    fetchID();
    if (userInfo.username !== "guest") {
      fetch(`${process.env.REACT_APP_API_URL}/posts`).then((response) => {
        response.json().then((posts) => {
          setPosts(posts);
        });
      });
    }
  }, []);

  if (userInfo.username === "guest") {
    return (
      <>
        <h1>You must log in to gain access to the dashboard!</h1>
      </>
    );
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="all-posts">
        <h4>All Posts</h4>
        <ul>
          {posts.length > 0 &&
            posts.map((post) => {
              return <PostItem {...post} key={post._id} />;
            })}
        </ul>
      </div>
    </div>
  );
}
