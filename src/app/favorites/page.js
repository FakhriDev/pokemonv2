'use client';

import Header from '../components/Header';
import { Heart } from '@phosphor-icons/react';

import useFetchFavoritePokemons from '../features/pokemon/useFetchFavorites';

import { NotificationLove } from '../components/NotificationLove';
import Image from 'next/image';
const Page = () => {
  const { favorite, notification, setFavoritePokemons } =
    useFetchFavoritePokemons();
  const handleAddFavoritePokemons = (pokemon) => {
    setFavoritePokemons(pokemon);
  };

  return (
    <>
      {notification[0].status && (
        <NotificationLove type={notification[0].type} />
      )}
      <Header />
      <section className="max-w-7xl mx-auto w-full font-mono text-sm px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {favorite?.map((pokemon) => {
            return (
              <div
                className="relative w-full bg-gradient-to-b from-zinc-200 backdrop-blur-2xl flex flex-col justify-between h-auto rounded-xl shadow-md transform transition duration-300 border-transparent"
                key={pokemon?.id}
              >
                <div className="text-center justify-center">
                  <div className="text-center">
                    <div className="w-full lg:h-[200px] bg-slate-300 py-3 mb-2 lg:mb-3 rounded-t-xl">
                      <Image
                        src={pokemon?.image}
                        className="flex mx-auto my-auto object-contain"
                        width={140}
                        height={140}
                        priority={true}
                        alt="pokemon"
                      />
                    </div>
                    <h1 className="font-bold text-xl lg:text-2xl text-black">
                      {pokemon?.name}
                    </h1>
                    <h2 className="font-semibold text-sm lg:text-md mb-1 lg:mb-3">
                      {pokemon?.id}
                    </h2>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between pb-6 px-1 lg:px-6">
                    <div>
                      {pokemon?.types?.map((type, i) => {
                        return (
                          <label
                            className="mr-2 lg:mr-2 bg-slate-200 p-1 lg:p-2 rounded text-black"
                            key={i}
                          >
                            {type}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="absolute top-2 lg:top-6 right-2 lg:right-6">
                    <button
                      className="relative w-34 h-34 p-1 bg-white hover:shadow-md rounded-full has-tooltip"
                      onClick={() =>
                        handleAddFavoritePokemons({
                          id: pokemon?.id,
                        })
                      }
                    >
                      {favorite.some(
                        (favPokemon) => favPokemon?.id === pokemon.id
                      ) ? (
                        <>
                          <span className="tooltip rounded shadow-lg p-2 bg-gradient-to-t from-zinc-100 backdrop-blur-2xl text-red-500 -mt-14 -ml-10 z-50">
                            remove to Favorite
                          </span>
                          <Heart size={28} color="red" weight="fill" />
                        </>
                      ) : (
                        <>
                          <span className="tooltip rounded shadow-lg p-2 bg-gradient-to-t from-zinc-100 backdrop-blur-2xl text-red-500 -mt-14 -ml-10 z-50">
                            add to Favorite
                          </span>
                          <Heart size={28} color="red" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Page;
