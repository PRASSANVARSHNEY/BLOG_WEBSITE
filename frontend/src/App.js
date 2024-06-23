import React from'react';
import './App.css';
import Home from './pages/home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import MyBlogs from './pages/MyBlogs';
import PostDetails from './pages/CreatePost';
import { Route, Routes } from'react-router-dom';
import UserContextProvider from './context/UserContext';


function App() {
  return (
    <UserContextProvider>
            <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/write" element={<CreatePost/>} />
      <Route path="/edit/:id" element={<EditPost/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/myblogs/:id" element={<MyBlogs/>} />
      <Route path="/Post/post/:id" element={<PostDetails/>} />
  
    </Routes>

    </UserContextProvider>
      
  );
}

export default App;
