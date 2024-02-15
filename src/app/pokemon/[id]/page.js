'use client';
import Header from '@/app/components/Header';
import React from 'react';
import {
  Heart,
  Heartbeat,
  Sword,
  Boot,
  ShieldCheckered,
} from '@phosphor-icons/react';
import useFetchFavoritePokemons from '@/app/features/pokemon/useFetchFavorites';
import { NotificationLove } from '@/app/components/NotificationLove';
import useFetchPokemon from '@/app/features/pokemon/useFetchPokemon';
import { LoadingPokemonList } from '@/app/components/LoadingPokemonList';
import Image from 'next/image';
export default function Page({ params }) {
  const { id: namePokemon } = params;
  const { data: pokemon, isLoading } = useFetchPokemon(namePokemon);

  const { setFavoritePokemons, favorite, notification } =
    useFetchFavoritePokemons();
  return (
    <>
      {notification[0].status && (
        <NotificationLove type={notification[0].type} />
      )}
      <Header />
      <section className="max-w-5xl bg-slate-50 mx-auto h-autorounded-lg">
        {isLoading && (
          <>
            <LoadingPokemonList />
          </>
        )}
        <div className="max-w-5xl z-20 mx-auto">
          <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <Image
                  src={pokemon?.sprites?.other?.home?.front_default}
                  width={300}
                  height={300}
                  priority={true}
                  alt="pokemon"
                  className="lg:w-1/2 w-full object-fill object-center rounded "
                />
                <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
                  <div className="flex item-center justify-between">
                    <div>
                      <h2 className="text-sm title-font text-gray-500 tracking-widest">
                        POKEMON NAME
                      </h2>
                      <h1 className="text-gray-900 text-3xl title-font font-medium mb-5">
                        {pokemon?.name}
                      </h1>
                    </div>
                    <div className="flex justify-between my-auto">
                      <div>
                        {pokemon?.types?.map((type, i) => {
                          return (
                            <label
                              className="mr-2 lg:mr-2 bg-slate-200 p-1 lg:p-2 rounded text-black"
                              key={i}
                            >
                              {type?.type?.name}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className=" mb-4 mx-auto">
                    <div className="items-center">
                      <div className="text-gray-600 ml-3">
                        <p className="mb-5">Status Monster</p>
                        <div className="flex gap-2 flex-col content-center ">
                          <div className="flex justify-between mb-3">
                            <p>
                              <Heartbeat size={30} color="red" weight="fill" />
                            </p>
                            <p className="text-center my-auto">
                              {pokemon?.stats[0]?.base_stat}
                            </p>
                          </div>
                          <div className="flex justify-between mb-3">
                            <p>
                              <Sword size={30} color="red" weight="fill" />
                            </p>
                            <p className="text-center my-auto">
                              {pokemon?.stats[1]?.base_stat}
                            </p>
                          </div>
                          <div className="flex justify-between mb-3">
                            <p>
                              <ShieldCheckered
                                size={30}
                                color="red"
                                weight="fill"
                              />
                            </p>
                            <p className="text-center my-auto">
                              {pokemon?.stats[2]?.base_stat}
                            </p>
                          </div>

                          <div className="flex justify-between mb-3">
                            <p>
                              <Boot size={30} color="red" weight="fill" />
                            </p>
                            <p className="text-center my-auto">
                              {pokemon?.stats[3]?.base_stat}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <div className="relative w-full bg-gradient-to-b from-zinc-200 backdrop-blur-2xl flex flex-col justify-between h-auto rounded-xl shadow-md transform transition duration-300 border-transparent ">
            <div className="text-center justify-center">
              <div className="text-center">
                <div className="w-full lg:h-[200px] bg-slate-300 py-3 mb-2 lg:mb-3 rounded-t-xl">
                  <Image
                    src={pokemon?.sprites?.other?.home?.front_default}
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
                        {type?.type?.name}
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
                      image: pokemon?.sprites?.other?.home?.front_default,
                      name: pokemon?.name,
                      types: pokemon?.types?.map((type) => type?.type?.name),
                    })
                  }
                >
                  {favorite.some(
                    (favPokemon) => favPokemon?.id === pokemon?.id
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
          </div> */}
        </div>
      </section>
    </>
  );
}
