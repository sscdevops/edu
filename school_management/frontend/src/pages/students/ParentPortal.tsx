import React, { useState } from 'react';
import { AcademicCapIcon, CalendarIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline';

interface StudentInfo {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
    total: number;
  };
  grades: {
    subject: string;
    marks: number;
    maxMarks: number;
    grade: string;
  }[];
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    type: 'exam' | 'holiday' | 'event';
  }[];
}

const studentInfo: StudentInfo = {
  id: '1',
  name: 'John Doe',
  class: '10th',
  rollNumber: '101',
  attendance: {
    present: 85,
    absent: 10,
    late: 5,
    total: 100,
  },
  grades: [
    {
      subject: 'Mathematics',
      marks: 85,
      maxMarks: 100,
      grade: 'A',
    },
    {
      subject: 'Science',
      marks: 92,
      maxMarks: 100,
      grade: 'A+',
    },
    {
      subject: 'English',
      marks: 78,
      maxMarks: 100,
      grade: 'B+',
    },
  ],
  upcomingEvents: [
    {
      id: '1',
      title: 'Mid-term Examination',
      date: '2024-04-15',
      type: 'exam',
    },
    {
      id: '2',
      title: 'Sports Day',
      date: '2024-04-20',
      type: 'event',
    },
    {
      id: '3',
      title: 'School Holiday',
      date: '2024-04-25',
      type: 'holiday',
    },
  ],
};

export default function ParentPortal() {
  const [activeTab, setActiveTab] = useState('overview');

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'text-red-600 bg-red-50';
      case 'holiday':
        return 'text-green-600 bg-green-50';
      case 'event':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Parent Portal</h1>
          <p className="mt-2 text-sm text-gray-700">
            Access your child's academic information and school updates.
          </p>
        </div>
      </div>

      {/* Student Info */}
      <div className="mt-8">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <UserIcon className="h-12 w-12 text-gray-400" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{studentInfo.name}</h3>
                <p className="text-sm text-gray-500">
                  Class {studentInfo.class} | Roll Number: {studentInfo.rollNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'attendance', 'grades', 'events'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Attendance Rate</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {((studentInfo.attendance.present / studentInfo.attendance.total) * 100).toFixed(1)}%
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Average Grade</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {(studentInfo.grades.reduce((sum, grade) => sum + grade.marks, 0) / studentInfo.grades.length).toFixed(1)}%
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Upcoming Exams</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {studentInfo.upcomingEvents.filter((event) => event.type === 'exam').length}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Late Arrivals</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {studentInfo.attendance.late}
              </dd>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Attendance Summary</h3>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-green-50 px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-green-600">Present</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-600">
                    {studentInfo.attendance.present}
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-red-50 px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-red-600">Absent</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-red-600">
                    {studentInfo.attendance.absent}
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-yellow-50 px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-yellow-600">Late</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-yellow-600">
                    {studentInfo.attendance.late}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Academic Performance</h3>
              <div className="mt-4">
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {studentInfo.grades.map((grade) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
              <div className="mt-4">
                <ul className="divide-y divide-gray-200">
                  {studentInfo.upcomingEvents.map((event) => (
                    <li key={event.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.date}</p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 