import axios from 'axios';

export const uploadImageApi = (data: FormData) => {
  return axios.post(`${process.env.API_URL}api/upload/image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
