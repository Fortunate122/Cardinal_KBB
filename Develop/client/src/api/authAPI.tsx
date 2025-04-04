import API from "../utils/apiUtils";
import { UserLogin } from "../interfaces/UserLogin";
import { AuthResponse } from "../interfaces/AuthResponse";

export const login = async (userInfo: UserLogin): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/login", userInfo);
  return response.data;
};



// import { UserLogin } from "../interfaces/UserLogin";
// import { AuthResponse } from "../interfaces/AuthResponse";

// const login = async (userInfo: UserLogin): Promise<AuthResponse> => {
//   // TODO: make a POST request to the login route
//   const response = await axios.post<AuthResponse>("/auth/login", userInfo);
//   return response.data;
// }



// export { login };