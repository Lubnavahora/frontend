import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import StudentList from './pages/StudentList';
import AddStudentForm from './pages/AddStudentForm';
import CourseList from './pages/CourseList';
import Enrollments from './pages/Enrollments';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Tasks" element={<Tasks />} />

        {/* New Routes */}
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-student" element={<AddStudentForm />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/enrollments" element={<Enrollments />} />
      </Routes>
    </Router>
  );
}

export default App;
