import axios from 'axios';
import { axiosInstance } from '../libs/fetchPath';
export const fetchPokemon = (callback) => {
  axiosInstance
    .get('/pokemon?limit=10&offset=0')
    .then((res) => {
      const datas = res.data.results.map(async (item) => {
        try {
          const temp = await axios.get(item.url);
          return temp.data;
        } catch (error) {
          throw error;
        }
      });
      callback(datas);
    })
    .catch((error) => {
      console.log(error);
    });
};
