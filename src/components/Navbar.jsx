import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Heading,
  Flex,
  Divider,
  chakra,
  Spacer,
  Input,
  Button,
} from "@chakra-ui/react";
import { GrLogout } from "react-icons/gr";
import useAuth from "../hooks/useAuth";

const CGrLogout = chakra(GrLogout);

export default function Navbar() {
  const [search, setSearch] = useState("");

  const { logout } = useAuth();

  const handleChangeSearch = (event) => setSearch(event.target.value);

  const navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  let page;

  if (location.pathname.includes("disciplines")) {
    page = "disciplines";
  } else if (location.pathname.includes("teachers")) {
    page = "teachers";
  } else {
    navigate("/");
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      backgroundColor="gray.100"
    >
      <Flex width="100vw" align="center" paddingTop="30px">
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"tighter"}
          fontSize="40px"
          color="blue.600"
          marginLeft="20px"
          cursor="pointer"
          onClick={() => navigate("/home/disciplines")}
        >
          📚 <span style={{ color: "#000000" }}>Repo</span>
          <span style={{ color: "#3182ce" }}>Provas</span>
        </Heading>
        <Spacer />
        <CGrLogout
          size={30}
          marginRight="20px"
          cursor="pointer"
          onClick={() => handleLogout()}
        />
      </Flex>
      <Flex align="center" marginTop="50px" marginBottom="25px">
        <Input
          type="text"
          placeholder={
            page === "disciplines"
              ? "Pesquise por disciplina"
              : page === "teachers"
              ? "Pesquise por pessoa instrutora"
              : null
          }
          value={search}
          onChange={handleChangeSearch}
          width="464px"
          backgroundColor="white"
        />
      </Flex>
      <Divider
        orientation="horizontal"
        borderWidth={1}
        borderColor="#C4C4C4"
        width="100vw"
      />
      <Flex marginTop="25px" width="700px" marginBottom="25px">
        <Button
          borderRadius="0.375rem"
          variant={page === "disciplines" ? "solid" : "outline"}
          colorScheme="blue"
          border="2px"
          borderColor="#3182ce"
          backgroundColor={page === "disciplines" ? null : "white"}
          onClick={() => navigate("/home/disciplines")}
        >
          Disciplinas
        </Button>
        <Spacer />
        <Button
          borderRadius="0.375rem"
          variant={page === "teachers" ? "solid" : "outline"}
          colorScheme="blue"
          border="2px"
          borderColor="#3182ce"
          backgroundColor={page === "teachers" ? null : "white"}
          onClick={() => navigate("/home/teachers")}
        >
          Pessoa Instrutora
        </Button>
        <Spacer />
        <Button
          borderRadius="0.375rem"
          color="#3182ce"
          variant="outline"
          border="2px"
          borderColor="#3182ce"
          backgroundColor="white"
        >
          Adicionar
        </Button>
      </Flex>
    </Flex>
  );
}
