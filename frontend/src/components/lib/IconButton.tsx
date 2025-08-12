import { ButtonHTMLAttributes } from 'react';
import Icon from '@/components/lib/Icon';
import { Icons } from '@/components/lib/icons';

type IconButtonSize = 'small';
type IconButtonTheme = 'default' | 'gray' | 'black';

const SIZE_MAP: Record<IconButtonSize, string> = {
  small: 'w-[32px] h-[32px] rounded-[8px]',
};

const THEME_MAP: Record<IconButtonTheme, string> = {
  default: 'bg-bg1 hover:bg-hover1',
  gray: 'bg-bg2 hover:bg-hover1',
  black: 'bg-bg6 text-text4 hover:bg-bg7',
};

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: keyof typeof Icons;
  size?: IconButtonSize;
  theme?: IconButtonTheme;
}

export default function IconButton({ icon, size, className, ...otherProps }: IconButtonProps) {
  const sizeClassName = SIZE_MAP[size ?? 'small'];
  const themeClassName = THEME_MAP[otherProps.theme ?? 'default'];
  return (
    <button
      {...otherProps}
      className={`${sizeClassName} ${themeClassName} flex items-center justify-center transition-all ${className}`}
    >
      <Icon icon={icon} />
    </button>
  );
}
