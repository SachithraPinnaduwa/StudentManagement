
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});


const Admin = mongoose.model('Admin', adminSchema);


export { Admin };
