import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 4:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "9:00 AM - 4:00 PM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "9:00 AM - 4:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 4:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "9:00 AM - 4:00 PM",
    },
   
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/logo.png" alt="logo" className="logo-img"/>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/medrecord"}>MedRecord</Link>
              <Link to={"/events"}>Events</Link>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>999-999-9999</span>
            </div>
            <div>
              <MdEmail />
              <span>medmanual@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>ABESIT, GZB</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;