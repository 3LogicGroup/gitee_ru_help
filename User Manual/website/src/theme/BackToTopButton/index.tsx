import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import UdeskServer from '@site/src/components/UdeskServer';
import BackTop from './BackTop';

const BackToTopButton: React.FC = () => {
  return (
    <div className="fixed right-5 bottom-[270px] z-50 md:hidden">
      <BrowserOnly>{() => <UdeskServer className="mb-2 leading-none" />}</BrowserOnly>
      <BackTop className="static" />
    </div>
  );
};

export default BackToTopButton;
