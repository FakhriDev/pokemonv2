import useFetchTypePokemon from '../features/pokemon/useFetchTypePokemon';

import { Heart, HouseLine } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const Header = (props) => {
  const { filter, setFiltered } = props;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const path = usePathname();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleAddFilter = (value) => {
    if (filter === value) {
      setFiltered('');
    } else {
      setFiltered(value);
    }
  };

  const handleResetFilter = () => {
    setFiltered('');
  };
  const { data: typePokemons, isLoading: typeLoading } = useFetchTypePokemon();
  return (
    <>
      <nav className="z-10 sticky left-0 top-0 w-full  border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-6 px-4 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex justify-center font-semibold">
          <h1>POKENEXT</h1>
        </div>
      </nav>
      {/* <div className="relative max-w-7xl mx-auto px-4 py-4 flex justify-start text-sm">
        {path === '/' ? '/Home' : 'Home/Favorites'}
      </div> */}
      <div className="z-10 sticky left-0 top-14 w-full py-6 px-4 mb-10">
        <div className="max-w-7xl mx-auto flex justify-end items-center text-center gap-2">
          {path === '/' ? (
            <>
              <Link
                href={{ pathname: '/favorites' }}
                className="flex w-lg justify-center gap-x-1 rounded-md bg-red-100/50 backdrop-blur-2xl px-3 py-2 text-sm font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-100/60"
              >
                <Heart size={20} color="red" weight="fill" />
                Favorites
              </Link>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gradient-to-b from-zinc-200 backdrop-blur-2xl px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    {filter !== '' ? <>{filter}</> : 'Filter'}

                    <svg
                      className={`-mr-1 h-5 w-5 text-gray-400 transform ${
                        isDropdownOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-gradient-to-b from-zinc-200 backdrop-blur-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div
                      className="relative w-[250px] md:w-[360px] lg:w-[520px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 py-1 mb-6"
                      role="none"
                    >
                      {typePokemons.map((type, i) => {
                        return (
                          <div
                            className="relative flex gap-x-3 text-gray-700 px-4 py-2 text-sm"
                            key={i}
                          >
                            <div className="flex h-6 items-center">
                              <input
                                value={type?.name}
                                checked={filter === type?.name}
                                onChange={() => handleAddFilter(type?.name)}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label className="font-medium text-gray-900">
                                {type?.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-end mx-8 mb-4">
                      <button
                        className="text-sm bg-red-500 text-white py-2 px-3 rounded"
                        onClick={handleResetFilter}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href={{ pathname: '/' }}
              type="button"
              className="flex w-lg justify-center gap-x-1 rounded-md bg-red-100/50 backdrop-blur-2xl px-3 py-2 text-sm font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-100/60"
            >
              <HouseLine size={20} color="red" weight="fill" />
              Home
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
