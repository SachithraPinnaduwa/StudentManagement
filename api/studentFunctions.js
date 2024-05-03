import { Student } from './models/student.js';

export const insertStudent = async (name, age, status) => {
  try {
    const student = new Student({
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

export const getAllStudents = async () => {
  try {
    return await Student.find({});
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const result = await Student.deleteOne({ _id: studentId });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateStudentStatus = async (studentId, newStatus) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { status: newStatus },
      { new: true }
    );
    return updatedStudent;
  } catch (error) {
    throw error;
  }
};
