import { omit } from 'lodash';
import { ButtonHTMLAttributes } from 'react';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'modal' | 'pagination';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonType;
}

const buttonClasses: Record<ButtonType, Array<string>> = {
  primary: [
    'text-[white]',
    'border-transparent',
    'border',
    'rounded-[100px]',
    'bg-primary1',
    'flex',
    'items-center',
    'justify-center',
    'h-[26px]',
    'w-[124px]',
    'justify-center',
    'font-semibold',
    'text-[12px]',
    'transition-opacity',
    'hover:opacity-70',
    'active:opacity-80',
    'disabled:bg-disabled1',
    'disabled:text-text3',
    'disabled:hover:opacity-100',
  ],
  secondary: [
    'text-primary1',
    'border-primary1',
    'border',
    'rounded-[100px]',
    'bg-[#fff]',
    'flex',
    'items-center',
    'justify-center',
    'h-[26px]',
    'w-[124px]',
    'justify-center',
    'font-semibold',
    'text-[12px]',
    'transition-opacity',
    'hover:bg-[#f5f5f5]',
    'active:opacity-80',
    'disabled:bg-disabled1',
    'disabled:text-text3',
    'disabled:hover:opacity-100',
  ],
  pagination: [
    'text-text1',
    'bg-bg1',
    'rounded-[8px]',
    'flex',
    'items-center',
    'justify-center',
    'h-[28px]',
    'justify-center',
    'font-inter',
    'font-semibold',
    'text-[12px]',
    'transition-opacity',
    'hover:bg-hover1',
    'disabled:text-text3',
    'disabled:hover:bg-bg1',
  ],
  modal: [
    'bg-primary1',
    'text-text1',
    'rounded-[8px]',
    'py-[12px]',
    'px-[16px]',
    'flex',
    'justify-center',
    'font-extrabold',
    'text',
    'leading-[100%]',
    'hover:opacity-80',
    'active:opacity-60',
    'disabled:bg-bg8',
    'disabled:text-text3',
  ],
  tertiary: [
    'text-[white]',
    'border-transparent',
    'border',
    'rounded-[100px]',
    'bg-[#132348]',
    'flex',
    'items-center',
    'justify-center',
    'h-[48px]',
    'px-[56px]',
    'justify-center',
    'font-semibold',
    'text-[14px]',
    'transition-opacity',
    'hover:opacity-70',
    'active:opacity-80',
    'disabled:bg-disabled1',
    'disabled:text-text3',
    'disabled:hover:opacity-100',
  ],
};

export default function Button(props: ButtonProps) {
  return (
    <button
      {...omit(props, 'buttonType')}
      className={`${buttonClasses[props.buttonType].join(' ')} ${props.className ?? ''}`}
    >
      {props.children}
    </button>
  );
}
