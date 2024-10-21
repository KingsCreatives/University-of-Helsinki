import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.post(baseUrl, newObject, config);
  return req.data;
};

const update = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.put(`${baseUrl}/${id}`, updatedObject, config);
  return req.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.delete(`${baseUrl}/${id}`, config);
  console.log(req, config);
  return req.data;
};

export default { getAll, create, setToken, update, deleteBlog };
