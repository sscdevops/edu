import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

interface StudentProfile {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  dateOfBirth: string;
  gender: string;
  parentName: string;
  contactNumber: string;
  email: string;
  address: string;
  attendance: {
    present: number;
    absent: number;
    total: number;
    percentage: number;
  };
  academicRecords: {
    subject: string;
    grade: string;
    marks: number;
    maxMarks: number;
  }[];
}

const studentProfile: StudentProfile = {
  id: '1',
  name: 'John Doe',
  class: '10th Grade',
  rollNumber: 'STU001',
  dateOfBirth: '2008-05-15',
  gender: 'Male',
  parentName: 'Jane Doe',
  contactNumber: '+1 234 567 8900',
  email: 'john.doe@example.com',
  address: '123 Main St, City, Country',
  attendance: {
    present: 180,
    absent: 10,
    total: 190,
    percentage: 95,
  },
  academicRecords: [
    { subject: 'Mathematics', grade: 'A', marks: 95, maxMarks: 100 },
    { subject: 'Science', grade: 'A-', marks: 88, maxMarks: 100 },
    { subject: 'English', grade: 'B+', marks: 85, maxMarks: 100 },
  ],
};

export default function StudentProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/students')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Students
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Student Profile</h1>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              Detailed information about the student including academic records and attendance.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <UserIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                <p className="text-sm text-gray-500">Basic details about the student</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Class</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.class}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Roll Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.rollNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.dateOfBirth}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.gender}</dd>
              </div>
            </dl>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <CalendarIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
                <p className="text-sm text-gray-500">Parent and emergency contact details</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Parent Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.parentName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.contactNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.address}</dd>
              </div>
            </dl>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Attendance Summary</h2>
                <p className="text-sm text-gray-500">Current academic year attendance</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Present Days</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.attendance.present}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Absent Days</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.attendance.absent}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Days</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.attendance.total}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Attendance Percentage</dt>
                <dd className="mt-1 text-sm text-gray-900">{studentProfile.attendance.percentage}%</dd>
              </div>
            </dl>
          </div>

          {/* Academic Records */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <AcademicCapIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Academic Records</h2>
                <p className="text-sm text-gray-500">Current academic performance</p>
              </div>
            </div>
            <div className="mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Subject
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Grade
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentProfile.academicRecords.map((record) => (
                    <tr key={record.subject}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.subject}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.grade}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {record.marks}/{record.maxMarks}
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