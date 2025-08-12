import Modal from 'react-modal';
import { HTMLAttributes, ReactNode } from 'react';
import IconButton from '@/components/lib/IconButton';

interface BaseModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
  isOpen: boolean;
  titleButtons?: ReactNode;
  onClose: () => void;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  className,
  titleButtons,
  subtitleClassName,
}: BaseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      className={`modal ${className} text-[#000000]`}
      overlayClassName="modal-overlay"
    >
      <IconButton
        icon={'x_icon'}
        onClick={onClose}
        className={'absolute top-[2px] right-[2px] m-4 text-[#000] bg-[#fff] hover:opacity-[0.4]'}
      />
      <div className={'w-full h-full flex flex-col'}>
        <div
          className={`flex items-center justify-between mt-[8px] flex-shrink-0 flex-grow-0 ${!subtitle && 'mb-[16px]'}`}
        >
          <div className={`text-[36px] font-semibold`}>{title}</div>
          {titleButtons || ''}
        </div>

        {(subtitle && (
          <div
            className={`flex-shrink-0 flex-grow-0 text-[14px] text-text2 mt-[8px] font-inter leading-[20px] ${subtitleClassName || ''}`}
          >
            {subtitle}
          </div>
        )) ||
          ''}
        <div className={'basis-[100%]'}>{children}</div>
      </div>
    </Modal>
  );
}
