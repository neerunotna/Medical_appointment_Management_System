import React, {useState} from 'react'
 import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link , useNavigate } from 'react-router-dom';
//const [show, setShow] = useState(false);
 const Departments =() => {
  const departmentsArray = [
    {
      name: "Medical Cell",
      imageUrl: "/departments/firstaid.jpeg",
      to:"/medrecord",
    },
    {
      name: "Events",
      imageUrl: "/departments/eventdept.jpg",
      to:"/events",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const navigateTo = useNavigate();

  const handleClick = () => {
    navigateTo("/events");
  };

  return (
    <>
    <div className="container departments">
      <h2>Departments</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={[
          // "superLargeDesktop",
          // "desktop",
          "tablet",
          "mobile",
        ]}
      >
        {departmentsArray.map((depart, index) => {
          return (
            <div key={index} className="card">
              <div className="depart-name">{depart.name}</div>
              {/* <Link to={depart.to}> */}
              {/* <Link to={"/events"} onClick={() => setShow(!show)}> */}
              <img src={depart.imageUrl} alt="Department" onClick={() => handleClick(depart.to)}
              style={{ cursor: 'pointer' }}/>
              {/* </Link> */}
            </div>
          );
        })}
      </Carousel>
    </div>
  </>
  )
}
export default Departments;