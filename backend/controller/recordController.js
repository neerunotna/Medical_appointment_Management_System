import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { medRecord } from "../models/recordSchema.js";
import { User } from "../models/userSchema.js";

 export const postrecord = catchAsyncErrors(async (req, res, next) => {
  const {
    admId,
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    date,
    department,
    hasVisited,
    symptoms,
    medicines,
    address,
  } = req.body;
  if (
    
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !date ||
    !department ||
    !symptoms ||
    !medicines||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
//   const isConflict = await User.find({
//     firstName: doctor_firstName,
//     lastName: doctor_lastName,
//     role: "Doctor",
//     doctorDepartment: department,
//   });
//   if (isConflict.length === 0) {
//     return next(new ErrorHandler("Doctor not found", 404));
//   }

//   if (isConflict.length > 1) {
//     return next(
//       new ErrorHandler(
//         "Doctors Conflict! Please Contact Through Email Or Phone!",
//         400
//       )
//     );
//   }
//   const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const record = await medRecord.create({
    admId,
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    date,
    symptoms,
    medicines,
    department,
    hasVisited,
    address,
    patientId,
  });
  res.status(200).json({
    success: true,
    record,
    message: "student first aid record added!",
  });
});

export const getAllrecord = catchAsyncErrors(async (req, res, next) => {
  const record = await medRecord.find();
  res.status(200).json({
    success: true,
    record,
  });
});
 export const updateRecordStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let urecord = await medRecord.findById(id);
    if (!urecord) {
      return next(new ErrorHandler("User Record not found!", 404));
    }
    urecord = await medRecord.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Record Status Updated!",
    });
  }
);
export const deleterecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const urecord = await medRecord.findById(id);
  if (!urecord) {
    return next(new ErrorHandler("Record Not Found!", 404));
  }
  await urecord.deleteOne();
  res.status(200).json({
    success: true,
    message: "Record Deleted!",
  });
});