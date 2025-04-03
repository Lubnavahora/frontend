import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import '../studentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students
        const studentRes = await axios.get('/api/students');
        setStudents(studentRes.data);

        // ✅ Fetch enrollments (which includes courses)
        const enrollmentRes = await axios.get('/api/enrollments');
        setEnrollments(enrollmentRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to load students and enrollments. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FIX: Get enrolled courses from enrollments, NOT courses
  const getEnrolledCourses = (studentId) => {
    const enrolledCourses = enrollments
      .filter(enrollment => enrollment.student._id === studentId)
      .map(enrollment => enrollment.course.title);

    return enrolledCourses.length > 0 ? enrolledCourses.join(', ') : 'Not enrolled in any courses';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Student List</h2>

      {loading && <p className="text-center text-gray-600">Loading students...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && students.length === 0 && <p className="text-center text-gray-500">No students found.</p>}

      <ul className="divide-y divide-gray-300">
        {students.map(student => (
          <li key={student._id} className="py-4">
            <strong className="text-lg">{student.name}</strong> - {student.email} <br />
            <em className="text-gray-600">Enrolled in: {getEnrolledCourses(student._id)}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
