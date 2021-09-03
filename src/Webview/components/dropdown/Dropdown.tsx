import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { Item } from './Item';
import { RequestType } from '../../Dashboard';

export interface IDropdownProps {
  title: RequestType;
  options: RequestType[];
  setOption: (option: RequestType) => void;
}

export const Dropdown: React.FunctionComponent<IDropdownProps> = ({title, options, setOption}: React.PropsWithChildren<IDropdownProps>) => {
  return (
    <Menu as="div" className="w-full relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          {title}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <Item key={option} option={option} setOption={setOption} />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};