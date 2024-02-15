import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/providers/AxiosInstance';

const useFetchPokemon = (name) => {
  const queryKey = ['fetch.pokemon'];
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,

    queryFn: async () => {
      try {
        const pokemonResponse = await axiosInstance.get(`/pokemon/${name}`);
        return pokemonResponse.data; // Update this based on the actual structure of the API response
      } catch (error) {
        throw new Error('Error fetching Pokemon data');
      }
    },
    onSuccess: (data) => {
      // Handle successful query, if needed
      console.log('Pokemon data fetched successfully:', data);
    },
    onError: (error) => {
      // Handle error, if needed
      console.error('Error fetching Pokemon data:', error);
    },
  });

  return { data, isLoading, isError, error, refetch };
};

export default useFetchPokemon;
