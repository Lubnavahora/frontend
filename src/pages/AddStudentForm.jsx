import React, { useState } from 'react';
import axios from '../axiosConfig';

const AddStudentForm = ({ onStudentAdded }) => {
  const [form, setForm] = useState({ name: '', email: '', age: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/students', form)
      .then(() => {
        alert('Student added!');
        setForm({ name: '', email: '', age: '' });
        onStudentAdded(); // 🔄 Refresh student list
      })
      .catch(err => alert('Failed to add student'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>➕ Add Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br />
      <input
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      /><br />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddStudentForm;
