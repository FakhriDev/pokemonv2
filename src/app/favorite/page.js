'use client';
import { Header } from '../Components/Fragments/Header';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { CardFavorite } from '../Components/Fragments/CardFavorite';
const Page = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorite')) || []);
  }, []);

  const formatData = (data) => {
    let hit = pokemons.find((pokemon) => pokemon.id === data);
    let tempArray = {
      id: hit?.id,
      spriteUrl: hit?.sprites?.other?.home?.front_default,
      name: hit?.name,
      types: [
        hit?.types[0]?.type?.name,
        hit?.types?.length > 1 ? hit?.types[1]?.type?.name : undefined,
      ],
    };
    return tempArray;
  };

  const handleFavorite = (id) => {
    if (favorites.length !== 0) {
      if (favorites.find((item) => item.id === id)) {
        const aunth = favorites.filter((item) => item.id !== id);
        setFavorites(aunth);
        localStorage.setItem('favorite', JSON.stringify(aunth));
      } else {
        setFavorites([...favorites, formatData(id)]);
        localStorage.setItem(
          'favorite',
          JSON.stringify([...favorites, formatData(id)])
        );
      }
    } else {
      setFavorites([...favorites, formatData(id)]);
      localStorage.setItem(
        'favorite',
        JSON.stringify([...favorites, formatData(id)])
      );
    }
  };
  console.log(favorites);
  return (
    <>
      <Header />
      <article className="max-w-5xl bg-slate-50 mx-auto min-h-screen p-2 lg:p-4 rounded-lg">
        <Link
          className="flex bg-white rounded-md shadow-md w-20 p-2 text-black "
          href="/"
        >
          <ArrowLeft size={23} />
          Back
        </Link>
        <div className="mx-auto text-center mb-4">
          <h1 className="font-bold text-2xl text-black">MyFavorite</h1>
        </div>

        {favorites.length ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4 z-20 mb-4">
              {favorites.map((pokemon) => {
                return (
                  <CardFavorite
                    key={pokemon?.id}
                    pokemon={pokemon}
                    handleToFavorite={handleFavorite}
                    favorites={favorites}
                  />
                );
              })}
              {/* {favorites.map((item) => {
                const pokemon = pokemons?.find(
                  (pokemon) => pokemon?.id === item?.id
                );
                return (
                  <CardPokemon
                    key={item.id}
                    pokemon={pokemon}
                    handleToFavorite={handleFavorite}
                    favorites={favorites}
                  />
                );
              })} */}
            </div>
          </>
        ) : (
          <div className="mx-auto mt-10 text-center">
            <h1 className="font-bold text-lg text-black">
              Not Found!, Please Add Your Favorite Pokemons
            </h1>
          </div>
        )}
      </article>
    </>
  );
};
export default Page;
