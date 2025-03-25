import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  PencilIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  attendance: number;
  grade: string;
}

const students: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    class: '10th Grade',
    rollNumber: 'STU001',
    attendance: 95,
    grade: 'A',
  },
  // Add more sample data as needed
];

export default function StudentList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError('');

    try {
      // In a real application, this would upload the file to your backend
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate file type
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
        throw new Error('Please upload a CSV or Excel file');
      }

      // Here you would typically:
      // 1. Upload the file to your backend
      // 2. Process the file
      // 3. Validate the data
      // 4. Import the students
      
      console.log('Importing file:', file.name);
      // Simulate success
      alert('Students imported successfully!');
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to import students');
    } finally {
      setIsImporting(false);
    }
  };

  const downloadTemplate = () => {
    // Create CSV template content
    const template = [
      ['Name', 'Class', 'Roll Number', 'Date of Birth', 'Gender', 'Parent Name', 'Contact Number', 'Email', 'Address', 'Blood Group', 'Emergency Contact', 'Previous School', 'Admission Date'],
      ['John Doe', '10th Grade', 'STU001', '2008-05-15', 'Male', 'Jane Doe', '+1 234 567 8900', 'john.doe@example.com', '123 Main St', 'O+', '+1 234 567 8901', 'ABC School', '2023-09-01'],
    ].map(row => row.join(',')).join('\n');

    // Create and trigger download
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all students in your school including their name, class, and academic status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div className="flex items-center space-x-3">
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Download Template
            </button>
            <label className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Import Students
              <input
                type="file"
                className="hidden"
                accept=".csv,.xlsx"
                onChange={handleImport}
                disabled={isImporting}
              />
            </label>
            <button
              onClick={() => navigate('/students/new')}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Student
            </button>
          </div>
        </div>
      </div>

      {importError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{importError}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative w-full max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <select
                className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="all">All Classes</option>
                <option value="9">9th Grade</option>
                <option value="10">10th Grade</option>
                <option value="11">11th Grade</option>
                <option value="12">12th Grade</option>
              </select>
            </div>
          </div>
        </div>

        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Class
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Roll Number
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Attendance
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Grade
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {student.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.class}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.rollNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.attendance}%</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.grade}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end space-x-3">
                          <Link
                            to={`/students/${student.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/students/${student.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 