import React, { useState } from 'react';
import cn from 'classnames';
import Container from '../components/Container';
import Card from './Card';
import { type HelpNavKey, helpNav, helpNavDataList } from '../../../../content.indexpage';

const NavItem = ({
  name,
  icon,
  onClick,
  active,
}: {
  active: boolean;
  name: string;
  icon: JSX.Element;
  onClick: () => void;
}): JSX.Element => (
  <div
    className={cn(
      'flex h-[52px] flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-[12px] px-2.5 text-xl leading-[52px] transition duration-300 sm:text-base',
      [active ? 'bg-[#F2F5FD] text-ent-primary' : 'text-[#3C3F45]'],
    )}
    onClick={onClick}
  >
    <span
      className={cn(
        'relative inline-block h-7 w-7 rounded-lg border border-solid border-[#E9F2FE] text-base transition duration-300',
        {
          'bg-ent-primary text-white': active,
          'text-[#2C7EF8]': !active,
        },
      )}
    >
      <span className="absolute top-[3px] left-[5px] h-full">{icon}</span>
    </span>
    <span className="ml-2 font-medium">{name}</span>
  </div>
);
const SectionHelp: React.FC<{ className?: string }> = ({ className }) => {
  const [activeNav, setActiveNav] = useState<HelpNavKey>('ent');

  return (
    <section className={className}>
      <Container className="px-3">
        {/* <h2 className="mt-25 mb-10 text-center font-AlimamaShuHeiTi text-4xl">产品文档</h2> */}
        <div>
          <div className="mx-auto flex h-[68px] w-[512px] mt-10 justify-evenly space-x-10 rounded-2xl px-6 py-2 text-center bg-white shadow-[0px_2px_40px_0px_rgba(0,0,0,0.06)] sm:w-full sm:space-x-3">
            {helpNav.map((item, index) => (
              <NavItem
                active={activeNav === item.key}
                key={index}
                {...item}
                onClick={() => {
                  setActiveNav(item.key);
                }}
              />
            ))}
          </div>
          <div className="mt-15 grid grid-cols-3 flex-wrap place-items-center gap-10 lg:grid-cols-2 sm:grid-cols-1">
            {helpNavDataList[activeNav].map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export { helpNavDataList, type HelpNavKey };
export default SectionHelp;
