import React from 'react'
import "./Styles.css"               // <-- exact filename, lowercase
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import AdminCourses from './pages/AdminCourses'
import ProtectedRoute from './components/ProtectedRoute'
import { getToken, logout, getUsername } from './utils/auth'

export default function App() {
  return (
    <div className="container">
      {/* add className="header" so the stylesheet targets this element */}
      <header className="header">
        <div>
          <h1 style={{margin:0}}>SaaS Learning</h1>
          <nav style={{marginTop:8}}>
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            {getToken() && <Link to="/dashboard">Dashboard</Link>}
            {getToken() && <Link to="/admin/courses">Admin</Link>}
          </nav>
        </div>
        <div>
          {getToken() ? (
            <>
              <span style={{marginRight:12}}>Hi, {getUsername() || 'User'}</span>
              <button className="btn" onClick={()=>{logout(); window.location.href='/'}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"><button className="btn">Login</button></Link>
              <Link to="/register"><button className="btn secondary" style={{marginLeft:8}}>Register</button></Link>
            </>
          )}
        </div>
      </header>

      <main style={{marginTop:20}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute><AdminCourses/></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
