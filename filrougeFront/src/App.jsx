// App.jsx
import React from 'react';
import MainContent from './components/MainContent';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomeHeader from './components/HomeHeader';
import WelcomeHeader from './components/WelcomeHeader';
import SinglePost from './components/SinglePost';
import FilterPost from './components/FilterPost';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Write from './components/Write';
import Profile from './components/Profile';
import SavedPosts from './components/SavedPosts';
import Edit from './components/Edit';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Notauthorized from './components/NotAuthorized';
function App() {
  const { logged } = useSelector(state => state.users)
  return (
    <>
      {logged ? <HomeHeader /> : <WelcomeHeader />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/demo" element={<MainContent />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/filter/:tag" element={<FilterPost />} />
        <Route element={<PrivateRoute />}>
          <Route path='/saved' element={<SavedPosts />} />
          <Route path="/write" element={<Write />} />
          <Route path="/editPost/:postId" element={<Edit />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={!logged ? "/demo" : "/"} />}
        />
        <Route path="/forbidden" element={<Notauthorized/>} />
      </Routes>
    </>
  );
}

export default App;
