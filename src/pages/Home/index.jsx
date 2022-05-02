import React, { useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import DisciplinesBox from "./DisciplinesBox";
import TeachersBox from "./TeachersBox";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Home() {
  const { auth } = useAuth();
  let location = useLocation();
  const navigate = useNavigate();

  let page;

  if (location.pathname.includes("disciplines")) {
    page = "disciplines";
  } else if (location.pathname.includes("teachers")) {
    page = "teachers";
  } else {
    navigate("/");
  }

  if (!auth) {
    navigate("/");
  }

  return (
    <>
      <Navbar />
      {page === "disciplines" ? <DisciplinesBox /> : null}
      {page === "teachers" ? <TeachersBox /> : null}
    </>
  );
}
