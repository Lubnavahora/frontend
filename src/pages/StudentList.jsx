import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>📄 Student List</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.name} - {student.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
