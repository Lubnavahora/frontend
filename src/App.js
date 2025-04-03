import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import StudentList from './pages/StudentList';
import AddStudentForm from './pages/AddStudentForm';
import CourseList from './pages/CourseList';
import Enrollments from './pages/Enrollments';

function App() {
  const [reload, setReload] = useState(false);

  // Function to refresh student list
  const refreshStudents = () => {
    setReload(prev => !prev); // Toggle state to trigger re-render
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* Student Routes */}
        <Route path="/students" element={<StudentList key={reload} />} />
        <Route path="/add-student" element={<AddStudentForm refreshStudents={refreshStudents} />} />
        
        {/* Other Routes */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/enrollments" element={<Enrollments />} />
      </Routes>
    </Router>
  );
}

export default App;
