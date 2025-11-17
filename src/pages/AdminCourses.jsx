import React, {useEffect, useState} from 'react';
import api from '../api/api';

export default function AdminCourses(){
  const [courses,setCourses]=useState([]);
  const [form,setForm]=useState({title:'',description:'',category:'',price:0});

  useEffect(()=>{ api.get('/courses/all').then(r=>setCourses(r.data)).catch(()=>{}); },[]);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses', form);
      const r = await api.get('/courses/all');
      setCourses(r.data);
      setForm({title:'',description:'',category:'',price:0});
    } catch (err) { alert('Create failed'); }
  }

  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/courses/${id}`);
    setCourses(courses.filter(c=>c.id!==id));
  }

  return (
    <div>
      <h3>Admin - Courses</h3>
      <form onSubmit={create} style={{marginBottom:20}}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button className="btn" type="submit">Create</button>
      </form>

      <div>
        {courses.map(c=>(
          <div key={c.id} style={{border:'1px solid #eee', padding:8, marginBottom:8}}>
            <strong>{c.title}</strong> - {c.category} - ${c.price}
            <button style={{marginLeft:8}} onClick={()=>del(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
