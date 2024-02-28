import React from 'react';
import cn from 'classnames';
import bgPng from '@site/static/img/cases/bg.png';

interface CardProps {
  img?: string;
  title?: string;
  desc?: string;
  href?: string;
}
const Card = ({ img, title, desc, href }: CardProps) => {
  return (
    <div
      className={cn(
        'h-full w-full',
        'group relative -z-0',
        'cursor-pointer overflow-hidden',
        'rounded-[8px] bg-white text-center',
        'transition-shadow hover:shadow-[0px_4px_10px_0px_rgba(184,197,246,0.4)]',
        'border-[1px] border-solid border-[#DADEE3]',
        'dark:bg-transparent'
      )}
      style={{
        background: `url('${bgPng}')`,
        backgroundPositionX: 'right',
        backgroundPositionY: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '40%'
      }}
    >
      <a href={href}>
        <img width="100%" height="auto" src={img} alt="error" />
        <div className="pl-[20px] pr-[28px]">
          <div className="mt-[24px] mb-[16px] text-left text-[20px] font-medium text-[#142641] dark:text-[#e3e3e3]">{title}</div>
          <div className="text-left">
            <p className="mb-[48px] text-base font-normal text-[#909AAA]">{desc}</p>
          </div>
        </div>
      </a>
    </div>
  );
};