import mongoose from "mongoose";
// import { Mongoose } from "mongoose";
import validator from "validator";

const recordSchema = new mongoose.Schema({
  admId:{
     type:String,
     required:[true,"admid is required"],
     minLength:[5,"admid must contain at least 8 characters!"],
  },
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },
  date: {
    type: String,
    required: [true, "Record Date Is Required!"],
  },
  department: {
    type: String,
    required: [true, "Department Name Is Required!"],
  },
  symptoms: {
    type: String,
    required: [true, "fill symptoms!"],
  },
  medicines: {
    type: String,
    required: [true, "fill medicines!"],
  },
  address: {
    type: String,
    required: [true, "Address Is Required!"],
  },
  hsaVisited:{
    type:Boolean,
    default:false,
  },
  // doctorId:{
  //   type:mongoose.Schema.ObjectId,
  //   required:true,
  // },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Patient Id Is Required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const medRecord = mongoose.model("medical_records", recordSchema);