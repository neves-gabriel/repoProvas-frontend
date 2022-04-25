import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import { getTeachers } from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function TeachersBox() {
  const [teachersData, setTeachersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  async function loadPage() {
    try {
      const { data } = await getTeachers(auth.token);
      setTeachersData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Erro, recarregue a página em alguns segundos");
    }
  }

  useEffect(() => {
    loadPage();
  }, [auth]);

  if (isLoading || teachersData === null) {
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
          {teachersData.map((teacher) => (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {teacher.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {teacher.teachersDisciplines.map((teacherDiscipline) => (
                <div cursor="pointer">
                  {teacherDiscipline.tests.map((test) => (
                    <AccordionPanel pb={4}>
                      <div cursor="pointer">
                        <p>{test.name}</p>
                        <p style={{ color: "#838383" }}>
                          {teacherDiscipline.discipline.name}
                        </p>
                      </div>
                    </AccordionPanel>
                  ))}
                </div>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Flex>
  );
}
