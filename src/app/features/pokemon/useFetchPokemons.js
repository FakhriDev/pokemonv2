import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/providers/AxiosInstance';
import { useState } from 'react';

function useFetchPokemons(filter) {
  const [pageNumber, setPageNumber] = useState(12);
  const queryKey = ['fetch.pokemons', pageNumber, filter];

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const pokemonsResponse = await axiosInstance.get(
        filter.length > 0 ? `/type/${filter}` : `/pokemon?limit=${pageNumber}`
      );
      if (filter.length > 0) {
        const urls = pokemonsResponse.data.pokemon.map(
          (item) => item.pokemon.url
        );
        const promises = urls.map((url) => axiosInstance.get(url));

        const results = await Promise.all(promises);
        const responseData = results.map((response) => response.data);

        const limitedResponseData = responseData.slice(0, pageNumber);

        return limitedResponseData;
      }
      if (Array.isArray(pokemonsResponse.data.results)) {
        const urls = pokemonsResponse.data.results.map((item) => item.url);

        const promises = urls.map((url) => axiosInstance.get(url));

        const results = await Promise.all(promises);

        const responseData = results.map((response) => response.data);

        return responseData;
      }

      return null;
    },
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 36);
  };

  return { data, isLoading, isError, error, refetch, loadMore };
}

export default useFetchPokemons;
