import React, { useState } from 'react';
import { AcademicCapIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface Grade {
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  remarks: string;
}

interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  grades: Grade[];
}

const students: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    class: '10th',
    rollNumber: '101',
    grades: [
      {
        subject: 'Mathematics',
        marks: 85,
        maxMarks: 100,
        grade: 'A',
        remarks: 'Excellent work',
      },
      {
        subject: 'Science',
        marks: 92,
        maxMarks: 100,
        grade: 'A+',
        remarks: 'Outstanding performance',
      },
      {
        subject: 'English',
        marks: 78,
        maxMarks: 100,
        grade: 'B+',
        remarks: 'Good effort',
      },
    ],
  },
];

export default function Gradebook() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  const calculateAverage = () => {
    const total = selectedStudent.grades.reduce((sum, grade) => sum + grade.marks, 0);
    return (total / (selectedStudent.grades.length * 100)) * 100;
  };

  const generateReportCard = () => {
    // In a real application, this would generate a PDF report card
    console.log('Generating report card for', selectedStudent.name);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Gradebook</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage student grades and generate report cards.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={generateReportCard}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Generate Report Card
          </button>
        </div>
      </div>

      {/* Student Selection */}
      <div className="mt-8">
        <label htmlFor="student" className="block text-sm font-medium text-gray-700">
          Select Student
        </label>
        <select
          id="student"
          name="student"
          value={selectedStudent.id}
          onChange={(e) => {
            const student = students.find((s) => s.id === e.target.value);
            if (student) setSelectedStudent(student);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} - {student.class} ({student.rollNumber})
            </option>
          ))}
        </select>
      </div>

      {/* Student Info */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Student Name</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {selectedStudent.name}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Class</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {selectedStudent.class}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Average Score</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {calculateAverage().toFixed(1)}%
          </dd>
        </div>
      </div>

      {/* Grades Table */}
      <div className="mt-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Subject
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Marks
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Grade
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Remarks
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {selectedStudent.grades.map((grade) => (
                <tr key={grade.subject}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                      {grade.subject}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      {grade.marks}/{grade.maxMarks}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {grade.grade}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {grade.remarks}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 