import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Post from "../components/Post";
import { SearchContext } from "../contexts/SearchContext";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const {
    searchParams,
    setSearchParams,
    setSearchRedirect,
    query
  } = useContext(SearchContext);
  const location = useLocation();

  const searchFetch = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/posts/search?q=${searchParams.get("q")}&page=${searchParams.get("page")}`
    ).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  };

  

  useEffect(() => {
    setSearchParams(query);
    setSearchRedirect(false);
  }, []);

  useEffect(() => {
    searchFetch();
  }, [location]);

  return (
      <main>
        {posts.length > 0 &&
          posts.map((post) => {
            return <Post {...post} key={post._id} />;
          })}
      </main>
  );
};

export default Search;
