import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import Post from "../components/Post";

export default function Tech() {
    const [posts, setPosts] = useState([]);
    const {searchRedirect} = useContext(SearchContext);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/posts/tech`).then((response) => {
        response.json().then((posts) => {
          setPosts(posts);
        });
      });
    }, []);
    
    if(searchRedirect){
      return <Navigate to="/search" />
    } 

    return (
        <main>
          {posts.length > 0 &&
            posts.map((post) => {
              return <Post {...post} key={post._id} />;
            })}
        </main>
    )
}