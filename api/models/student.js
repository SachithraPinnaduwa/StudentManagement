import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    required: false,
    default: "https://via.placeholder.com/150",
  },
  age: { type: Number, required: true },
  status: { type: Boolean, required: true, default: true },
});

const Student = mongoose.model("Student", studentSchema);

export { Student };
