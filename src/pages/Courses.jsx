import React, {useEffect, useState} from 'react';
import api from '../api/api';

export default function Courses(){
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ api.get('/courses').then(r=>setCourses(r.data)).catch(()=>{}).finally(()=>setLoading(false)); },[]);

  return (
    <div>
      <h3>Courses</h3>
      {loading ? <div>Loading...</div> : (
        <div>
          {courses.map(c=>(
            <div key={c.id} className="course-card">
              <h4>{c.title} <small style={{float:'right'}}>{c.price ? `$${c.price}` : 'Free'}</small></h4>
              <div><strong>Category:</strong> {c.category}</div>
              <p>{c.description}</p>
              <EnrollButton courseId={c.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EnrollButton({courseId}){
  const enroll = async () => {
    try {
      await api.post(`/enrollments/course/${courseId}`);
      alert('Enrolled successfully');
    } catch (e) {
      alert(e.response?.data?.error || 'Enroll failed. Login required.');
      window.location.href = '/login';
    }
  }
  return <button className="btn" onClick={enroll}>Enroll</button>
}
