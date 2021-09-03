import { Menu } from '@headlessui/react';
import * as React from 'react';
import { RequestType } from '../../Dashboard';

export interface IItemProps {
  option: RequestType;
  setOption: (option: RequestType) => void;
}

export const Item: React.FunctionComponent<IItemProps> = ({option, setOption}: React.PropsWithChildren<IItemProps>) => {
  return (
    <Menu.Item>
      {({ active }: { active: boolean, disabled: boolean}) => (
        <button
          onClick={() => setOption(option)}
          className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block text-left w-full px-4 py-2 text-sm`}
        >
          {option}
        </button>
      )}
    </Menu.Item>
  );
};