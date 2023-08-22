import { Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { CaretDown } from '@phosphor-icons/react';

export const Dropdown = (props) => {
  const { typeMonster, filter, reset } = props;
  return (
    <>
      <Menu>
        <Menu.Button
          className={
            'relative bg-white p-2 rounded-md mb-4 flex gap-2 text-center shadow-md '
          }
        >
          <span className="my-auto text-black">Type Monster</span>
          <CaretDown className="my-auto " size={20} />
        </Menu.Button>
        <Menu.Items
          className={
            'absolute top-12 right-0 rounded-md shadow-xl max-w-[300px] h-60 overflow-y-scroll bg-white flex flex-col'
          }
        >
          {typeMonster.map((type) => (
            <Menu.Item key={type.id} as={Fragment} className={'m-2'}>
              {({ active }) => (
                <button
                  href={type.id}
                  className={`${
                    active
                      ? 'p-1 bg-slate-500 text-white rounded-md'
                      : 'p-1 bg-white text-black rounded-md'
                  }`}
                  onClick={() => filter(type.name)}
                >
                  {type.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </>
  );
};
