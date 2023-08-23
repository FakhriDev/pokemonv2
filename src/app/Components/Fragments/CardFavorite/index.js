import React from 'react';
import Image from 'next/image';
import { Label } from '../../Elements/Label';
import Link from 'next/link';
import { Heart } from '@phosphor-icons/react';
export const CardFavorite = (props) => {
  const { pokemon, handleToFavorite, id } = props;

  const checkFavorite = () => {
    let tempArray = JSON.parse(localStorage.getItem('favorite')) || [];
    let checkArray =
      tempArray.filter((item) => item.id == pokemon.id).length !== 0;
    return checkArray;
  };

  return (
    <div
      className="relative w-full flex flex-col justify-between h-auto bg-white rounded-xl shadow-md transform transition duration-300 border-transparent"
      key={id}
    >
      <div className="text-center">
        <div className="w-full lg:h-[200px] bg-slate-200 py-3 mb-2 lg:mb-3 rounded-t-xl">
          <Image
            src={pokemon?.spriteUrl}
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

      <div>
        <div className="flex justify-between pb-6 px-1 lg:px-6">
          <div>
            {/* {pokemon?.types?.map((type, i) => {
              return (
                <Label id={i} key={i}>
                  {type.type.name}
                </Label>
              );
            })} */}
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
