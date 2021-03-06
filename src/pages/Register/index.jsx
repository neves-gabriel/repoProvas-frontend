import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import { registerUser } from "../../services/api";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaEye);
const CFaEyeSlash = chakra(FaEyeSlash);

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangePasswordConfirmation = (event) =>
    setPasswordConfirmation(event.target.value);

  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (password !== passwordConfirmation) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "As senhas devem ser iguais",
      });
      return;
    }

    try {
      await registerUser(email, password);
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  return (
    <>
      <Header />
      <Flex
        flexDirection="column"
        width="100wh"
        height="calc(100vh - 108px)"
        backgroundColor="gray.100"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="blue.400">Cadastro</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleChangeEmail}
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      value={password}
                      onChange={handleChangePassword}
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="md"
                        onClick={handleShowClick}
                        variant="link"
                      >
                        {showPassword ? <CFaEyeSlash /> : <CFaEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme a sua senha"
                      value={passwordConfirmation}
                      onChange={handleChangePasswordConfirmation}
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="md"
                        onClick={handleShowClick}
                        variant="link"
                      >
                        {showPassword ? <CFaEyeSlash /> : <CFaEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  width="full"
                  isLoading={isLoading}
                  loadingText="Cadastrando"
                >
                  Cadastrar
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          <Link color="blue.500" onClick={() => navigate("/")}>
            J?? possuo cadastro
          </Link>
        </Box>
      </Flex>
    </>
  );
}
