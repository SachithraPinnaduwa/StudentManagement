import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';

const AddStudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        status: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'age' ? parseInt(value) : value;
        setFormData({ ...formData, [name]: parsedValue });
    };

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData({ ...formData, status: checked });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('formData:', formData);
            await axios.post('http://localhost:8080/student', formData);
            alert('Student added successfully!');
            setFormData({
                name: '',
                age: '',
                status: true
            });
        } catch (error) {
            console.error('Error adding student:', error.message);
            alert('Failed to add student. Please try again.');
        }
    };

    return (
        <div >
            <Navigation />
            <div className=' flex items-center justify-center flex-col h-[90vh]'>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-zinc-400">
            <div className='p-4'>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter student name" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter student age" required />
                </div>
                <div className="flex items-start mb-5">
                    <input id="status" type="checkbox" name="status" checked={formData.status}  onChange={handleCheckboxChange} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                    <label htmlFor="status" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </form>
        </div>
        </div>
    );
};

export default AddStudentForm;
