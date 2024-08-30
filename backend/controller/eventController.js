import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { event } from "../models/eventSchema.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";
 export const postevent = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg","image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    
    eventName,
    date,
    venue,
    hostName,
    details,
  } = req.body;
  if (
    
   ! eventName ||
   ! date||
    !venue ||
    !hostName||
    !details ||
    !date ||
    !docAvatar
    
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ eventName });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.eventName}  Already Exists!`, 400)
    );
  }

 const cloudinaryResponse = await cloudinary.uploader.upload(
  docAvatar.tempFilePath
);
if (!cloudinaryResponse || cloudinaryResponse.error) {
  console.error(
    "Cloudinary Error:",
    cloudinaryResponse.error || "Unknown Cloudinary error"
  );
  return next(
    new ErrorHandler("Failed To Upload event image To Cloudinary", 500)
  );
}
  const newevent = await event.create({
    eventName,
    date,
    venue,
    hostName,
    details,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    newevent,
    message: "New event added!",
  });
});

export const getAllevent = catchAsyncErrors(async (req, res, next) => {
  const eevent = await event.find();
  res.status(200).json({
    success: true,
    eevent,
  });
});
 export const updateEventStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let eventrecord = await event.findById(id);//urecord
    if (!eventrecord) {   //urecord
      return next(new ErrorHandler("User Record not found!", 404));
    }
   eventrecord = await event.findByIdAndUpdate(id, req.body, {//urecord
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
export const deleteEvent = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const eventrecord = await event.findById(id); //urecord,medRecord 
  if (!eventrecord) {
    return next(new ErrorHandler("Record Not Found!", 404));
  }
  await eventrecord.deleteOne();
  res.status(200).json({
    success: true,
    message: "Event Deleted!",
  });
});