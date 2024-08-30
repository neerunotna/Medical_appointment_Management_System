import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const MedrecordForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [admId, setadmId] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] =useState("");
  const [medicines, setMedicines] =useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Medical Cell");
//   const [doctorFirstName, setDoctorFirstName] = useState("");
//   const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Student",
    "Faculty",
    
  ];

 // const [doctors, setDoctors] = useState([]);
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const { data } = await axios.get(
//         "http://localhost:4000/api/v1/user/doctors",
//         { withCredentials: true }
//       );
//       setDoctors(data.doctors);
//       console.log(data.doctors);
//     };
//     fetchDoctors();
//   }, []);
  const handleRecord = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/record/post",
        {
          admId,
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          symptoms,
          medicines,
          date: appointmentDate,
          department,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setadmId("");
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setDob(""),
        setGender(""),
        setSymptoms(""),
        setMedicines(""),
        setAppointmentDate(""),
        setDepartment(""),
        // setDoctorFirstName(""),
        // setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Add medical data</h2>
        <form onSubmit={handleRecord}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
          <input
              type="text"
              placeholder="Symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <input
              type="text"
              placeholder="Medicines"
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
            />
          </div>
          <div>
           
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
             <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
           
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
             <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                // setDoctorFirstName("");
                // setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
          <input
              type="text"
              placeholder="adm Id"
              value={admId}
              onChange={(e) => setadmId(e.target.value)}
            />
            </div>
            {/* <select
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department}
            > */}
              {/* <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                //   <option
                //     value={`${doctor.firstName} ${doctor.lastName}`}
                //     key={index}
                //   >
                //     {doctor.firstName} {doctor.lastName}
                //   </option>
                ))} */}
            {/* </select> */}
          
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>Add Data</button>
        </form>
      </div>
    </>
  );
};

export default MedrecordForm;