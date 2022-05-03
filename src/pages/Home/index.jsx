import React, { useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import DisciplinesBox from "./DisciplinesBox";
import TeachersBox from "./TeachersBox";
import AddTestBox from "./AddTestBox";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Home() {
  const [search, setSearch] = useState("");

  const { auth } = useAuth();
  let location = useLocation();
  const navigate = useNavigate();

  let page;

  if (location.pathname.includes("disciplines")) {
    page = "disciplines";
  } else if (location.pathname.includes("teachers")) {
    page = "teachers";
  } else if (location.pathname.includes("add-test")) {
    page = "add-test";
  }

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      {page === "disciplines" ? (
        <DisciplinesBox search={search} setSearch={setSearch} />
      ) : null}
      {page === "teachers" ? (
        <TeachersBox search={search} setSearch={setSearch} />
      ) : null}
      {page === "add-test" ? <AddTestBox /> : null}
    </>
  );
}
