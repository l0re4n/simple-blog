// src/components/PostList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPost from "./AddPost";  // Импортируем компонент AddPost
import "./PostList.css"

function PostList() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({ id: null, title: "", content: "" });

  // Получаем посты с сервера
  useEffect(() => {
    axios.get("http://localhost:5000/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Создание нового поста
  const handleAddPost = (newPost) => {
    axios.post("http://localhost:5000/posts", newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
      })
      .catch((error) => console.error(error));
  };

  // Удаление поста
  const handleDeletePost = (id) => {
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch((error) => console.error(error));
  };

  // Начало редактирования поста
  const handleEditPost = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
  };

  // Сохранение изменений поста
  const handleSavePost = (updatedPost) => {
    axios.put(`http://localhost:5000/posts/${updatedPost.id}`, updatedPost)
      .then((response) => {
        setPosts(posts.map(post => post.id === updatedPost.id ? response.data : post));
        setIsEditing(false);
        setCurrentPost({ id: null, title: "", content: "" });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="main-wrap">
      <h1>Посты</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleEditPost(post)}>Редактировать</button>
            <button onClick={() => handleDeletePost(post.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {isEditing ? (
        <div>
          <h2>Редактировать пост</h2>
          <input
            type="text"
            value={currentPost.title}
            onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
            placeholder="Заголовок"
          />
          <textarea
            value={currentPost.content}
            onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
            placeholder="Содержание"
          />
          <button onClick={() => handleSavePost(currentPost)}>Сохранить</button>
        </div>
      ) : (
        <AddPost onAddPost={handleAddPost} />
      )}
    </div>
  );
}

export default PostList;