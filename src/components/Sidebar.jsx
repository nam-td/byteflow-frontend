import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MostViewedPost({_id, title, cover, summary, tags}){
  return(
    <li>
    <div className="image">
      <Link to={`/posts/${_id}`}>
        <img
          src={"http://localhost:4000/" + cover.replaceAll('\\', '/')}
          alt=""
        />
      </Link>
    </div>
    <div className="texts">
      <h3>
      <Link to={`/posts/${_id}`}>{title}</Link>
      </h3>
      <div className="tags">
      {tags.length > 0 &&
          tags.map((tag) => {
            return <Link 
                    key={tag}
                    to={`/${tag}`}>
                      {tag[0].toUpperCase() + tag.substring(1)}
                   </Link>;
          })}
      </div>
    </div>
  </li>
  )
}


export default function Sidebar() {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts?sort=mostviewed`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <aside>
      <h2>Most Read Stories</h2>
      <ul>
      {posts.length > 0 &&
          posts.map((post) => {
            return <MostViewedPost {...post} key={post._id} />;
          })}
      </ul>
    </aside>
  );
}
