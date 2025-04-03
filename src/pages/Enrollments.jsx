import { useState, useEffect } from "react";

function Enrollments() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch students
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("❌ Error fetching students:", error));
  }, []);

  // ✅ Fetch courses
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("❌ Error fetching courses:", error));
  }, []);

  // ✅ Enroll student in course
  const handleEnroll = () => {
    if (!selectedStudent || !selectedCourse) {
      setMessage("⚠️ Please select both a student and a course.");
      return;
    }

    setLoading(true);
    setMessage("");

    fetch(`http://localhost:5000/api/enrollments/${selectedCourse}/enroll/${selectedStudent}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setMessage("✅ Enrollment successful!");
      })
      .catch((error) => setMessage(`❌ Error: ${error.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Enroll a Student</h2>

      {message && <p className="text-center mb-4 p-2 rounded-lg bg-gray-100">{message}</p>}

      {/* ✅ Select Student */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Student:</label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          onChange={(e) => setSelectedStudent(e.target.value)}
          value={selectedStudent}
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.email})
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Select Course */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Course:</label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          onChange={(e) => setSelectedCourse(e.target.value)}
          value={selectedCourse}
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Enroll Button */}
      <button
        onClick={handleEnroll}
        disabled={loading}
        className={`w-full text-white py-2 px-4 rounded-lg transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Enrolling..." : "Enroll Student"}
      </button>
    </div>
  );
}

export default Enrollments;
