import axios from 'axios';
import NProgress from 'nprogress';
import { toast } from 'react-toastify';

const http = axios.create({
  baseURL: 'http://localhost/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

http.interceptors.response.use(
  (response) => {
    const message = response.data?.message;
    if (message) {
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if (error.response.status === 422) {
      error.response.data.forEach((item) => {
        toast.error(item, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      });
    }
    if (error.response.status === 401) {
      toast.error('Oturum açmanız gerekli', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
    if (error.response.status === 403) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
    if (error.response.status === 404) {
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export default http;
