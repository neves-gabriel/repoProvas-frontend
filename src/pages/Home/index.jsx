import React, { useState } from "react";
import { useLocation } from "react-router";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  InputRightElement,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import DisciplinesBox from "./DisciplinesBox";
import TeachersBox from "./TeachersBox";

export default function Home() {
  let location = useLocation();

  let page;

  if (location.pathname.includes("disciplines")) {
    page = "disciplines";
  } else if (location.pathname.includes("teachers")) {
    page = "teachers";
  } else {
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
