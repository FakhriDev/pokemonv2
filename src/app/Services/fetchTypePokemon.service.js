const { axiosInstance } = require('../libs/fetchPath');

export const fetchTypePokemon = (callback) => {
  axiosInstance.get('/type').then((res) => {
    callback(res.data.results);
  });
};
