import React, { useState } from 'react';
import { CalendarIcon, CheckCircleIcon, XCircleIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedBy: string;
  method: 'manual' | 'biometric';
}

const attendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '101',
    studentName: 'John Doe',
    class: '10th',
    date: '2024-03-20',
    status: 'present',
    markedBy: 'Mr. Smith',
    method: 'manual',
  },
  {
    id: '2',
    studentId: '102',
    studentName: 'Jane Smith',
    class: '10th',
    date: '2024-03-20',
    status: 'late',
    markedBy: 'Biometric System',
    method: 'biometric',
  },
  {
    id: '3',
    studentId: '103',
    studentName: 'Mike Johnson',
    class: '10th',
    date: '2024-03-20',
    status: 'absent',
    markedBy: 'Mrs. Johnson',
    method: 'manual',
  },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10th');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-600';
      case 'absent':
        return 'text-red-600';
      case 'late':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'absent':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      case 'late':
        return <CalendarIcon className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Attendance Tracking</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track student attendance manually or through biometric system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <FingerPrintIcon className="h-5 w-5 mr-2" />
            Start Biometric Scan
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <select
            id="class"
            name="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Present</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-600">
            {attendanceRecords.filter((record) => record.status === 'present').length}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Absent</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-red-600">
            {attendanceRecords.filter((record) => record.status === 'absent').length}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Late</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-yellow-600">
            {attendanceRecords.filter((record) => record.status === 'late').length}
          </dd>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="mt-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Student
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Class
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Marked By
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Method
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {attendanceRecords.map((record) => (
                <tr key={record.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {record.studentName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {record.class}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      {getStatusIcon(record.status)}
                      <span className={`ml-2 ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {record.markedBy}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      {record.method === 'biometric' ? (
                        <FingerPrintIcon className="h-5 w-5 text-gray-400 mr-2" />
                      ) : (
                        <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                      )}
                      {record.method.charAt(0).toUpperCase() + record.method.slice(1)}
                    </div>
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