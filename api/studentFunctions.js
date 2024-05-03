import { Student } from './models/student.js';

export const insertStudent = async (userId, name, age, status) => {
  try {
    const student = new Student({
      id: userId, 
      name: name,
      image: null, 
      age: age, 
      status: status, 
    });
    await student.save();
    return student;
  } catch (error) {
    throw error;
  }
};

export const getAllStudents = async (userId = null) => {
  try {
    const query = userId ? { id: userId } : {};
    return await Student.find(query);
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async ( userId) => {
  try {
    const result = await Student.deleteOne({ id: userId });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (id, updatedFields) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id },
      updatedFields,
      { new: true }
    );
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};



// const updatedFields1 = {
//   name: 'New Name',
//   age: 25
// };
// await updateStudent(studentId, updatedFields1);

// // Example of updating only the status field
// const updatedFields2 = {
//   status: false
// };
// await updateStudent(studentId, updatedFields2);
