import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  AcademicCapIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface StudentFormData {
  name: string;
  class: string;
  rollNumber: string;
  dateOfBirth: string;
  gender: string;
  parentName: string;
  contactNumber: string;
  email: string;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  previousSchool: string;
  admissionDate: string;
}

const initialFormData: StudentFormData = {
  name: '',
  class: '',
  rollNumber: '',
  dateOfBirth: '',
  gender: '',
  parentName: '',
  contactNumber: '',
  email: '',
  address: '',
  bloodGroup: '',
  emergencyContact: '',
  previousSchool: '',
  admissionDate: '',
};

export default function StudentForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      // In a real application, fetch student data from API
      // For now, we'll use sample data
      const sampleData: StudentFormData = {
        name: 'John Doe',
        class: '10th Grade',
        rollNumber: 'STU001',
        dateOfBirth: '2008-05-15',
        gender: 'Male',
        parentName: 'Jane Doe',
        contactNumber: '+1 234 567 8900',
        email: 'john.doe@example.com',
        address: '123 Main St, City, Country',
        bloodGroup: 'O+',
        emergencyContact: '+1 234 567 8901',
        previousSchool: 'ABC School',
        admissionDate: '2023-09-01',
      };
      setFormData(sampleData);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // In a real application, make API call to save/update student
      console.log('Saving student data:', formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/students');
    } catch (err) {
      setError('Failed to save student data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {id ? 'Edit Student' : 'Add New Student'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {id
              ? 'Update student information and details.'
              : 'Fill in the form below to add a new student to the system.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Personal Information */}
          <div className="col-span-full">
            <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                  Class
                </label>
                <div className="mt-1">
                  <select
                    name="class"
                    id="class"
                    required
                    value={formData.class}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Class</option>
                    <option value="9th Grade">9th Grade</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="11th Grade">11th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
                  Roll Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="rollNumber"
                    id="rollNumber"
                    required
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    name="gender"
                    id="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <div className="mt-1">
                  <select
                    name="bloodGroup"
                    id="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-span-full">
            <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
                  Parent/Guardian Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="parentName"
                    id="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="contactNumber"
                    id="contactNumber"
                    required
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="emergencyContact"
                    id="emergencyContact"
                    required
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <textarea
                    name="address"
                    id="address"
                    rows={3}
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="col-span-full">
            <h2 className="text-lg font-medium text-gray-900">Academic Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700">
                  Previous School
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="previousSchool"
                    id="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700">
                  Admission Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="admissionDate"
                    id="admissionDate"
                    required
                    value={formData.admissionDate}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/students')}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : id ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
} 