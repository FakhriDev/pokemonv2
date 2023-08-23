'use client';
import axios from 'axios';
import { CardPokemon } from '@/app/Components/Fragments/CardPokemon';
import { Header } from '@/app/Components/Fragments/Header';

import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
const Page = ({ params }) => {
  const [pokemon, setPokemon] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((res) => {
        const results = res.data;
        setPokemon(results);
      })
      .catch((error) => {
        console.log(error);
      });
    setFavorites(JSON.parse(localStorage.getItem('favorite')) || []);
  }, []);
  const formatData = (data) => {
    let tempArray = {
      id: pokemon.id,
      spriteUrl: pokemon?.sprites?.other?.home?.front_default,
      name: pokemon?.name,
      types: [
        pokemon?.types[0]?.type?.name,
        pokemon?.types?.length > 1 ? pokemon?.types[1]?.type?.name : undefined,
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
  return (
    <>
      <Header>Pokemon</Header>
      <article className="max-w-5xl bg-slate-50 mx-auto h-auto p-2 lg:p-4 rounded-lg">
        <Link
          className="flex bg-white rounded-md shadow-md w-20 p-2 text-black "
          href="/"
        >
          <ArrowLeft size={23} />
          Back
        </Link>
        <div className="max-w-2xl z-20 mx-auto">
          <CardPokemon pokemon={pokemon} handleToFavorite={handleFavorite}>
            <CardPokemon.Details pokemon={pokemon} />
          </CardPokemon>
          <div></div>
        </div>
      </article>
    </>
  );
};
export default Page;
