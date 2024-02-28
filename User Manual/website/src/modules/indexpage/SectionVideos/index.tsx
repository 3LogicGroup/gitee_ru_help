import React from 'react';
import Container from '../components/Container';
import VideoCard from './VideoCard';
import { videoCardDataList, moreVideoLink } from '../../../../content.indexpage';

const SectionVideos: React.FC<{ className?: string }> = ({ className, ...props }) => {
  return (
    <section className={className}>
      <h2 className="font-AlimamaShuHeiTi text-center text-4xl font-bold text-[#142641] sm:text-2xl mb-[60px]">
        代码吞噬世界 工具改变效率
      </h2>
      <Container>
        <div className="grid grid-cols-3 flex-wrap place-items-center gap-x-[60px] gap-y-[40px] xl:grid-cols-2 md:grid-cols-1">
          {videoCardDataList.map((item, index) => (
            <VideoCard key={index} {...item} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={moreVideoLink} target="_blank" className="text-[16px] text-ent-primary hover:bg-transparent hover:text-link-hover hover:underline active:underline active:bg-transparent">
            查看更多 Gitee 视频攻略
          </a>
        </div>
      </Container>
    </section>
  );
};

export { videoCardDataList };
export default SectionVideos;
