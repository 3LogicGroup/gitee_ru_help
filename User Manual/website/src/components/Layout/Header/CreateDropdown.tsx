/* Header 中的 "新建" */
import React, { type ComponentProps, type PropsWithChildren } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { Dropdown } from 'gitee-ui';
import Icon from '../../Misc/Icon';

type CreateDropdownProps = {
  iconProps?: ComponentProps<'i'>;
};

const Item: React.FC<PropsWithChildren<{ href: string }>> = ({ children, href }) => (
  <a
    href={href}
    className={
      'gitee-header__create__item flex items-center space-x-3 py-2 px-5 text-gray-300 hover:bg-slate-800 hover:text-white'
    }
  >
    {children}
  </a>
);

const CreateDropdown: React.FC<CreateDropdownProps> = ({ iconProps, ...props }) => {
  const { data } = useUserContext();
  const userHref = data?.current_user?.href;
  const menus = (
    <div className="gitee-header__create__menu bg-gray-700 py-2 text-sm">
      <Item href="https://gitee.ru/projects/new">
        <Icon gitee="add" />
        <span>{'新建仓库'}</span>
      </Item>

      <Item href={'https://gitee.ru' + userHref + '/codes/new'}>
        <Icon gitee="code" />
        <span>{'发布代码片段'}</span>
      </Item>
      <Item href="https://gitee.ru/organizations/new">
        <Icon gitee="team-mini" />
        <span>{'创建组织'}</span>
      </Item>
      <Item href={'https://gitee.ru/enterprises/new'}>
        <Icon gitee="tag-enterprise" />
        <span>{'开通企业版'}</span>
      </Item>
      <Item href="https://gitee.ru/projects/import/url">
        <Icon gitee="logo-github" />
        <span>{'从 Github / Gitlab 导入仓库'}</span>
      </Item>
    </div>
  );
  return (
    <Dropdown
      overlay={menus}
      arrow={false}
      mouseEnterDelay={0}
      getPopupContainer={(triggerNode) => triggerNode}
      {...props}
    >
      {/* 加一层 div, 帮助 getPopupContainer 确定正确位置 */}
      <div>
        <Icon
          gitee="add-thin-outline"
          className="scale-125 cursor-pointer text-gray-400 hover:text-white"
          {...iconProps}
        />
      </div>
    </Dropdown>
  );
};
export { CreateDropdown };
