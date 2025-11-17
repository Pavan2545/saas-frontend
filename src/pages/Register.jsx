import React, {useState} from 'react';
import api from '../api/api';
import { saveToken, saveUser } from '../utils/auth';

export default function Register(){
  const [username,setUsername]=useState(''); const [password,setPassword]=useState(''); const [fullName,setFullName]=useState(''); const [role,setRole]=useState('ROLE_STUDENT'); const [err,setErr]=useState(null);

  const submit=async(e)=>{ e.preventDefault(); try{ const res=await api.post('/auth/register',{username,password,fullName,role}); saveToken(res.data.token); saveUser({username,fullName}); window.location.href='/dashboard'; }catch(er){ setErr('Register failed'); } }

  return (
    <div style={{maxWidth:520}}>
      <h3>Register</h3>
      <form onSubmit={submit}>
        <div><label>Full name</label><input value={fullName} onChange={e=>setFullName(e.target.value)} required /></div>
        <div><label>Username</label><input value={username} onChange={e=>setUsername(e.target.value)} required /></div>
        <div><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        <div><label>Role</label><select value={role} onChange={e=>setRole(e.target.value)}><option value="ROLE_STUDENT">Student</option><option value="ROLE_INSTRUCTOR">Instructor</option><option value="ROLE_ADMIN">Admin</option></select></div>
        <div style={{marginTop:8}}><button className="btn" type="submit">Register</button></div>
        {err && <div style={{color:'red'}}>{err}</div>}
      </form>
    </div>
  )
}
