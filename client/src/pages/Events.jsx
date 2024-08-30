
import React from "react";
import Hero from "../components/Hero";
//import Layout from './Layout'
import EventPage from "../components/EventPage";
import MessageForm from "../components/MessageForm";
//import IndexPage from "./IndexPage";
const Events =()=> {
  return (
    
    <>
    {/* <Layout/> */}
    <Hero
      title={"Our Events"}
      imageUrl={"/about.png"}
    />
    <EventPage />
    {/* <IndexPage /> */}
    <MessageForm/>
  </>
  )
}
export default Events;
