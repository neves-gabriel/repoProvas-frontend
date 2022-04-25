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

export default function TeachersBox() {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="calc(100vh - 285px)"
      backgroundColor="gray.100"
      alignItems="center"
    >
      <Flex width="700px" marginTop="30px">
        <Accordion defaultIndex={[0]} allowMultiple width="700px">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  1 Período
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Meio Ambiente
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  P1<p style={{ color: "#838383" }}>Wesley</p>
                </AccordionPanel>
              </AccordionItem>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Flex>
  );
}
