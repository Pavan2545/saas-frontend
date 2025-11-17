import React, {useEffect, useState} from 'react';
import api from '../api/api';
import { getUser } from '../utils/auth';

export default function Dashboard(){
  const [enrolls,setEnrolls]=useState([]);
  const user=getUser();

  useEffect(()=>{ api.get('/enrollments/me').then(r=>setEnrolls(r.data)).catch(()=>{}); },[]);

  return (
    <div>
      <h3>Dashboard</h3>
      <div>Welcome, {user ? user.fullName || user.username : 'User'}</div>
      <h4>Your Enrollments</h4>
      <ul>
        {enrolls.map(e=>(
          <li key={e.id}>{e.course.title} - Enrolled at: {new Date(e.enrolledAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  )
}
