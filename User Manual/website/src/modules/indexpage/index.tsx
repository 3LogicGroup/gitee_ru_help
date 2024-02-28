import React, { useEffect } from 'react';
import { PageMetadata, HtmlClassNameProvider } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HeaderColorful from '@site/src/components/Layout/Header/HeaderColorful';
import BackToTopButton from '@site/src/theme/BackToTopButton';
import Footer from '@theme/Footer';
import SectionHeader from './SectionHeader';
import SectionVideos from './SectionVideos';
import SectionHelp from './SectionHelp';
import SectionEvent from './SectionEvent';
import sensor from '../../utils/sensor';
import udesk from '../../utils/udesk';
import style from './index.module.less';

const IndexPage = () => {
  const isBrowser = useIsBrowser();
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as { [key: string]: string };

  useEffect(() => {
    isBrowser && udesk.init();
    isBrowser && sensor.init(customFields.SENSOR_SERVER_URL);
  }, [isBrowser, customFields]);
  return (
    <HtmlClassNameProvider className='landing-page'>
      <PageMetadata
        title={translate({
          id: 'theme.LandingPage.title',
          message: 'Gitee 帮助中心',
        })}
      />
      <div className={style['indexpage-wrapper']}>
        <HeaderColorful theme="gray" />
        <SectionHeader />
        <SectionHelp className="relative top-0 z-10 -mt-[282px]" />
        <SectionVideos className="mt-25"/>
        <SectionEvent/>
        <Footer />
        <BackToTopButton />
      </div>
    </HtmlClassNameProvider>
  );
};

export default IndexPage;
