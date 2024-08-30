import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const HandleEvents = () => {
  const [events,setEvents ] = useState([]); //setDoctors
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchEvents = async () => { //fetchDoctors
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/events/getall",///getall
          { withCredentials: true }
        );
        setEvents(data.eevent); 
        console.log(data);
        console.log("fetching events")
        console.log(data.eevents);//doctors
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchEvents();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1>Events</h1>
      <div className="banner">
        {events && events.length > 0 ? (
          events.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.eventName}`}</h4>
                <div className="details">
                  <p>
                    Date: <span>{element.date.substring(0, 10)}</span>
                  </p>
                  <p>
                    Venue: <span>{element.venue}</span>
                  </p>
                  {/* <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p> */}
                  <p>
                    Host Name: <span>{element.hostName}</span>
                  </p>
                  
                  <p>
                    Details: <span>{element.details}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Events Found!</h1>
        )}
      </div>
    </section>
  );
};

export default HandleEvents;
