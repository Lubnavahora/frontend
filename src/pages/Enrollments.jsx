import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    axios.get('/api/enrollments')
      .then((res) => setEnrollments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>✅ Enrollments</h2>
      {enrollments.length === 0 ? (
        <p>No enrollments yet.</p>
      ) : (
        <ul>
          {enrollments.map((enroll) => (
            <li key={enroll._id}>
              📘 Course ID: {enroll.course} — 🧑 Student ID: {enroll.student}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Enrollments;
