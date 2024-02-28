import { NoticesQuery, NoticeScope } from '../../../../graphql/generated';
import { TimeAgo } from '../../../Timeago';
import React from 'react';
import { Loading } from '../../../../components/Loading';
import style from './UserNotice.module.less';
import cn from 'classnames';

type TypeTabContent = {
  data: NoticesQuery | undefined;
  scope: NoticeScope;
  isFetching: boolean;
  render: boolean;
  itemClick: (scope: NoticeScope, id: string) => void;
};

const TabContent: React.FC<TypeTabContent> = React.memo(({ data, itemClick, scope, isFetching, render }) => {
  // 只渲染当前激活的 tab
  if (!render) {
    return null;
  }
  const notices = data?.current_user?.notices;
  const list = notices?.list;
  if (!list?.length) {
    return (
      <div className="gitee-header__notice__tab-content bg-slate-600 py-8 text-center leading-7">
        {isFetching ? <Loading className="text-xl leading-none text-gray-400" /> : '暂无新消息'}
      </div>
    );
  }

  const ContentTemplate = ({ item }: { item: typeof list[number] }) => {
    let name;
    let content;
    // 收窄联合类型
    if (item.__typename === 'RefererNotification') {
      content = item.message;
      name = item.namespace?.name || '';
    }
    if (item.__typename === 'InfosNotification') {
      content = item.message;
      name = item.namespace?.name || '';
    }
    if (item.__typename === 'MessagesNotification') {
      content = item.content;
      name = item.actor.nickname || item.actor.name;
    }
    return (
      <a
        onClick={() => {
          itemClick(scope, String(item.id));
        }}
        className="gitee-header__notice__item block p-3 text-gray-300 hover:bg-gray-700"
        href={'https://gitee.ru' + item.url}
        target="_blank"
        rel="noreferrer"
        key={item.id}
      >
        <div
          className={cn('line-clamp-2', style['notice-content'])}
          dangerouslySetInnerHTML={{
            __html: content || '',
          }}
        ></div>
        <div className="mt-1 flex text-gray-400">
          <div className="mr-1 flex-shrink-0">
            <TimeAgo date={item.updated_at}></TimeAgo>
          </div>
          <span className="mx-1">·</span>
          <div className="truncate">{name}</div>
        </div>
      </a>
    );
  };
  return (
    <div className="bg-slate-600 text-left">
      {list.map((item) => {
        return <ContentTemplate key={item.id} item={item} />;
      })}
    </div>
  );
});
TabContent.displayName = 'TabContent';
export { TabContent };
