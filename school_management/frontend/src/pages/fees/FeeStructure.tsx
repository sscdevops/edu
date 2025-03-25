import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface FeeComponent {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annually' | 'one-time';
  isMandatory: boolean;
}

interface Discount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  applicableTo: string[];
  validFrom: string;
  validTo: string;
}

const sampleFeeComponents: FeeComponent[] = [
  {
    id: '1',
    name: 'Tuition Fee',
    amount: 5000,
    frequency: 'monthly',
    isMandatory: true,
  },
  {
    id: '2',
    name: 'Transportation',
    amount: 2000,
    frequency: 'monthly',
    isMandatory: false,
  },
  {
    id: '3',
    name: 'Annual Registration',
    amount: 5000,
    frequency: 'one-time',
    isMandatory: true,
  },
];

const sampleDiscounts: Discount[] = [
  {
    id: '1',
    name: 'Early Bird Discount',
    type: 'percentage',
    value: 10,
    applicableTo: ['Tuition Fee'],
    validFrom: '2024-01-01',
    validTo: '2024-03-31',
  },
  {
    id: '2',
    name: 'Sibling Discount',
    type: 'percentage',
    value: 5,
    applicableTo: ['Tuition Fee', 'Transportation'],
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
  },
];

export default function FeeStructure() {
  const [feeComponents, setFeeComponents] = useState<FeeComponent[]>(sampleFeeComponents);
  const [discounts, setDiscounts] = useState<Discount[]>(sampleDiscounts);
  const [showAddFee, setShowAddFee] = useState(false);
  const [showAddDiscount, setShowAddDiscount] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Fee Structure</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage fee components and discounts for your school.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
          <button
            type="button"
            onClick={() => setShowAddFee(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Fee Component
          </button>
          <button
            type="button"
            onClick={() => setShowAddDiscount(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Discount
          </button>
        </div>
      </div>

      {/* Fee Components */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Fee Components</h2>
        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Frequency
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Mandatory
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {feeComponents.map((component) => (
                <tr key={component.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {component.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    ₹{component.amount.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {component.frequency.charAt(0).toUpperCase() + component.frequency.slice(1)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {component.isMandatory ? 'Yes' : 'No'}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discounts */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Discounts</h2>
        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Value
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Valid Period
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {discounts.map((discount) => (
                <tr key={discount.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {discount.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {discount.type.charAt(0).toUpperCase() + discount.type.slice(1)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {discount.type === 'percentage' ? `${discount.value}%` : `₹${discount.value.toLocaleString()}`}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(discount.validFrom).toLocaleDateString()} - {new Date(discount.validTo).toLocaleDateString()}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
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