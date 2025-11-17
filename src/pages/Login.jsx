import React, {useState} from 'react';
import api from '../api/api';
import { saveToken, saveUser } from '../utils/auth';

export default function Login(){
  const [username,setUsername]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState(null);

  const submit=async(e)=>{ e.preventDefault(); try{ const res=await api.post('/auth/login',{username,password}); saveToken(res.data.token); saveUser({username}); window.location.href='/dashboard'; }catch(er){ setErr('Login failed'); } }

  return (
    <div style={{maxWidth:420}}>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div><label>Username</label><input value={username} onChange={e=>setUsername(e.target.value)} required /></div>
        <div><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        <div style={{marginTop:8}}><button className="btn" type="submit">Login</button></div>
        {err && <div style={{color:'red'}}>{err}</div>}
      </form>
    </div>
  )
}
