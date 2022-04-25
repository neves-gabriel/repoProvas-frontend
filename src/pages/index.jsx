import * as React from "react";
import { Route, Routes } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

export default function Pages() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home/disciplines" element={<Home />} />
        <Route path="/home/teachers" element={<Home />} />
      </Routes>
    </ChakraProvider>
  );
}
