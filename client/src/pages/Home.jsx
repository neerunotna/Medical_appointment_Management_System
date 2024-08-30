import React from 'react'
import Hero from "../components/Hero";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
const Home =() => {
  return (
    <>
      <Hero title={
          "The key to healthy life is having a healthy mind.. "
        }
        imageUrl={"/herologo.png"}/>
      <Departments />
      {/* <MessageForm /> */}
    </>
  )
}
export default Home;