import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { SearchContext } from "../contexts/SearchContext";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function PostPage() {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const {searchRedirect} = useContext(SearchContext);

  const deletePost = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({id: postInfo._id});
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
      method: "DELETE",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  const updateViewcount = () => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/viewcount/${id}`, {
      method: "PUT",
    }).then((response) => {
      response.json().then((message) => {
        console.log(message);
      });
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        updateViewcount();
      });
    });
  }, [id]);

  if (!postInfo) {
    return "";
  }
  
  if(searchRedirect){
    return <Navigate to="/search" />
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
      <div className="post-page">
        <div className="image">
          <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
        <h1>{postInfo.title}</h1>
        <div className="info">
          <Link to="/" className="author user-display">
            <span>
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
            </span>
            <span>by {postInfo.author.username}</span>
          </Link>
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
            {format(new Date(postInfo.createdAt), "MMM d, yyyy - HH:mm")}
          </time>
          {userInfo.userid === postInfo.author._id && (
            <div className="modify-control">
              <Link to={`/edit/${postInfo._id}`} className="edit">
                Edit Post
              </Link>
              <button className="delete" onClick={deletePost}>
                Delete Post
              </button>
            </div>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
          className="content"
        />
        <div className="tags">
          {postInfo.tags.length > 0 &&
            postInfo.tags.map((tag) => {
              return (
                <Link key={tag} to={tag}>
                  {tag[0].toUpperCase() + tag.substring(1)}
                </Link>
              );
            })}
        </div>
      </div>
  );
}
