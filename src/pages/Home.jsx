import React, { useEffect, useState } from "react";

// Detect backend URL automatically
// 1. Use Vite env if available
// 2. Fallback to local dev backend
// 3. Avoid crashes if undefined

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080";  // fallback for local dev

const COURSES_API = `${API_BASE}/api/courses`;

export default function Home() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch(COURSES_API);

        if (!res.ok) throw new Error("Server unreachable");

        const data = await res.json();
        if (mounted) setCourses(data);
      } catch (e) {
        // Show fallback courses to avoid empty UI
        if (mounted) {
          setErr("Backend offline — showing sample courses.");
          setCourses([
            {
              id: 1,
              title: "Intro to Java",
              category: "Programming",
              price: 0,
              description: "Learn the basics of Java and OOP."
            },
            {
              id: 2,
              title: "React for Beginners",
              category: "Frontend",
              price: 9.99,
              description: "Build modern web apps with React."
            },
            {
              id: 3,
              title: "Spring Boot Essentials",
              category: "Backend",
              price: 9.99,
              description: "Learn how to build REST APIs in Spring Boot."
            }
          ]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <div className="hero">
        <div>
          <h2>Welcome to SaaS Learning</h2>
          <p className="lead">
            Learn from curated courses created by expert instructors.
          </p>

          {err && <p style={{ color: "red" }}>{err}</p>}

          <a href="/courses" className="btn primary">Browse Courses</a>
        </div>
      </div>

      {/* COURSES */}
      <h3 style={{ marginTop: 30 }}>Courses</h3>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="courses-grid">
          {courses.map((c) => (
            <div key={c.id} className="course-card">
              <h4>{c.title}</h4>
              <p><b>Category:</b> {c.category}</p>
              <p>{c.description}</p>
              <p><b>Price:</b> {c.price === 0 ? "Free" : `$${c.price}`}</p>

              <button className="btn">Preview</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
