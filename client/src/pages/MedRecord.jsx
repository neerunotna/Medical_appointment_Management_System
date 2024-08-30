import React from "react";
import Hero from "../components/Hero";
import MedrecordForm from "../components/MedrecordForm";

const MedRecord = () => {
  return (
    <>
      <Hero
        title={"Add patient data| Medmanual"}
        imageUrl={"/signin.png"}
      />
      <MedrecordForm/>
    </>
  );
};

export default MedRecord;