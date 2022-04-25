import axios from "axios";

const BASE_URL = "http://localhost:4000";

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

export { registerUser, loginUser, getTerms };
