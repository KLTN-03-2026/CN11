import axios from "axios";
const instance = axios.create({
    baseURL:"http://localhost:5000",
});


instance.interceptors.request.use(function (config) {
 
    const authData = localStorage.getItem("auth");
    const token = authData ? JSON.parse(authData)?.token?.slice(1, -1) : null;
    
    if (config.headers && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
  
    return Promise.reject(error);
  });


instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;
