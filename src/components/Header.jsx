import * as React from "react";
import { Heading, Flex } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      padding={6}
      backgroundColor="gray.100"
    >
      <Flex align="center" mr={5}>
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"tighter"}
          fontSize="50px"
          color="blue.600"
        >
          📚 <span style={{ color: "#000000" }}>Repo</span>
          <span style={{ color: "#3182ce" }}>Provas</span>
        </Heading>
      </Flex>
    </Flex>
  );
}
