/* Header 中的 "用户消息通知" */
import type { ComponentProps, PropsWithChildren } from 'react';
import type { BadgeProps } from 'gitee-ui';
import type { UseQueryResult } from 'react-query';
import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { Dropdown, Tabs, Badge } from 'gitee-ui';
import Icon from '../../../Misc/Icon';
import { useDebounceFn } from 'ahooks';
import {
  useUnreadCountQuery,
  useNoticesQuery,
  useMarkNoticesMutation,
  NotificationCount,
  NoticesQuery,
  NoticeScope,
} from '../../../../graphql/generated';
import client from '../../../../graphql/client';
import { TabContent } from './TabContent';
import style from './UserNotice.module.less';

const { TabPane } = Tabs;

const defaultBadgeProps: BadgeProps = {
  overflowCount: 99,
  offset: [8, 0],
  size: 'small',
  className: style['notice-badge'],
};
type UserNoticeProps = ComponentProps<'div'> & {
  disabled?: boolean;
  iconProps?: ComponentProps<'i'>;
};

const UserNotice: React.FC<UserNoticeProps> = ({ iconProps, ...props }) => {
  const [activeKey, setActiveKey] = useState(NoticeScope.Referer);
  const [isVisibleDropdown, setVisibleDropdown] = useState(false);
  const { data: unreadData, refetch: unreadRefetch } = useUnreadCountQuery(client, undefined, {
    staleTime: 15000,
    refetchOnWindowFocus: true,
  });

  const useGetNotices = (typeName: NoticeScope, limit: number = 5) => {
    return useNoticesQuery(
      client,
      {
        typeName,
        limit,
      },
      {
        notifyOnChangeProps: ['data', 'isLoading', 'error', 'isFetching'],
        enabled: false,
      },
    );
  };
  const markNotices = useMarkNoticesMutation(client, {
    onSuccess: (res, params) => {
      // 已标记已读后继续获取最新数据, 为空则会清空当前数据
      queryNotice[params.scope].refetch();
      unreadRefetch();
    },
  });
  type TypeQueryNotice = Record<NoticeScope, UseQueryResult<NoticesQuery, unknown>>;

  const queryNotice = {} as TypeQueryNotice;
  queryNotice.INFOS = useGetNotices(NoticeScope.Infos);
  queryNotice.REFERER = useGetNotices(NoticeScope.Referer);
  queryNotice.MESSAGES = useGetNotices(NoticeScope.Messages);

  type TypeUnreadCount =
    | {
        infos: number;
        messages: number;
        referer: number;
        total: number;
        [key: string]: number | NotificationCount | string;
      }
    | undefined
    | null;
  const unreadCount: TypeUnreadCount = unreadData?.current_user?.unread_count;
  const unreadCountTotal = unreadCount?.total || 0;

  const { run: debounceQueryNoticeRefetch } = useDebounceFn(
    (key) => {
      queryNotice[key as NoticeScope].refetch();
    },
    { wait: 150 },
  );

  type TypeTabBtn = {
    unreadCount: number | undefined;
  };
  const TabBtn: React.FC<PropsWithChildren<TypeTabBtn>> = React.memo(({ children, unreadCount }) => {
    return (
      <div className="text-center">
        <Badge {...defaultBadgeProps} count={unreadCount}>
          <div className="gitee-header__notice__tab-btn text-sm text-white">{children}</div>
        </Badge>
      </div>
    );
  });
  TabBtn.displayName = 'TabBtn';

  const itemClick = useCallback(
    (scope: NoticeScope, id: string) => {
      markNotices.mutate({ scope, notice_ids: id });
    },
    [markNotices],
  );
  // antd onTabClick key 必须是 string
  const tabClick = (activeKey: string) => {
    setActiveKey(activeKey as NoticeScope);
  };
  const menus = (
    <div className="gitee-header__notice__menu w-96 break-before-all bg-gray-700 text-sm text-gray-300">
      <Tabs
        className="select-none text-gray-300"
        activeKey={activeKey}
        onTabClick={tabClick}
        onChange={debounceQueryNoticeRefetch}
        renderTabBar={(DefaultTabBarProps, DefaultTabBar) => {
          return (
            <DefaultTabBar {...DefaultTabBarProps} className="mb-0 before:border-none">
              {(item) => {
                return (
                  <a
                    {...item.props}
                    className={cn('gitee-header__notice__tabbar w-32 py-3', {
                      'gitee-header__notice__tabbar--active bg-slate-600': activeKey === item.key,
                    })}
                    key={item.key}
                  ></a>
                );
              }}
            </DefaultTabBar>
          );
        }}
        tabBarGutter={0}
      >
        <TabPane
          className="bg-slate-600"
          tab={<TabBtn unreadCount={unreadCount?.referer}>{'@我'}</TabBtn>}
          key={NoticeScope.Referer}
          forceRender={false}
        >
          <TabContent
            render={activeKey === NoticeScope.Referer}
            isFetching={queryNotice.REFERER.isFetching}
            data={queryNotice.REFERER.data}
            scope={NoticeScope.Referer}
            itemClick={itemClick}
          />
        </TabPane>

        <TabPane
          tab={<TabBtn unreadCount={unreadCount?.infos}>{'通知'}</TabBtn>}
          key={NoticeScope.Infos}
          forceRender={false}
        >
          <TabContent
            render={activeKey === NoticeScope.Infos}
            isFetching={queryNotice.INFOS.isFetching}
            data={queryNotice.INFOS.data}
            scope={NoticeScope.Infos}
            itemClick={itemClick}
          />
        </TabPane>
        <TabPane
          tab={<TabBtn unreadCount={unreadCount?.messages}>{'私信'}</TabBtn>}
          key={NoticeScope.Messages}
          forceRender={false}
        >
          <TabContent
            render={activeKey === NoticeScope.Messages}
            isFetching={queryNotice.MESSAGES.isFetching}
            data={queryNotice.MESSAGES.data}
            scope={NoticeScope.Messages}
            itemClick={itemClick}
          />
        </TabPane>
      </Tabs>
      <div className="gitee-header__notice__footer flex justify-between border-solid border-0 border-t border-t-slate-500 bg-slate-600 py-3 px-4 text-gray-400">
        {/* 根据 activeKey 确定标记哪一个 tab, 并且判断对应数据是否在 loading */}
        <div
          className={cn('cursor-pointer hover:text-white', {
            invisible: !(unreadCount && unreadCount[activeKey.toLocaleLowerCase()] > 0),
          })}
          onClick={() => {
            if (queryNotice[activeKey].isFetching) return;
            const ids = queryNotice[activeKey].data?.current_user?.notices?.list.map((item) => String(item.id));
            if (!ids?.length) return;
            markNotices.mutate({
              scope: activeKey,
              notice_ids: ids || '',
            });
          }}
        >
          {'标记当前页已读'}
        </div>
        <a
          href={`https://gitee.ru/notifications/${activeKey.toLocaleLowerCase()}`}
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-white"
        >
          {'查看全部'}
        </a>
      </div>
    </div>
  );
  return (
    <Dropdown
      getPopupContainer={(triggerNode) => triggerNode}
      overlay={menus}
      placement="bottomLeft"
      align={{ offset: [0, 8.5] }}
      arrow={false}
      mouseLeaveDelay={0.35}
      visible={isVisibleDropdown}
      mouseEnterDelay={0}
      onVisibleChange={(visible) => {
        // 禁用点击 dropdown menu 时关闭 dropdown
        setVisibleDropdown(visible);
        // menu 显示后获取具体消息
        if (visible) {
          queryNotice[activeKey].refetch();
          // 用户鼠标移入菜单后再次获取未读数量, 保证即时性
          unreadRefetch();
        }
      }}
      {...props}
    >
      <div>
        <a href="https://gitee.ru/notifications" aria-label="notifications">
          <Badge {...defaultBadgeProps} count={unreadCountTotal} offset={[4, 0]}>
            <Icon
              gitee="remind"
              className="scale-105 cursor-pointer text-lg text-gray-400 hover:text-white sm:text-white"
              {...iconProps}
            />
          </Badge>
        </a>
      </div>
    </Dropdown>
  );
};

export { UserNotice };
