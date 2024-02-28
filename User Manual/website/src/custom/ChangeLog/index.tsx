import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory, useLocation } from '@docusaurus/router';
import ReactMarkdown from 'react-markdown';
import qs from 'query-string';
import Layout from '@theme/Layout';
import unionBy from 'lodash/unionBy';
import { Center } from '@site/src/components/Layout';
import Tags from '@site/src/components/Misc/Tags';
import { ChangeLogPageDataType, ChangelogTypes } from './type';

import style from './index.module.css';

const Header = ({ title, notice }: { title: string; notice: string }) => {
  return (
    <div className={clsx(style.header, 'h-[140px]')}>
      <Center>
        <h1 className=" pt-9 text-2xl mb-0 dark:text-normal">{title}</h1>
        <p className=" pt-1 text-base dark:text-normal">{notice}</p>
      </Center>
    </div>
  );
};

const MDContent = ({ content: fullContent }: { content: string }) => {
  const lines = fullContent.split('\n');
  const [collapse, setCollapse] = useState(true);

  const MAX_LINE = 20;
  const exceedLineMax = lines.length > MAX_LINE;

  const showPart = lines.slice(0, MAX_LINE).join('\n');
  return (
    <>
      <ReactMarkdown children={collapse ? showPart : fullContent} />
      {exceedLineMax && (
        <div
          className={'text-primary cursor-pointer'}
          onClick={() => {
            setCollapse((pre) => !pre);
          }}
        >
          {collapse ? '阅读全文' : '收起'}
        </div>
      )}
    </>
  );
};

const ChangeLogItem = ({ item, onTagClick }: { item: ChangelogTypes; onTagClick: (tag: string) => void }) => {
  return (
    <article className={clsx(style.line, 'relative flex justify-between', 'xl:flex-col')}>
      <div className={'pt-4 pb-8'}>
        <div className="sticky top-20 pr-16 pl-6">
          <div className={style.lineBox}>
            <span className={style.lineBoxInner} />
          </div>
          <h3 className="mb-2 text-lg">
            {item.version}：{item.title}
          </h3>
          <p className="mb-2 text-muted text-xs">{item.release}</p>
          <p className="mb-2">
            <Tags
              tags={item.tags}
              onClick={(e, val) => {
                onTagClick(val);
              }}
            />
          </p>
        </div>
      </div>
      <div className={clsx('w-[886px]', 'xl:w-full xl:pl-6')}>
        <div className={clsx(' py-6 px-7 bg-white  mb-6 border rounded border-light border-solid')}>
          <MDContent content={item.content} />
        </div>
      </div>
    </article>
  );
};

const Content: React.FC<{
  changelogs: ChangelogTypes[] | null;
}> = ({ changelogs }) => {
  const history = useHistory();
  const location = useLocation();
  const parsed = qs.parse(location.search);

  const yearOptions = changelogs.reduce((acc, cur) => {
    if (cur.release) {
      const year = cur.release.split('-')[0];
      // 去重
      acc = unionBy([...acc, { label: `${year}年`, value: year }], 'value');
    }
    return acc;
  }, []);

  const tagOptions = changelogs.reduce(
    (acc, cur) => {
      if (Array.isArray(cur.tags) && cur.tags.length > 0) {
        // 将 tag 转成 options
        const options = cur.tags.map((tag) => ({ label: tag, value: tag }));
        // 去重
        acc = unionBy([...acc, ...options], 'value');
      }
      return acc;
    },
    [{ label: '全部日志', value: 'all' }],
  );

  const handleSelectFilter = (v: { year?: string; tag?: string }) => {
    const url = `${location.pathname}?${qs.stringify({ ...parsed, ...v })}`;
    history.push(url);
  };

  const filterContent = useMemo(() => {
    const parsed = qs.parse(location.search) as { tag: string; year: string };

    // 过滤 year
    const filterYear = changelogs.filter((v) => {
      if (parsed.year) {
        return v.release.split('-')[0] === parsed.year;
      }
      return true;
    });

    //过滤 tag
    return filterYear.filter((v) => {
      if (parsed.tag === 'all') return true;
      if (parsed.tag) {
        return v.tags.includes(parsed.tag);
      }
      return true;
    });
  }, [location.search, changelogs]);

  return (
    <Center>
      <div className="py-7">
        {/* 筛选 */}
        <div className={'mb-2'}>
          <select
            value={parsed.year}
            className={clsx(style.select, 'bg-transparent border-none appearance-none text-black text-sm mx-4')}
            onChange={(e) => {
              handleSelectFilter({
                year: e.target.value,
              });
            }}
          >
            {yearOptions.map((op) => {
              return (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              );
            })}
          </select>
          <select
            value={parsed.tag || 'all'}
            className={clsx(style.select, 'bg-transparent border-none  appearance-none text-black text-sm mx-4')}
            onChange={(e) => {
              handleSelectFilter({
                tag: e.target.value,
              });
            }}
          >
            {tagOptions.map((op) => {
              return (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              );
            })}
          </select>
        </div>

        {/* 更新时间线 */}
        {filterContent?.map((log) => {
          return (
            <ChangeLogItem
              key={log.title + log.version}
              item={log}
              onTagClick={(v) => {
                handleSelectFilter({ tag: v });
              }}
            />
          );
        })}
      </div>
    </Center>
  );
};

export default function ChangeLog(props) {
  const pageData = props.pageData as ChangeLogPageDataType;
  const ctx = useDocusaurusContext();
  const { siteConfig } = ctx;
  return (
    <Layout title={siteConfig.title} description="" wrapperClassName={'bg-[#FBFBFB] dark:bg-dark'}>
      <Header title={pageData.title} notice={pageData.notices} />
      <Content changelogs={pageData.changelogs} />
    </Layout>
  );
}
