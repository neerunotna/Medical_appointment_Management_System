import express from "express";
import {postrecord , getAllrecord,updateRecordStatus, deleterecord} from "../controller/recordController.js"

import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post",isPatientAuthenticated, postrecord);// isPatientAuthenticated,
 router.get("/getall", isAdminAuthenticated, getAllrecord);
 router.put("/update/:id", isAdminAuthenticated, updateRecordStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleterecord);

export default router;