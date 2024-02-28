import React from 'react';
import { Skeleton } from 'gitee-ui';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Icon from '@site/src/components/Misc/Icon';
import style from './UserDropdown.module.less';
import { useUserContext } from '../../../context/UserContext';

const Navigation: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as { [key: string]: string };
  const SITE_URL = customFields.SITE_URL;
  const { data } = useUserContext();
  const userHref = data?.current_user?.href;

  const navList = [
    {
      type: 'projects',
      name: '仓库',
      href: `${SITE_URL}/dashboard/projects`,
      icon: 'project-public',
    },
    {
      type: 'PR',
      name: 'Pull Requests',
      href: `${SITE_URL}/dashboard/pull-requests`,
      icon: 'pull-request',
    },
    {
      type: 'issue',
      name: 'Issues',
      href: `${SITE_URL}/dashboard/issues`,
      icon: 'issue',
    },
    {
      type: 'code',
      name: '代码片段',
      href: `${SITE_URL}/dashboard/codes`,
      icon: 'code',
    },
    {
      type: 'star',
      name: '我的星选集',
      href: `${SITE_URL}${userHref}/starred`,
      icon: 'star',
    },
  ];

  return (
    <Skeleton loading={status === 'idle' || status === 'loading'} active>
      <div className="text-sm">
        {navList.length
          ? navList.map((item) => {
            return (
              <div key={item.type}>
                <a
                  key={item.type}
                  href={item.href}
                  className={style['menu-item']}
                >
                  <Icon
                    gitee={item.icon}
                    className={style['menu-item-icon']}
                  />
                  <span>{item.name}</span>
                </a>
              </div>
            );
          })
          : null}
      </div>
    </Skeleton>
  );
};

export default Navigation;