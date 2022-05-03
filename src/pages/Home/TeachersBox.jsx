import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Spinner,
  Link,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  getTeachers,
  getCategories,
  updateViewCountTest,
} from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function TeachersBox({ search, setSearch }) {
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

  async function incrementViewCount(id) {
    await updateViewCountTest(auth.token, id);
  }

  if (isLoading || teachersData === null || categoriesData === null) {
    return (
      <Flex
        flexDirection="column"
        width="100wh"
        minHeight="calc(100vh - 285px)"
        backgroundColor="gray.100"
        alignItems="center"
      >
        <Flex
          width="700px"
          marginTop="30px"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      minHeight="calc(100vh - 285px)"
      backgroundColor="gray.100"
      alignItems="center"
    >
      <Flex width="700px" marginTop="30px" marginBottom="30px">
        <Accordion defaultIndex={[0]} allowMultiple width="700px">
          {teachersData.map((teacher) =>
            teacher.name.toLowerCase().includes(search.toLowerCase()) ? (
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
                            <Link
                              style={{
                                color: "#838383",
                                display: "flex",
                                justifyContent: "space-between",
                                textDecoration: "none",
                              }}
                              href={test.pdfUrl}
                              target="_blank"
                              underline="none"
                              onClick={() => incrementViewCount(test.id)}
                            >
                              {test.name} ({teacher.name})
                              <span>{test.viewCount} visualizações</span>
                            </Link>
                          ) : null
                        )}
                      </div>
                    ))}
                  </AccordionPanel>
                ))}
              </AccordionItem>
            ) : null
          )}
        </Accordion>
      </Flex>
    </Flex>
  );
}
