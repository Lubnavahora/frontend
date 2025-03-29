import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>📘 All Courses</h2>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <strong>{course.title}</strong> — {course.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
