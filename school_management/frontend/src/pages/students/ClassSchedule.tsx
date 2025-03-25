import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CalendarIcon, ClockIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Schedule {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  days: string[];
  grade: string;
  section: string;
}

interface ScheduleFormData {
  grade: string;
  section: string;
  schedules: {
    subject: string;
    teacher: string;
    room: string;
    startTime: string;
    endTime: string;
    days: string[];
  }[];
}

const initialFormData: ScheduleFormData = {
  grade: '',
  section: '',
  schedules: [{
    subject: '',
    teacher: '',
    room: '',
    startTime: '',
    endTime: '',
    days: [],
  }],
};

const schedules: Schedule[] = [
  {
    id: '1',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'Room 101',
    startTime: '09:00',
    endTime: '10:00',
    days: ['Monday', 'Wednesday', 'Friday'],
    grade: '10th Grade',
    section: 'A',
  },
  {
    id: '2',
    subject: 'Science',
    teacher: 'Mrs. Johnson',
    room: 'Room 102',
    startTime: '10:15',
    endTime: '11:15',
    days: ['Monday', 'Wednesday', 'Friday'],
    grade: '10th Grade',
    section: 'A',
  },
  {
    id: '3',
    subject: 'English',
    teacher: 'Mr. Brown',
    room: 'Room 103',
    startTime: '11:30',
    endTime: '12:30',
    days: ['Tuesday', 'Thursday'],
    grade: '10th Grade',
    section: 'A',
  },
  // Add more sample schedules for different grades and sections
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = Array.from({ length: 8 }, (_, i) => {
  const hour = 9 + i;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const grades = ['9th Grade', '10th Grade', '11th Grade', '12th Grade'];
const sections = ['A', 'B', 'C', 'D'];

const subjects = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Physical Education',
  'Art',
  'Music',
  'Economics',
  'Business Studies',
  'Environmental Science',
  'Psychology',
  'Sociology',
  'Political Science',
  'Philosophy',
  'Literature',
  'Foreign Language',
  'Health Education',
  'Career Counseling',
  'Library',
  'Study Hall',
];

export default function ClassSchedule() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedGrade, setSelectedGrade] = useState('10th Grade');
  const [selectedSection, setSelectedSection] = useState('A');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [formData, setFormData] = useState<ScheduleFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [schedulesList, setSchedulesList] = useState<Schedule[]>(schedules);
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleOpenModal = (schedule?: Schedule) => {
    if (schedule) {
      setEditingSchedule(schedule);
      setFormData({
        grade: schedule.grade,
        section: schedule.section,
        schedules: [{
          subject: schedule.subject,
          teacher: schedule.teacher,
          room: schedule.room,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          days: schedule.days,
        }],
      });
    } else {
      setEditingSchedule(null);
      setFormData(initialFormData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSchedule(null);
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep === 1 && (!formData.grade || !formData.section)) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddRow = () => {
    setFormData(prev => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        {
          subject: '',
          teacher: '',
          room: '',
          startTime: '',
          endTime: '',
          days: [],
        },
      ],
    }));
  };

  const handleScheduleChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule
      ),
    }));
  };

  const handleDayToggle = (index: number, day: string) => {
    setFormData(prev => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) =>
        i === index
          ? {
              ...schedule,
              days: schedule.days.includes(day)
                ? schedule.days.filter(d => d !== day)
                : [...schedule.days, day],
            }
          : schedule
      ),
    }));
  };

  const validateTimeConflicts = (schedules: ScheduleFormData['schedules']) => {
    const errors: string[] = [];
    
    // Check each schedule against others
    schedules.forEach((schedule1, index1) => {
      schedules.forEach((schedule2, index2) => {
        if (index1 !== index2) {
          // Check if schedules have any common days
          const commonDays = schedule1.days.filter(day => schedule2.days.includes(day));
          
          if (commonDays.length > 0) {
            // Convert times to minutes for comparison
            const start1 = parseInt(schedule1.startTime.split(':')[0]) * 60 + parseInt(schedule1.startTime.split(':')[1]);
            const end1 = parseInt(schedule1.endTime.split(':')[0]) * 60 + parseInt(schedule1.endTime.split(':')[1]);
            const start2 = parseInt(schedule2.startTime.split(':')[0]) * 60 + parseInt(schedule2.startTime.split(':')[1]);
            const end2 = parseInt(schedule2.endTime.split(':')[0]) * 60 + parseInt(schedule2.endTime.split(':')[1]);

            // Check for overlap
            if ((start1 < end2 && end1 > start2)) {
              errors.push(
                `Time conflict: ${schedule1.subject} (${schedule1.startTime}-${schedule1.endTime}) overlaps with ${schedule2.subject} (${schedule2.startTime}-${schedule2.endTime}) on ${commonDays.join(', ')}`
              );
            }
          }
        }
      });
    });

    return errors;
  };

  const handleDeleteRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

  const handleCopyRow = (index: number) => {
    const scheduleToCopy = formData.schedules[index];
    setFormData(prev => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        {
          ...scheduleToCopy,
          teacher: `${scheduleToCopy.teacher} (Copy)`,
        },
      ],
    }));
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      grade: schedule.grade,
      section: schedule.section,
      schedules: [{
        subject: schedule.subject,
        teacher: schedule.teacher,
        room: schedule.room,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        days: schedule.days,
      }],
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate time conflicts
    const errors = validateTimeConflicts(formData.schedules);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (editingSchedule) {
      // Update existing schedule
      setSchedulesList(prevSchedules =>
        prevSchedules.map(schedule =>
          schedule.id === editingSchedule.id
            ? {
                ...schedule,
                ...formData.schedules[0],
                grade: formData.grade,
                section: formData.section,
              }
            : schedule
        )
      );
    } else {
      // Add new schedules
      const newSchedules = formData.schedules.map(schedule => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...schedule,
        grade: formData.grade,
        section: formData.section,
      }));
      setSchedulesList(prev => [...prev, ...newSchedules]);
    }

    handleCloseModal();
  };

  const handlePreview = () => {
    const errors = validateTimeConflicts(formData.schedules);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setShowPreview(true);
  };

  const handleBackFromPreview = () => {
    setShowPreview(false);
    setValidationErrors([]);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Class Schedule</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage class schedules and timetables.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Schedule
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mt-8 flex space-x-4">
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {sections.map((section) => (
            <option key={section} value={section}>
              Section {section}
            </option>
          ))}
        </select>
      </div>

      {/* Schedule Display */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Day
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Subject
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Teacher
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Room
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Grade
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Section
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {schedulesList
                  .filter(schedule => 
                    schedule.grade === selectedGrade && 
                    schedule.section === selectedSection
                  )
                  .sort((a, b) => {
                    // Sort by day first
                    const dayOrder = days.indexOf(a.days[0]) - days.indexOf(b.days[0]);
                    if (dayOrder !== 0) return dayOrder;
                    // Then by start time
                    return a.startTime.localeCompare(b.startTime);
                  })
                  .map((schedule) => (
                    schedule.days.map(day => (
                      <tr key={`${schedule.id}-${day}`}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {day}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {schedule.startTime} - {schedule.endTime}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {schedule.subject}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {schedule.teacher}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {schedule.room}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {schedule.grade}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Section {schedule.section}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            type="button"
                            onClick={() => handleEditSchedule(schedule)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Schedule Form Modal */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6 max-h-[90vh] overflow-y-auto">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={handleCloseModal}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
                      </Dialog.Title>

                      {/* Step 1: Grade and Section Selection */}
                      {currentStep === 1 && (
                        <div className="mt-6 space-y-6">
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                                Grade
                              </label>
                              <select
                                id="grade"
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="">Select Grade</option>
                                {grades.map((grade) => (
                                  <option key={grade} value={grade}>
                                    {grade}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                                Section
                              </label>
                              <select
                                id="section"
                                value={formData.section}
                                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="">Select Section</option>
                                {sections.map((section) => (
                                  <option key={section} value={section}>
                                    Section {section}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              onClick={handleNext}
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                            >
                              Next
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Schedule Grid */}
                      {currentStep === 2 && !showPreview && (
                        <div className="mt-6 space-y-6">
                          {validationErrors.length > 0 && (
                            <div className="rounded-md bg-red-50 p-4">
                              <div className="flex">
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-red-800">Time Conflicts Detected</h3>
                                  <div className="mt-2 text-sm text-red-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                      {validationErrors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Subject
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Teacher
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Room
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Start Time
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    End Time
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Days
                                  </th>
                                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Actions</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                {formData.schedules.map((schedule, index) => (
                                  <tr key={index}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                      <select
                                        value={schedule.subject}
                                        onChange={(e) => handleScheduleChange(index, 'subject', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      >
                                        <option value="">Select Subject</option>
                                        {subjects.map((subject) => (
                                          <option key={subject} value={subject}>
                                            {subject}
                                          </option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      <input
                                        type="text"
                                        value={schedule.teacher}
                                        onChange={(e) => handleScheduleChange(index, 'teacher', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      <input
                                        type="text"
                                        value={schedule.room}
                                        onChange={(e) => handleScheduleChange(index, 'room', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      <select
                                        value={schedule.startTime}
                                        onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      >
                                        <option value="">Select Time</option>
                                        {timeSlots.map((time) => (
                                          <option key={time} value={time}>
                                            {time}
                                          </option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      <select
                                        value={schedule.endTime}
                                        onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      >
                                        <option value="">Select Time</option>
                                        {timeSlots.map((time) => (
                                          <option key={time} value={time}>
                                            {time}
                                          </option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      <div className="flex flex-wrap gap-1">
                                        {days.map((day) => (
                                          <button
                                            key={day}
                                            type="button"
                                            onClick={() => handleDayToggle(index, day)}
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                              schedule.days.includes(day)
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                          >
                                            {day.slice(0, 3)}
                                          </button>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                      <div className="flex justify-end space-x-2">
                                        <button
                                          onClick={() => handleCopyRow(index)}
                                          className="text-indigo-600 hover:text-indigo-900"
                                        >
                                          Copy
                                        </button>
                                        <button
                                          onClick={() => handleDeleteRow(index)}
                                          className="text-red-600 hover:text-red-900"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={handleAddRow}
                              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              Add Row
                            </button>
                          </div>

                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              onClick={handlePreview}
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                            >
                              Preview Schedule
                            </button>
                            <button
                              type="button"
                              onClick={handleBack}
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Preview Step */}
                      {currentStep === 2 && showPreview && (
                        <div className="mt-6 space-y-6">
                          <div className="rounded-md bg-blue-50 p-4">
                            <div className="flex">
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">Schedule Preview</h3>
                                <div className="mt-2 text-sm text-blue-700">
                                  <p>Grade: {formData.grade}</p>
                                  <p>Section: {formData.section}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Day
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Time
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Subject
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Teacher
                                  </th>
                                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Room
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                {formData.schedules.map((schedule, index) => (
                                  schedule.days.map(day => (
                                    <tr key={`${index}-${day}`}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {day}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {schedule.startTime} - {schedule.endTime}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {schedule.subject}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {schedule.teacher}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {schedule.room}
                                      </td>
                                    </tr>
                                  ))
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                            >
                              {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
                            </button>
                            <button
                              type="button"
                              onClick={handleBackFromPreview}
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              Back to Edit
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
} 