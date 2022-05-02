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
import { getCategories, getTerms } from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function DisciplinesBox() {
  const [termsData, setTermsData] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  async function loadPage() {
    try {
      const { data: termData } = await getTerms(auth.token);
      setTermsData(termData);
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

  if (isLoading || termsData === null || categoriesData === null) {
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
                  <Box flex="1" textAlign="left" key={term.id}>
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
                        <Box flex="1" textAlign="left" key={discipline.id}>
                          {discipline.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    {discipline.teachersDisciplines.map(
                      (teachersDiscipline) => (
                        <AccordionPanel pb={4} key={teachersDiscipline.id}>
                          {categoriesData.map((category) => (
                            <div key={category.id}>
                              <p>{category.name}</p>
                              {teachersDiscipline.tests.map((test) =>
                                category.id === test.category.id ? (
                                  <p
                                    style={{
                                      color: "#838383",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {test.name} (
                                    {teachersDiscipline.teacher.name})
                                  </p>
                                ) : null
                              )}
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
