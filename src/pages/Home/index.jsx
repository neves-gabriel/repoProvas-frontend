import React, { useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../../components/Navbar";

export default function Home() {
  let location = useLocation();

  return (
    <>
      <Navbar></Navbar>
      <p>
        oi {location.pathname}
        {location.pathname.includes("disciplines") ? "true" : "false"}
      </p>
    </>
  );
}
