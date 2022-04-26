import axios from "axios";

const BASE_URL = "https://repoprovas-backend-api.herokuapp.com/";

function createConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function registerUser(email, password) {
  const body = {
    email: email,
    password: password,
  };
  return axios.post(`${BASE_URL}/sign-up`, body);
}

function loginUser(email, password) {
  const body = {
    email: email,
    password: password,
  };
  const token = axios.post(`${BASE_URL}/sign-in`, body);
  return token;
}

async function getTerms(token) {
  const config = createConfig(token);

  const terms = await axios.get(`${BASE_URL}/terms`, config);
  return terms;
}

async function getTeachers(token) {
  const config = createConfig(token);

  const terms = await axios.get(`${BASE_URL}/teachers`, config);
  return terms;
}

export { registerUser, loginUser, getTerms, getTeachers };
