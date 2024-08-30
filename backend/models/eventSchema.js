import mongoose from "mongoose";
// import { Mongoose } from "mongoose";
import validator from "validator";

const eventSchema = new mongoose.Schema({

  eventName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [4, "First Name Must Contain At Least 3 Characters!"],
  },
 
  // status: {
  //   type: String,
  //   default:"Upcoming",// [true, "status of event is required"],
  //   enum: ["Upcoming","current", "Past"],
  // },
  date: {
    type: String,
    required: [true, "Record Date Is Required!"],
  },
  venue: {
    type: String,
    required: [true, "venue Name Is Required!"],
  },
  hostName:{
    type: String,
    required: [true, "Host Name is required!"],
  },

  details: {
    type: String,
    required: [true, "Details Is Required!"],
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});




export const event = mongoose.model("events", eventSchema);