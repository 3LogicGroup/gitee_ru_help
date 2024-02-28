
import React from 'react';
import { useLocation } from '@docusaurus/router';
import { Drawer, Divider, Button } from 'gitee-ui';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import cn from 'classnames';
import Icon from '@site/src/components/Misc/Icon';
import Namespaces from './Namespaces';
import Navigation from './Navigation';
import Avatar from '../../Avatar';
import { Logout } from './Logout';
import style from './UserDropdown.module.less';
import { useUserContext } from '../../../context/UserContext';
import { useDashboardQuery } from '../../../graphql/generated';
import client from '../../../graphql/client';

type MobileSidebarProps = {
  visible?: boolean;
  onClose?: () => void;
  className?: string;
};
const MobileSidebar: React.FC<MobileSidebarProps> = ({
  visible,
  onClose,
  className = 'bg-gray-700',
}) => {
  const { pathname } = useLocation();
  const { data } = useUserContext();
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as { [key: string]: string };
  const SITE_URL = customFields.SITE_URL;
  const currentUser = data?.current_user;
  //打开侧边栏且已经登录才请求
  useDashboardQuery(client, undefined, {
    enabled: visible && !!currentUser,
    staleTime: Infinity,
  });
  return (
    <Drawer
      placement="left"
      closable={false}
      maskClosable={true}
      visible={visible}
      onClose={onClose}
      width={200}
      getContainer={() => document.querySelector('header') || document.body}
      destroyOnClose={true}
      className=">sm:hidden"
    >
      <div
        className={cn(
          '-m-[24px] min-h-screen overflow-x-auto text-gray-300',
          className
        )}
      >
        <div className="mb-3 pt-5 text-center">
          <Avatar
            src={currentUser?.avatar_url}
            size={60}
            alt={currentUser?.name}
            style={{ border: '1px solid #8C92A4' }}
          >
            {currentUser?.name.charAt(0)}
          </Avatar>
          {currentUser ? (
            <div className="mt-1">{currentUser?.name}</div>
          ) : (
            <div className="flex flex-col px-5">
              <a
                href={`${SITE_URL}/login?redirect_to_url=${encodeURIComponent(
                  pathname
                )}`}
              >
                <Button className="mt-4 w-full bg-[#fe7300] border-[#fe7300]" type="primary" size="middle">
                  登 录
                </Button>
              </a>
              <a
                href={`${SITE_URL}/signup?redirect_to_url=${encodeURIComponent(
                  pathname
                )}`}
              >
                <Button
                  className="my-4 w-full border-white bg-gray-700 text-white"
                  size="middle"
                >
                  注 册
                </Button>
              </a>
            </div>
          )}
        </div>
        {!!currentUser && (
          <>
            <a href={`${SITE_URL}/dashboard`} className={style['menu-item']}>
              <Icon
                gitee="dashboard"
                className={style['menu-item-icon'] + ' scale-105'}
              />
              <span>工作台</span>
            </a>
            <div className="ml-5 mt-3 text-gray-400">
              我的
            </div>
            <Divider className={style.divider} />
            <Navigation />
            <div className="ml-5 mt-3 text-gray-400">
              我的企业/高校/组织
            </div>
            <Divider className={style.divider} />
            <Namespaces className="mt-1 mb-3 text-sm" />
          </>
        )}
        <Divider className={style.divider} />
        <div className="text-sm">
          <a href={`${SITE_URL}/search`} className={style['menu-item']}>
            <Icon gitee="search" className={style['menu-item-icon']} />
            <span>搜索</span>
          </a>
          <a href={`${SITE_URL}/help/categories/86`} className={style['menu-item']}>
            <Icon gitee="bulb" className={style['menu-item-icon']} />
            <span>功能更新</span>
          </a>
          <a href="/" className={style['menu-item']}>
            <Icon gitee="help-circle" className={style['menu-item-icon']} />
            <span>产品文档</span>
          </a>
          <a href={`${SITE_URL}/oschina/git-osc/issues`} className={style['menu-item']}>
            <Icon gitee="bubble" className={style['menu-item-icon']} />
            <span>提交反馈/建议</span>
          </a>
          {!!currentUser && (
            <>
              <Divider className={style.divider} />
              <a
                href={`${SITE_URL}/profile/account_information`}
                className={style['menu-item']}
              >
                <Icon gitee="edit" className={style['menu-item-icon']} />
                <span>账号设置</span>
              </a>
              <Logout />
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
};
export { MobileSidebar };
