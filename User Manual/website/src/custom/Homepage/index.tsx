import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import chunk from 'lodash/chunk';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import { CardItemType, LinkItemType, HotTopicType, HomePageDataType } from './type';
import { Center } from '@site/src/components/Layout';
import Icon from '@site/src/components/Misc/Icon';

import style from './index.module.css';

function DocLink(props: LinkItemType) {
  const { label, href } = props;
  return (
    <div className={'flex items-center mb-2'}>
      <span className={'w-1 h-1 bg-black rounded mr-1 dark:bg-light'} />
      <Link className={'text-normal text-sm w-80 truncate dark:text-dark'} href={href}>
        {label}
      </Link>
    </div>
  );
}

function ContentCard(props: { card: CardItemType }) {
  const { card } = props;
  return (
    <div
      className={clsx(
        'border rounded border-solid border-light  bg-white w-[360px]  px-6 py-4',
        'sm:w-full',
        'dark:bg-dark dark:border-dark',
      )}
    >
      <div className={'flex justify-between'}>
        <h2 className="text-base justify-between dark:text-dark">{card.cardTitle}</h2>
        {card.cardAllHref && (
          <Link className={'text-sm'} href={card.cardAllHref}>
            查看全部
          </Link>
        )}
      </div>
      <div>
        {card.cardLinks.map((link) => {
          return <DocLink key={link.label} label={link.label} href={link.href} />;
        })}
      </div>
    </div>
  );
}

function HotTopics(props: { data: HotTopicType }) {
  const { data } = props;
  const { questions = [], topicCards = [] } = data || {};

  const [showIndex, setShowIndex] = useState(0);
  const chunks = chunk(questions, 6);
  const showChunk = chunks[showIndex];

  const handleMore = () => {
    const len = chunks.length;
    if (showIndex >= len - 1) {
      setShowIndex(0);
    } else {
      setShowIndex((pre) => pre + 1);
    }
  };

  return (
    <>
      <div className={clsx('pt-10 mb-10')}>
        <div className={'flex items-center mb-6'}>
          <h2 className="text-base justify-between mr-4 mb-0">热门问题</h2>
          {chunks.length > 1 && (
            <span className={'text-[#5C7B8B] text-sm cursor-pointer select-none'} onClick={handleMore}>
              <Icon className="mr-1" gitee={'reload'} />
              换一换
            </span>
          )}
        </div>
        <div className={clsx('grid grid-cols-3 gap-x-6 gap-y-2', 'md:grid-cols-1')}>
          {showChunk.map((questions) => {
            return <DocLink key={questions.label} label={questions.label} href={questions.href} />;
          })}
        </div>
      </div>
      <div className={clsx('grid grid-cols-3 gap-x-6 gap-y-6 mb-10', 'lg:grid-cols-2', 'md:grid-cols-1')}>
        {topicCards.map((card) => {
          return <ContentCard key={card.cardTitle} card={card} />;
        })}
      </div>
    </>
  );
}

function GroupTopic(props: { title: string; cards: CardItemType[] }) {
  const { title, cards } = props;
  return (
    <div className="mb-10">
      <div className="flex mb-6">
        <Icon gitee="nav-document" className="text-muted text-2xl mr-2" />
        <h2 className="mb-0">{title}</h2>
      </div>
      <div className={clsx('grid grid-cols-3 gap-x-6 gap-y-6', 'lg:grid-cols-2', 'md:grid-cols-1')}>
        {cards.map((card) => {
          return <ContentCard key={card.cardTitle} card={card} />;
        })}
      </div>
    </div>
  );
}

export function HomepageHeader() {
  const ctx = useDocusaurusContext();
  const { siteConfig } = ctx;

  return (
    <header className={clsx(style.header, 'w-full h-44 bg-[#DFE4E6]')}>
      <h1 className="text--center pt-14 dark:text-normal">{siteConfig.title}</h1>
    </header>
  );
}

export function HomepageContent(props: { data: HomePageDataType }) {
  const { data } = props;
  const { hotTopics, topicGroup = [] } = data;
  return (
    <Center>
      <HotTopics data={hotTopics} />
      {topicGroup.map((group) => {
        return <GroupTopic key={group.groupTit} title={group.groupTit} cards={group.groupCards} />;
      })}
    </Center>
  );
}

export default function HomePage(props) {
  const pageData = props.pageData as HomePageDataType;
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="" wrapperClassName={'bg-[#FBFBFB] dark:bg-dark'}>
      <HomepageHeader />
      <HomepageContent data={pageData} />
    </Layout>
  );
}
