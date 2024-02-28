import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { Button, Modal } from 'gitee-ui';
import { IconPlayCircle } from '@gitee/icons-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { videoCardDataList } from './index';
import devopsAniJSON from './lottie-player-devops';

const VideoCard: React.FC<typeof videoCardDataList[number]> = ({ desc, img, title, videoSrc, ...props }) => {
  const enabledEntAnimation = 'enabledEntAnimation' in props && props.enabledEntAnimation;
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>();
  return (
    <div
      className={cn(
        'group relative -z-0 w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-6',
        'text-center transition-shadow',
        'shadow-[0px_2px_40px_0px_rgba(0,0,0,0.06)]',
        'hover:shadow-[0px_8px_40px_0px_rgba(184,197,246,0.4)]',
      )}
    >
      <div
        onClick={() => {
          setPlaying(true);
          videoRef.current?.play();
        }}
      >
        {enabledEntAnimation && (
          <Player
            className="absolute bottom-0 right-0 -z-10 translate-x-11 translate-y-10 -rotate-[30deg]"
            autoplay
            loop
            speed={0.8}
            src={devopsAniJSON}
            style={{ height: '240px', width: '240px' }}
          ></Player>
        )}
        <div className="w-full overflow-hidden rounded-2xl">
          <img
            src={img}
            width="100%"
            alt={title}
            className="transition-transform duration-300 group-hover:scale-125"
          />
        </div>

        <div className="mt-4 mb-2 text-left text-xl font-medium text-[#142641]">{title}</div>
        {/* 添加背景动画 */}
        <div className="text-left">
          <p className="mb-[24px] text-base font-normal text-[#3C3F45]">{desc}</p>
          <Button
            type="text"
            className="flex items-center pl-0 text-[16px] text-ent-primary hover:bg-transparent hover:text-link-hover hover:underline active:underline active:bg-transparent"
          >
            <IconPlayCircle className="mt-px" />
            <span className="ml-1.5">播放视频</span>
          </Button>
        </div>
      </div>
      <Modal
        title={title}
        style={{ top: 150 }}
        visible={playing}
        forceRender
        bodyStyle={{ padding: 0, fontSize: 0 }}
        footer={null}
        className="bg-transparent xl:w-full xl:max-w-full md:top-1/4 >xl:w-[800px]"
        onCancel={() => {
          setPlaying(false);
          videoRef.current?.pause();
        }}
      >
        <video ref={videoRef} src={videoSrc} className="w-full" controls loop />
      </Modal>
    </div>
  );
};

export default VideoCard;
