/* Header 中的 "用户头像下拉菜单" */
import React, { type PropsWithChildren } from 'react';
import { Dropdown, Divider } from 'gitee-ui';
import { useUserContext } from '../../../context/UserContext';
import Avatar from '../../Avatar';
import Icon from '../../Misc/Icon';
// import style from './UserDropdown.module.less';
// import { Logout } from '@components/Layout/Header/Logout';
import CpsBeRecommender from '../images/cps-be-recommender.svg';

const Item: React.FC<PropsWithChildren<{ href?: string | undefined; onClick?: () => void }>> = ({
  href,
  onClick,
  children,
}) => (
  <a
    href={href}
    className={
      'gitee-header__user__item flex items-center space-x-3 py-2 px-5 text-gray-300 hover:bg-slate-800 hover:text-white'
    }
    onClick={onClick}
  >
    {children}
  </a>
);

const UserDropdown: React.FC = ({ ...props }) => {
  const { data } = useUserContext();
  const currentUser = data?.current_user;
  const userHref = currentUser?.href;

  const menus = (
    <div className="gitee-header__user__menu bg-gray-700 py-2 text-sm">
      <Item href={'https://gitee.ru' + userHref}>
        <Icon gitee="account" className={'scale-110'} />
        <span>{'个人主页'}</span>
      </Item>
      <Divider className={'my-1 mx-4 w-auto min-w-max max-w-full border-t-gray-600 px-4'} />
      <Item href={'https://gitee.ru' + userHref + '/dashboard/projects'}>
        <Icon gitee="project-public" className={'scale-105'} />
        <span>{'我的仓库'}</span>
      </Item>
      <Item href={'https://gitee.ru' + userHref + '/collections'}>
        <Icon gitee="star" />
        <span>{'我的星选集'}</span>
      </Item>
      <Item href={'https://gitee.ru' + userHref + '/starred'}>
        <Icon gitee="star" />
        <span>{'我 Star 的项目'}</span>
      </Item>
      <Item href={'https://gitee.ru' + userHref + '/following'}>
        <Icon gitee="watch" />
        <span>{'我 Follow 的用户'}</span>
      </Item>
      <Item href={'https://gitee.ru' + userHref + '/dashboard/codes'}>
        <Icon gitee="code" />
        <span>{'我的代码片段'}</span>
      </Item>
      <Divider className={'my-1 mx-4 w-auto min-w-max max-w-full border-t-gray-600 px-4'} />
      <Item href="https://gitee.ru/help/categories/68">
        <Icon gitee="bulb" />
        <span>{'功能更新'}</span>
      </Item>
      <Item href="https://gitee.ru/help">
        <Icon gitee="help-circle" />
        <span>{'帮助文档'}</span>
      </Item>
      <Divider className={'my-1 mx-4 w-auto min-w-max max-w-full border-t-gray-600 px-4'} />
      <Item href={'https://gitee.ru/profile/cps/overview'}>
        <span className={'h-4 w-4'}>
          <CpsBeRecommender />
        </span>
        <span>{'成为推荐官'}</span>
      </Item>
      <Item href="https://gitee.ru/oschina/git-osc/issues">
        <Icon gitee="bubble" />
        <span>{'提交反馈建议'}</span>
      </Item>
      <Divider className={'my-1 mx-4 w-auto min-w-max max-w-full border-t-gray-600 px-4'} />
      <Item href="https://gitee.ru/profile/account_information">
        <Icon gitee="edit" />
        <span>{'账号设置'}</span>
      </Item>
      {/* <Divider className={'my-1 mx-4 w-auto min-w-max max-w-full border-t-gray-600 px-4'} /> */}
      {/* 移动端也使用了  Logout 这个组件。 但移动端不需要多套样式*/}
      {/* <Logout className="gitee-header__user__item" /> */}
    </div>
  );
  return (
    <Dropdown overlay={menus} arrow={false} getPopupContainer={(triggerNode) => triggerNode} {...props}>
      <div className="flex cursor-pointer items-center justify-between">
        <Avatar src={currentUser?.avatar_url} size={32} alt={currentUser?.name}>
          {currentUser?.name.charAt(0)}
        </Avatar>
        <span className="w-2">
          <Icon gitee="dropdown" className="ml-1 scale-50 text-gray-400" />
        </span>
      </div>
    </Dropdown>
  );
};
export { UserDropdown };
