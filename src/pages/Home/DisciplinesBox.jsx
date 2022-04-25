import React, { useState, useEffect } from "react";
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
import { getTerms } from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function DisciplinesBox() {
  const [termsData, setTermsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  async function loadPage() {
    try {
      const { data } = await getTerms(auth.token);
      setTermsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Erro, recarregue a página em alguns segundos");
    }
    console.log(termsData);
  }

  useEffect(() => {
    loadPage();
  }, [auth]);

  if (isLoading || termsData === null) {
    return <h2>Carregando...</h2>;
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      minHeight="calc(100vh - 285px)"
      backgroundColor="gray.100"
      alignItems="center"
    >
      <Flex width="700px" marginTop="30px">
        <Accordion defaultIndex={[0]} allowMultiple width="700px">
          {termsData.map((term) => (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {term.id}° Período
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {term.disciplines.map((discipline) => (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {discipline.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    {discipline.teachersDisciplines.map(
                      (teachersDiscipline) => (
                        <AccordionPanel pb={4}>
                          {teachersDiscipline.tests.map((test) => (
                            <div cursor="pointer">
                              <p>{test.name}</p>
                              <p style={{ color: "#838383" }}>
                                {teachersDiscipline.teacher.name}
                              </p>
                            </div>
                          ))}
                        </AccordionPanel>
                      )
                    )}
                  </AccordionItem>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Flex>
  );
}
