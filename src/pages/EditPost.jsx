import { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { SearchContext } from "../contexts/SearchContext";

export default function EditPost() {

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {searchRedirect} = useContext(SearchContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/` + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setTags(postInfo.tags);
        console.log(content);
      });
    });
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("id", id);
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    tags.forEach((tag) => {
        data.append("tags[]", tag)
    });
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  if(searchRedirect){
    return <Navigate to="/search" />
  }

  if (redirect) {
    return <Navigate to={`/posts/${id}`} />;
  }

  return (
    <form className="create-post" onSubmit={editPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor value={content} onChange={(newValue) => setContent(newValue)} />
      <input
        type="text"
        placeholder="tags (Seperate tags by comma. Ex: Tech, Business, Finance, ...)"
        value={tags.join(", ")}
        onChange={(e) => {
          const input = e.target.value;
          const inputArr = input.split(", ");
          setTags(inputArr);
        }}
      />
      <button>Save Edit</button>
    </form>
  );
}
