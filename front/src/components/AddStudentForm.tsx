import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import {motion} from 'framer-motion';

const AddStudentForm = ({user}) => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        age: '',
        status: true,
        
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
                  image: '', 
                age: '',
                status: true,
              
            });
        } catch (error) {
            console.error('Error adding student:', error.message);
            alert('Failed to add student. Please try again.');
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const base64 = await convertToBase64(file);
          setFormData({ ...formData, image: base64 }); 
         console.log('base64:', base64);
        }
      };
    
      function convertToBase64(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      }

    return (
        <div >
            <Navigation user={user}/>
            <div

            
            className=' flex items-center justify-center flex-col min-h-screen bg-gray-800 '>
        <motion.form
        
                
initial={{ opacity: 0, }}
animate={{ opacity: 1 }}
transition={{ duration: 2.5 }}

        onSubmit={handleSubmit} className="max-w-sm mx-auto rounded-lg bg-zinc-400">
            <div className='p-4'>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Student Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter student name" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 ">Age</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter student age" required />
                </div>
                <div className="flex items-start mb-5">
                    <input id="status" type="checkbox" name="status" checked={formData.status}  onChange={handleCheckboxChange} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                    <label htmlFor="status" className="text-sm font-medium text-gray-900 ms-2 ">Active</label>
                </div>
                <div className="flex items-start mb-5">
                <input
              id="file_input"
              type="file"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
              className="w-full text-2xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
             </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </motion.form>
        </div>
        </div>
    );
};

export default AddStudentForm;
