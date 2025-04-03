import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch courses on load
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // Add a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/courses', { title, description });
      setCourses([...courses, res.data.course]); // Update UI
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  // Delete a course
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId)); // Remove from UI
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  // Remove a student from a course
  const handleRemoveStudent = async (courseId, studentId) => {
    try {
      await axios.delete(`/api/enrollments/${courseId}/${studentId}`);
      fetchCourses(); // Refresh courses
    } catch (err) {
      console.error("Error removing student:", err);
    }
  };

  return (
    <div className="container">
      <h2>📘 Manage Courses</h2>

      {/* Add Course Form */}
      <form onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">➕ Add Course</button>
      </form>

      {/* Course List */}
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <strong>{course.title}</strong> — {course.description}
              <button onClick={() => handleDeleteCourse(course._id)}>🗑️ Delete Course</button>

              {/* Enrolled Students */}
              <h4>👩‍🎓 Enrolled Students:</h4>
              <ul>
                {course.students?.length > 0 ? (
                  course.students.map(student => (
                    <li key={student._id}>
                      {student.name} - {student.email}
                      <button onClick={() => handleRemoveStudent(course._id, student._id)}>❌ Remove</button>
                    </li>
                  ))
                ) : (
                  <p>No students enrolled.</p>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
