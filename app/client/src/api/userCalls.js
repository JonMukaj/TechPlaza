import axios from "axios";
export async function loginEndpoint(email, password) {
  const request = { email, password };
  try {
    let response = await axios.post("/authorization/login", request);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signupEndpoint(email, password, confirmPassword) {
  const request = { email, password, confirmPassword };
  try {
    let response = await axios.post("/authorization/register", request);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
