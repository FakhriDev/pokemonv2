'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Header } from './Components/Fragments/Header';
import { CardPokemon } from './Components/Fragments/CardPokemon';
import { fetchPokemon } from './Services/fetchPokemon.service';
import axios from 'axios';
import Loading from './loading';
import { Dropdown } from './Components/Fragments/Dropdown';
import { fetchTypePokemon } from './Services/fetchTypePokemon.service';
import Link from 'next/link';

export default function Home() {
  //Store Data Pokemons
  const [pokemons, setPokemons] = useState([]);
  //Store Type Pokemon
  const [typeMonster, setTypeMonster] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [favorites, setFavorites] = useState([]);
  //Mounted & Set Datas API Pokemon
  useEffect(() => {
    setIsLoading(true);
    if (filteredPokemon.length === 0) {
      fetchPokemon((results) => {
        Promise.all(results).then((res) => setPokemons(res));
      });
    }

    fetchTypePokemon((results) => {
      setTypeMonster(results);
    });
    setFavorites(JSON.parse(localStorage.getItem('favorite')) || []);
    setIsLoading(false);
  }, [filteredPokemon]);

  const handleFilter = (type) => {
    const filterResult = pokemons.filter((pokemon) =>
      pokemon.types.map((type) => type.type.name).includes(type)
    );
    setPokemons(filterResult);
    setFilteredPokemon(type);
  };

  const resetFilter = () => {
    setFilteredPokemon([]);
  };

  const handleFavorite = (id) => {
    if (favorites.length !== 0) {
      if (favorites.find((item) => item.id === id)) {
        const aunth = favorites.filter((item) => item.id !== id);
        setFavorites(aunth);
        localStorage.setItem('favorite', JSON.stringify(aunth));
      } else {
        setFavorites([...favorites, { id }]);
        localStorage.setItem(
          'favorite',
          JSON.stringify([...favorites, { id }])
        );
      }
    } else {
      setFavorites([...favorites, { id }]);
      localStorage.setItem('favorite', JSON.stringify([...favorites, { id }]));
    }
  };
  const [start, setStart] = useState(20);
  const loadMore = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=25&offset=${start}`)
      .then((res) => {
        const results = res.data.results;
        const result = results.map(async (item) => {
          try {
            const temp = await axios.get(item.url);
            return temp.data;
          } catch (error) {
            throw error;
          }
        });
        Promise.all(result).then((res) => {
          setPokemons([...pokemons, ...res]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setStart(start + 20);
  };
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <article className="max-w-5xl bg-slate-50 mx-auto min-h-screen p-2 lg:p-4 rounded-lg ">
          <div className="sticky flex flex-row justify-end z-20 mb-2 gap-2">
            <div className="absolute left-0 mt-4 text-black hover:text-gray-600">
              <Link href="/favorite">MyFavorite</Link>
            </div>
            {filteredPokemon.length ? (
              <>
                <button
                  className="bg-red-200 text-red-500 rounded-md px-4 h-10"
                  onClick={resetFilter}
                >
                  Reset
                </button>
                <Dropdown
                  typeMonster={typeMonster}
                  filter={handleFilter}
                  reset={resetFilter}
                />
              </>
            ) : (
              <Dropdown
                typeMonster={typeMonster}
                filter={handleFilter}
                reset={resetFilter}
              />
            )}
          </div>
          {!isLoading ? (
            <>
              {pokemons.length ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4 z-20 mb-4">
                    {pokemons.map((pokemon) => {
                      return (
                        <CardPokemon
                          key={pokemon?.id}
                          pokemon={pokemon}
                          handleToFavorite={handleFavorite}
                          favorites={favorites}
                        />
                      );
                    })}
                  </div>
                  <div className=" text-center lg:max-w-5xl">
                    <button
                      className="button bg-slate-600 p-3 text-white rounded-md"
                      onClick={loadMore}
                    >
                      LoadMore
                    </button>
                  </div>
                  <div className="mx-auto text-center"></div>
                </>
              ) : (
                <div className="mx-auto text-center">
                  <h1 className="font-bold text-lg text-black">Not Found!</h1>
                </div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </article>
      )}
    </>
  );
}
