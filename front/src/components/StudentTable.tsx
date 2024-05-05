import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [editingStatus, setEditingStatus] = useState(false);
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/student');
            console.log('Students:', response.data);
            setStudents(response.data);
        } catch (error) {
            console.error('Failed to fetch students:', error.message);
        }
    };
    useEffect(() => {
       
        fetchStudents();
    }, []);

    const handleEdit = (studentId, status) => {
        setEditingStudentId(studentId);
        setEditingStatus(status);
    };

    const handleStatusChange = async () => {
        try {
            await axios.put(`http://localhost:8080/student/${editingStudentId}`, { status: editingStatus });
            // Refresh students after status update
            const response = await axios.get('http://localhost:8080/student');
            setStudents(response.data);
            // Reset editing state
            setEditingStudentId(null);
            setEditingStatus(false);
            fetchStudents();
        } catch (error) {
            console.error('Failed to update student status:', error.message);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/student/${id}`);
            // Refresh students after deletion
            fetchStudents();
        } catch (error) {
            console.error('Failed to delete student:', error.message);
        }
    };

    return (
        <div>
            <Navigation />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  m-10">
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Profile Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Age
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4">
                                <img src={student.image} alt={student.name} className="w-12 h-12 rounded-full" />
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {student.name}
                            </td>
                            <td className="px-6 py-4">
                                {student.age}
                            </td>
                            <td className="px-6 py-4">
                                {editingStudentId === student._id ? (
                                    <select
                                        value={editingStatus}
                                        onChange={(e) => setEditingStatus(e.target.value === 'true')}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>
                                    </select>
                                ) : (
                                    student.status ? 'Active' : 'Inactive'
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editingStudentId === student._id ? (
                                    <button onClick={handleStatusChange} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Save
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(student._id, student.status)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Edit
                                    </button>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                    <button onClick={() => deleteStudent(student._id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                        Delete
                                    </button>
                                </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default StudentTable;
