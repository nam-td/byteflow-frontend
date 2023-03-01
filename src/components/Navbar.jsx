import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { SearchContext } from "../contexts/SearchContext";

const Navbar = () => {
  const { setUserInfo, trackedUsername, setTrackedUsername } =
    useContext(UserContext);
  const { query, setQuery, setSearchRedirect, setSearchParams } =
    useContext(SearchContext);
  const [searchToggle, setSearchToggle] = useState(false);
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);

  useEffect(() => {
    if (trackedUsername === "") {
      setTrackedUsername("guest");
    }
  }, []);

  const setQueryString = (e) => {
    const keyword = e.target.value;
    setQuery({ q: keyword, page: 0 });
  };

  const search = (e) => {
    e.preventDefault();
    setSearchRedirect(true);
    setSearchParams(query);
  };

  const logout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/authentication/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUserInfo({ username: "guest" });
    setTrackedUsername("guest");
  };
  return (
    <header>
      <div className="upper-nav">
        <div className="container">
          <div className="upper-nav-wrapper">
            <nav>
              {trackedUsername !== "guest" && (
                <>
                  <Link to="/dashboard" className="user-display">
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
                    <span>{trackedUsername}</span>
                  </Link>
                  <Link to="/create">Create new post</Link>
                  <button className="logout" onClick={logout}>
                    Logout
                  </button>
                </>
              )}
              {trackedUsername === "guest" && (
                <>
                  <Link to="/register" className="user-display">
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
                    <span>{trackedUsername}</span>
                  </Link>
                  <Link to="/login">Log In</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="container">
          <div className="main-nav-wrapper">
            <Link to="/" className="logo">
              <img src="/assets/logo.svg" alt="" />
            </Link>
            <nav>
              <Link to="/tech">Tech</Link>
              <Link to="/reviews">Reviews</Link>
              <Link to="/entertainment">Entertainment</Link>
              <Link to="/science">Science</Link>
              <div className="search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    if (searchToggle) {
                      setSearchToggle(false);
                    } else {
                      setSearchToggle(true);
                    }
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <form onSubmit={(e) => search(e)}>
                  <input
                    type="text"
                    className={
                      searchToggle
                        ? "search-field search-display"
                        : "search-field"
                    }
                    onChange={(e) => setQueryString(e)}
                  />
                </form>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="mobile-nav">
        <Link to="/" className="logo">
          <img src="/assets/logo.svg" alt="" />
        </Link>

        <div
          className="hamburger-menu"
          onClick={() => {
            if (mobileMenuToggle) {
              setMobileMenuToggle(false);
            } else {
              setMobileMenuToggle(true);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div
          className={
            mobileMenuToggle
              ? "vertical-nav vertical-nav-active"
              : "vertical-nav"
          }
        >
          <div className="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
              onClick={() => {
                setMobileMenuToggle(false);
              }}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Link to="tech">Tech</Link>
          <Link to="reviews">Reviews</Link>
          <Link to="entertainment">Entertainment</Link>
          <Link to="science">Science</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <div className="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
            <form
              onSubmit={(e) => {
                setMobileMenuToggle(false);
                search(e);
              }}
            >
              <input
                type="text"
                className="mobile-search-field"
                onChange={(e) => setQueryString(e)}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
