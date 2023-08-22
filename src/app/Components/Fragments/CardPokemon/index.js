import React from 'react';
import Image from 'next/image';
import { Label } from '../../Elements/Label';
import Link from 'next/link';
import { Heart } from '@phosphor-icons/react';
export const CardPokemon = (props) => {
  const { pokemon, children, handleToFavorite, id } = props;

  const checkFavorite = () => {
    let tempArray = localStorage.getItem('favorite')
      ? JSON.parse(localStorage.getItem('favorite'))
      : [];
    let checkArray =
      tempArray.filter((item) => item?.id == pokemon?.id)?.length !== 0;
    return checkArray;
  };

  return (
    <div
      className="relative w-full flex flex-col justify-between h-auto bg-white rounded-xl shadow-md transform transition duration-300 border-transparent hover:scale-105"
      key={id}
    >
      <Link
        href={`/pokemon/${pokemon?.name}`}
        className="text-center justify-center"
      >
        <div className="text-center">
          <div className="w-full lg:h-[200px] bg-slate-200 py-3 mb-2 lg:mb-3 rounded-t-xl">
            <Image
              src={pokemon?.sprites?.other?.home?.front_default}
              className="flex mx-auto my-auto object-contain"
              width={140}
              height={140}
              alt="pokemon"
            />
          </div>
          <h1 className="font-bold text-xl lg:text-2xl text-black">
            {pokemon?.name}
          </h1>
          <h2 className="font-semibold text-sm lg:text-md mb-1 lg:mb-3">
            {'# '}
            {pokemon?.id}
          </h2>
        </div>
      </Link>
      <div>
        {children}
        <div className="flex justify-between pb-6 px-1 lg:px-6">
          <div>
            {pokemon?.types?.map((type, i) => {
              return (
                <Label id={i} key={i}>
                  {type.type.name}
                </Label>
              );
            })}
          </div>
        </div>
        <div className="absolute top-2 lg:top-6 right-2 lg:right-6">
          {!checkFavorite() ? (
            <button
              className="relative w-34 h-34 p-1 bg-white hover:shadow-md rounded-full"
              onClick={() => handleToFavorite(pokemon?.id)}
            >
              <Heart size={28} color="red" />
            </button>
          ) : (
            <button
              className="relative w-34 h-34 p-1 bg-white hover:shadow-md rounded-full"
              onClick={() => handleToFavorite(pokemon?.id)}
            >
              <Heart size={28} color="red" weight="fill" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Details = (props) => {
  const { pokemon } = props;
  return (
    <div className="pb-6 px-1 lg:px-6 ">
      <h1 className="flex mx-auto text-center justify-center font-bold text-lg my-4 text-black">
        Details
      </h1>
      <div className="grid grid-cols-1 md:grid-lg-cols-2 lg:grid-cols-2 pb-6 px-1 lg:px-6 gap-2">
        <div className="h-auto bg-slate-200 rounded-md">
          <ul className="text-lg font-bold mb-3 text-center p-2 text-black">
            Basic
            <li className="text-sm font-normal text-left">
              Weight : {pokemon?.weight}
            </li>
            <li className="text-sm font-normal text-left">
              Height : {pokemon?.height}
            </li>
          </ul>
        </div>
        <div className="bg-slate-200 h-auto rounded-md">
          <ul className="text-lg font-bold mb-3 text-center p-2 text-black">
            Stat
            {pokemon?.stats?.map((item, i) => {
              return (
                <li className="text-sm font-normal text-left" key={i}>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-black">
                      {item?.stat?.name}
                    </span>
                    <span className="text-sm font-medium text-black">
                      {item?.base_stat}
                    </span>
                  </div>
                  <progress
                    className="progress w-full"
                    value={item?.base_stat}
                    max="100"
                  ></progress>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

CardPokemon.Details = Details;
