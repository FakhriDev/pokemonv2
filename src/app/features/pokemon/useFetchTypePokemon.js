import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/providers/AxiosInstance';

const useFetchTypePokemon = () => {
  const queryKey = ['fetch.typePokemon'];
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,

    queryFn: async () => {
      const pokemonsResponse = await axiosInstance.get(`/type`);
      return pokemonsResponse.data.results;
    },
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  return { data, isLoading, isError, error, refetch };
};

export default useFetchTypePokemon;
