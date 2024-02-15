import { useEffect, useState } from 'react';

const useFetchFavoritePokemons = () => {
  const [favorite, setFavorite] = useState([]);
  const [notification, setNotification] = useState([
    { type: 'add', status: false },
  ]);

  useEffect(() => {
    setFavorite(JSON.parse(localStorage.getItem('favorite')) || []);
  }, []);

  const setFavoritePokemons = (pokemon) => {
    const isFavorite = !favorite.some(
      (favPokemon) => favPokemon?.id === pokemon.id
    );
    const notificationType = isFavorite ? 'add' : 'remove';

    setNotification([{ type: notificationType, status: true }]);

    const updatedFavorites = isFavorite
      ? [...favorite, pokemon]
      : favorite.filter((item) => item?.id !== pokemon.id);

    localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
    setFavorite(updatedFavorites);

    setTimeout(() => {
      setNotification([{ type: 'add', status: false }]);
    }, 1000);
  };

  return {
    setFavoritePokemons,
    favorite,
    notification,
  };
};

export default useFetchFavoritePokemons;
