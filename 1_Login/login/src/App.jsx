import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  )
}

export default App
