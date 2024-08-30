import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { GoCheckCircleFill } from "react-icons/go";
// import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/record/getall",
          { withCredentials: true }
        );
        setRecords(data.record);
      } catch (error) {
        setRecords([]);
        console.log("Some error occured while fetching records",error)
      }
    };
    fetchRecords();
  }, []);

  const handleUpdateStatus = async (recordId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/record/update/${recordId}`,
        { status },
        { withCredentials: true }
      );
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record._id === recordId
            ? { ...record, status }
            : record
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
               Admin
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Records</p>
            <h3>{records.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Med Team</p>
            <h3>3</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Medical Record</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Medicines</th>
                <th>Role</th>
                <th>Admnid</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {records && records.length > 0
                ? records.map((record) => (
                    <tr key={record._id}>
                      <td>{`${record.firstName} ${record.lastName}`}</td>
                      <td>{record.date.substring(0, 16)}</td>
                      {/* <td>{`${app.doctor.firstName} ${appointment.doctor.lastName}`}</td> */}
                      <td>{record.symptoms}</td>
                      <td>{record.medicines}</td>
                      <td>{record.department}</td>
                      {/* <td>
                        <select
                          className={
                            record.status === "Pending"
                              ? "value-pending"
                              : record.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={record.status}
                          onChange={(e) =>
                            handleUpdateStatus(record._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td> */}
                      {/* <td>{record.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td> */}
                      <td>{record.admId}</td>
                      <td>{record.phone}</td>
                    </tr>
                  ))
                : "No Record Found!"}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
