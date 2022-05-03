import axios from "axios";

const BASE_URL = "https://repoprovas-backend-api.herokuapp.com";

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

async function getCategories(token) {
  const config = createConfig(token);

  const categories = await axios.get(`${BASE_URL}/categories`, config);
  return categories;
}

async function updateViewCountTest(token, id) {
  const config = createConfig(token);

  axios.put(`${BASE_URL}/test/${id}`, config);
}

async function getDisciplines(token) {
  const config = createConfig(token);

  const disciplines = await axios.get(`${BASE_URL}/disciplines`, config);
  return disciplines;
}

async function getTeachersDisciplines(token) {
  const config = createConfig(token);

  const teachersDisciplines = await axios.get(
    `${BASE_URL}/teachersdisciplines`,
    config
  );
  return teachersDisciplines;
}

function registerTest(
  token,
  testName,
  urlPdf,
  categorySelected,
  teacherDisciplineSelected
) {
  const config = createConfig(token);
  const body = {
    name: testName,
    pdfUrl: urlPdf,
    categoryId: parseInt(categorySelected),
    teacherDisciplineId: parseInt(teacherDisciplineSelected),
  };
  return axios.post(`${BASE_URL}/test`, body, config);
}

export {
  registerUser,
  loginUser,
  getTerms,
  getTeachers,
  getCategories,
  updateViewCountTest,
  getDisciplines,
  getTeachersDisciplines,
  registerTest,
};
