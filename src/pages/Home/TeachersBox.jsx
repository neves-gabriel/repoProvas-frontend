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
import { getTeachers, getCategories } from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function TeachersBox() {
  const [teachersData, setTeachersData] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  async function loadPage() {
    try {
      const { data: teacherData } = await getTeachers(auth.token);
      setTeachersData(teacherData);
      const { data: categoryData } = await getCategories(auth.token);
      setCategoriesData(categoryData.categories);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Erro, recarregue a página em alguns segundos");
    }
  }

  useEffect(() => {
    loadPage();
  }, [auth]);

  if (isLoading || teachersData === null || categoriesData === null) {
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
                  <Box flex="1" textAlign="left" key={teacher.id}>
                    {teacher.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {teacher.teachersDisciplines.map((teacherDiscipline) => (
                <AccordionPanel pb={4} key={teacherDiscipline.id}>
                  {categoriesData.map((category) => (
                    <div key={category.id}>
                      <p>{category.name}</p>
                      {teacherDiscipline.tests.map((test) =>
                        category.id === test.category.id ? (
                          <p
                            style={{
                              color: "#838383",
                              cursor: "pointer",
                            }}
                          >
                            {test.name} ({teacherDiscipline.discipline.name})
                          </p>
                        ) : null
                      )}
                    </div>
                  ))}
                </AccordionPanel>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Flex>
  );
}
