import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Flex,
  Spinner,
  Stack,
  Heading,
  Select,
  Input,
  Button,
  InputGroup,
  FormControl,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import {
  getCategories,
  getDisciplines,
  getTeachersDisciplines,
  registerTest,
} from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function AddTestBox() {
  const [categoriesData, setCategoriesData] = useState(null);
  const [disciplinesData, setDisciplinesData] = useState(null);
  const [teachersDisciplinesData, setTeachersDisciplinesData] = useState(null);

  const [categorySelected, setCategorySelected] = useState("");
  const [disciplineSelected, setDisciplineSelected] = useState("");
  const [teacherDisciplineSelected, setTeacherDisciplineSelected] =
    useState("");

  const handleSelectCategory = (event) =>
    setCategorySelected(event.target.value);
  const handleSelectDiscipline = (event) =>
    setDisciplineSelected(event.target.value);
  const handleSelectTeacherDiscipline = (event) =>
    setTeacherDisciplineSelected(event.target.value);

  const [testName, setTestName] = useState("");
  const [urlPdf, setUrlPdf] = useState("");

  const handleChangeTestName = (event) => setTestName(event.target.value);
  const handleChangeUrlPdf = (event) => setUrlPdf(event.target.value);

  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  const navigate = useNavigate();

  async function loadPage() {
    try {
      const { data: categoryData } = await getCategories(auth.token);
      setCategoriesData(categoryData.categories);
      const { data: disciplinesData } = await getDisciplines(auth.token);
      setDisciplinesData(disciplinesData.disciplines);
      const { data: teachersDisciplinesData } = await getTeachersDisciplines(
        auth.token
      );
      setTeachersDisciplinesData(teachersDisciplinesData.teachersDisciplines);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Erro, recarregue a página em alguns segundos");
    }
  }

  useEffect(() => {
    loadPage();
  }, [auth]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await registerTest(
        auth.token,
        testName,
        urlPdf,
        categorySelected,
        teacherDisciplineSelected
      );
      setIsLoading(false);
      if (result.status === 201) {
        Swal.fire({
          title: "Prova Adicionada!",
          text: "Prova adicionada com sucesso!",
          icon: "success",
        });
        navigate("/home/disciplines");
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  if (
    isLoading ||
    categoriesData === null ||
    disciplinesData === null ||
    teachersDisciplinesData === null
  ) {
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
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
          width="700px"
        >
          <Heading color="blue.400" style={{ fontSize: "25px" }}>
            Adicione uma Prova
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem" width="700px">
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Nome da Prova"
                    value={testName}
                    onChange={handleChangeTestName}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type="url"
                    placeholder="Link da prova"
                    value={urlPdf}
                    onChange={handleChangeUrlPdf}
                    required
                  />
                </InputGroup>
              </FormControl>
              <Select
                placeholder="Categorias"
                onChange={handleSelectCategory}
                required
              >
                {categoriesData.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </Select>
              <Select
                placeholder="Disciplinas"
                onChange={handleSelectDiscipline}
                required
                isDisabled={categorySelected === "" ? true : false}
              >
                {disciplinesData.map((discipline) => (
                  <option value={discipline.id}>{discipline.name}</option>
                ))}
              </Select>
              <Select
                placeholder="Pessoas Instrutoras"
                onChange={handleSelectTeacherDiscipline}
                required
                isDisabled={
                  disciplineSelected === "" || categorySelected === ""
                    ? true
                    : false
                }
              >
                {teachersDisciplinesData.map((teacherDiscipline) =>
                  teacherDiscipline.disciplineId ===
                  parseInt(disciplineSelected) ? (
                    <option
                      value={teacherDiscipline.id}
                      onClick={() =>
                        handleSelectTeacherDiscipline(teacherDiscipline.id)
                      }
                    >
                      {teacherDiscipline.teacher.name}
                    </option>
                  ) : null
                )}
              </Select>
              <Button
                borderRadius="0.375rem"
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
                isLoading={isLoading}
                loadingText="Enviando"
              >
                Enviar
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Flex>
  );
}
