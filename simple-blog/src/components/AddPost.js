// src/components/AddPost.js
import React, { useState } from "react";
import "./AddPost.css"

function AddPost({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content };
    onAddPost(newPost);
    setTitle("");
    setContent("");
  };

  return (
    <div className="wrap">
      <h2>Добавить пост</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Содержание"
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default AddPost;
