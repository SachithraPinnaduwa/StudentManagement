
import { Admin } from './models/admin.js';


export const addAdmin = async (name, picture,password) => {
  const admin = new Admin({ name,picture, password });
  await admin.save();
  return admin;
};


export const getAllAdmins = async () => {
  return await Admin.find({});
};


export const deleteAdmin = async (name) => {
  const result = await Admin.deleteOne({ name });
  return result;
};


export const getAdmin = async (name, password) => {
  const admin = await Admin.findOne({ name });
  if (!admin) {
    return null;
  }
  if (admin.password === password) {
    return admin;
  }
};
