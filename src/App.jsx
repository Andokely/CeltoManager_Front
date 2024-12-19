import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import M_GPers from "./menus/M_GPers";
import M_GProd from "./menus/M_GProd";
import M_GUser from './menus/M_GUser';
import MainMenu from './pages/MainMenu';
import ToastProvider from './components/Notification/ToastProvider';
import Login from './pages/Login';
import '/color.css';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from './pages/ErrorPage';
import SessionExpired from './pages/SessionExpired';

function App() {
  return (
    <>
      <ToastProvider />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/personnel/*" element={<ProtectedRoute><M_GPers /></ProtectedRoute>} />
        <Route path="/production/*" element={<ProtectedRoute><M_GProd /></ProtectedRoute>} />
        <Route path="/utilisateur/*" element={<ProtectedRoute><M_GUser /></ProtectedRoute>} /> */}
        <Route path="/personnel/*" element={<M_GPers />} />
        <Route path="/production/*" element={<M_GProd />} />
        <Route path="/utilisateur/*" element={<M_GUser />} />
        <Route path="*" element={<Navigate to="/error" />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/expired" element={<SessionExpired />} />
      </Routes>
    </>
  );
}

export default App;
