import express from "express";
import {postevent , getAllevent,updateEventStatus, deleteEvent} from "../controller/eventController.js"

import {
  isAdminAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/event/addnew",isAdminAuthenticated, postevent);// isPatientAuthenticated,
 router.get("/getall", isAdminAuthenticated, getAllevent);
 router.put("/update/:id", isAdminAuthenticated, updateEventStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteEvent);

export default router;