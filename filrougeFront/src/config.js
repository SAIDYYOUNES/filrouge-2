import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.interceptors.request.use((req) => {
  if (!localStorage.getItem('user')) return req
  const user  =JSON.parse(localStorage.getItem('user'))
  const token = user
      req.headers.Authorization =`Bearer ${token}`;
    

    return req;
  });
  export default axios;