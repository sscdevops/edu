import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/students/StudentList';
import StudentProfile from './pages/students/StudentProfile';
import StudentForm from './pages/students/StudentForm';
import ClassSchedule from './pages/students/ClassSchedule';
import Gradebook from './pages/students/Gradebook';
import Attendance from './pages/students/Attendance';
import ParentPortal from './pages/students/ParentPortal';
import FeeStructure from './pages/fees/FeeStructure';
import FeeCollection from './pages/fees/FeeCollection';
import Reports from './pages/reports/Reports';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/new" element={<StudentForm />} />
          <Route path="/students/:id/edit" element={<StudentForm />} />
          <Route path="/students/:id" element={<StudentProfile />} />
          <Route path="/students/schedule" element={<ClassSchedule />} />
          <Route path="/students/grades" element={<Gradebook />} />
          <Route path="/students/attendance" element={<Attendance />} />
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/fees/structure" element={<FeeStructure />} />
          <Route path="/fees/collection" element={<FeeCollection />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
