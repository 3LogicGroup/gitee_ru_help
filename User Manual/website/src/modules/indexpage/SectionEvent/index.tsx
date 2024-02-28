import React from 'react';
import Container from '../components/Container';
import { eventDataList, moreActivityLink } from '../../../../content.indexpage';

const Card = ({ link, poster, desc }: typeof eventDataList[number]) => (
  <a
    href={link}
    target="_blank"
    className="block min-h-[242px] w-[275px] overflow-hidden rounded-2xl bg-white bg-center shadow-[0px_2px_40px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_4px_40px_0px_rgba(184,197,246,0.4)] sm:w-full"
  >
    <div
      className="h-[154px] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${poster})` }}
    ></div>
    <p className="mt-5 mb-0 px-4 pb-2 text-base font-normal text-[#142641]">{desc}</p>
  </a>
);
const SectionEvent: React.FC = () => {
  return (
    <section>
      <Container>
        <h2 className="mt-25 mb-10 text-center font-AlimamaShuHeiTi text-4xl">产品动态</h2>
        <div className="grid grid-cols-4 flex-wrap place-items-center gap-10 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {eventDataList.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={moreActivityLink} target="_blank" className="text-[16px] text-ent-primary hover:bg-transparent hover:text-link-hover hover:underline active:underline active:bg-transparent">查看更多产品动态</a>
        </div>
      </Container>
    </section>
  );
};

export default SectionEvent;
