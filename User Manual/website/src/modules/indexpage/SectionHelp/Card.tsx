import React from 'react';
import { helpNavDataList, type HelpNavKey } from './index';

type CardProps = typeof helpNavDataList[HelpNavKey][number];
const Card: React.FC<CardProps> = ({ icon, moreLink, question, title, ...props }) => {
  return (
    <div className="flex self-stretch min-h-[287px] w-[380px] flex-col justify-between rounded-2xl border border-solid border-[#E9F2FE] bg-gradient-to-b from-[#F8FAFE] to-[#FFFFFF] p-6 shadow-[0px_2px_40px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_4px_40px_0px_rgba(184,197,246,0.4)] sm:w-full">
      <div>
        <div className="flex items-center">
          <img width={32} height={32} src={icon} alt={title} />
          <span className="ml-2 font-medium text-[20px]"> {title}</span>
        </div>
        <ul
          role="list"
          className="mb-4 mt-6 list-outside list-disc space-y-1.5 pl-5 marker:text-base marker:text-ent-primary"
        >
          {question.map((item, index) => (
            <li key={index}>
              <a href={encodeURI(item.link)} target="_blank" className="text-base font-normal text-[#3C3F45] hover:text-link-hover hover:underline active:underline">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* tailwind@3.2.1  border 疑似存在 bug? 上边框加不出来 */}
      <div className="border-t-[#ECEDF0] pt-6" style={{ borderTop: '1px solid' }}>
        <a href={encodeURI(moreLink)} target="_blank" className="text-[16px] text-ent-primary hover:bg-transparent hover:text-link-hover hover:underline active:underline active:bg-transparent">
          查看更多
        </a>
      </div>
    </div>
  );
};

export default Card;
