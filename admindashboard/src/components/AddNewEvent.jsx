import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewEvent = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [eventName, setEventName] = useState("");
  const [hostName, setHostName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  
  const [details, setDetails] = useState("");
 
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

//   const departmentsArray = [
//     "Medical Cell",
//     "Events"
//   ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("eventName", eventName);
      formData.append("date", date);
      formData.append("venue", venue);
      formData.append("hostName", hostName);
      formData.append("details", details);
  
      //formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      await axios
        .post("http://localhost:4000/api/v1/events/event/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEventName("");
          setHostName("");
          setDate("");
          setVenue("");
          setDetails("")
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page">
      <section className="container add-doctor-form">
        {/* <img src="/logo.png" alt="logo" className="logo"/> */}
        <h1 className="form-title">Create NEW Event</h1>
        <form onSubmit={handleAddNewEvent}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : ""  ///docHolder.jpg
                }
                alt="Doctor Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div>
              <input
                type="text"
                placeholder="EventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Host Name"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
              />
              <input
                type="date"
                placeholder="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
             
              <input
                type={"text"}
                placeholder="FILL DETAILS"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
             
              {/* <select
                value={doctorDepartment}
                onChange={(e) => {
                  setDoctorDepartment(e.target.value);
                }}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select> */}
              <button type="submit">Add New Event</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewEvent;
