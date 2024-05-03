import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/150'
  },
  age: {
    type: Number,
    required: true,
  },
 status: {
    type: Boolean,
    required: true,
    default: true,
  },
  
});

const Student = mongoose.model('Student', studentSchema);


export { Student };
