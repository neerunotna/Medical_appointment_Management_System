import express from "express";
import {login,
  userRegister,getUserDetails, getAllDoctors,logoutuser,logoutAdmin,  addNewDoctor, addNewAdmin} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

 router.post("/student/register", userRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated,addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/doctors", getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutuser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;