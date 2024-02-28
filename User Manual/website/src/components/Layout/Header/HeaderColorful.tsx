import React, { ComponentProps, useCallback, useState } from 'react';
import Translate from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import cn from 'classnames';
import { NavItem } from '@site/src/components/Layout/Header/NavItem';
import { ServiceSupportDropdown } from '@site/src/components/Layout/Header/ServiceSupportDropdown';
import { SearchProjectsBox } from '@site/src/components/Layout/Header/SearchProjectsBox';
import { My } from './My';
import { UserDropdown } from './UserDropdown';
import { CreateDropdown } from './CreateDropdown';
// import { CreateDropdown } from '@components/Layout/Header/CreateDropdown';
import { UserNotice } from './UserNotice/';
import { MobileSidebar } from './MobileSidebar';
import Icon from '@site/src/components/Misc/Icon';
import PromotionBadge from '@site/src/components/Misc/PromotionBadge';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useUserContext } from '../../../context/UserContext';
import styles from './HeaderColorful.module.less';

const themeConfig = {
  light: {
    linkClassName: 'text-gray-200 hover:text-white',
    linkActiveClassName: 'font-bold text-white',
    textClassName: 'text-gray-200',
    iconClassName: 'text-gray-200 hover:text-white',
    textBtnClassName: 'text-gray-200 hover:text-white',
    btnClassName: 'text-gray-200 hover:text-white border-gray-200',
  },
  gray: {
    linkClassName: 'text-black text-opacity-80 hover:text-black',
    linkActiveClassName: 'font-bold',
    textClassName: 'text-black text-opacity-80',
    iconClassName: 'text-gray-400 hover:text-gray-700',
    textBtnClassName: 'text-ent-primary hover:text-ent-link',
    btnClassName: 'text-ent-primary hover:text-ent-link border-ent-primary',
  },
  black: {
    linkClassName: 'text-black text-opacity-80 hover:text-black',
    linkActiveClassName: 'font-bold',
    textClassName: 'text-black text-opacity-80',
    iconClassName: 'text-gray-400 hover:text-gray-700',
    textBtnClassName: 'text-black hover:text-link-primary',
    btnClassName: 'text-primary hover:text-link border-primary',
  },
};
type HeaderColorfulProps = ComponentProps<'header'> & {
  theme?: keyof typeof themeConfig;
  enableServiceSupport?: boolean;
  contactUsModalClassName?: string;
  contactUsModalContactType?: 'enterprise' | 'education' | 'privatization' | 'other';
};
const HeaderColorful: React.FC<HeaderColorfulProps> = ({
  theme = 'light',
  enableServiceSupport = false,
  contactUsModalClassName,
  contactUsModalContactType,
  ...props
}) => {
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as { [key: string]: string };
  const SITE_URL = customFields.SITE_URL;
  const { withBaseUrl } = useBaseUrlUtils();
  const { pathname } = useLocation();
  const { data } = useUserContext();
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const handleMobileSidebarClose = useCallback(() => {
    setMobileSidebarVisible(false);
  }, []);

  const currentTheme = themeConfig[theme];
  const navLinkClassName = `relative flex text-base ${currentTheme.linkClassName}`;

  const HeaderLeft = (
    <nav className="sm:hidden">
      <ul className="mb-0 flex items-center">
        <NavItem aProps={{ href: SITE_URL }}>
          <img src={withBaseUrl('/img/logo-black.svg')} width="108" height="34" alt="gitee logo" />
        </NavItem>
        <NavItem
          aProps={{
            href: `${SITE_URL}/explore`,
            className: cn(navLinkClassName),
            activeClassName: currentTheme.linkActiveClassName,
          }}
        >
          <Translate>开源软件</Translate>
        </NavItem>
        <NavItem
          aProps={{
            href: `${SITE_URL}/enterprises`,
            className: cn(navLinkClassName),
            activeClassName: currentTheme.linkActiveClassName,
          }}
        >
          <>
            <Translate>企业版</Translate>
            <PromotionBadge />
          </>
        </NavItem>
        <NavItem
          aProps={{
            href: `${SITE_URL}/education`,
            className: cn(navLinkClassName),
            activeClassName: currentTheme.linkActiveClassName,
          }}
        >
          <Translate>高校版</Translate>
        </NavItem>
        <NavItem
          aProps={{ href: 'https://gitee.cn?utm_source=help', target: '_blank', className: cn(navLinkClassName) }}
        >
          <Translate>私有云</Translate>
        </NavItem>
        <NavItem
          className="nav-item-service"
          customRender={
            <ServiceSupportDropdown
              contactUsModalClassName={contactUsModalClassName}
              contactUsModalContactType={contactUsModalContactType}
            >
              <div className={`cursor-pointer text-base ${currentTheme.linkClassName}`}>
                <Translate>帮助与支持</Translate>
                <Icon gitee="dropdown" className={`scale-50 ${currentTheme.iconClassName}`} />
              </div>
            </ServiceSupportDropdown>
          }
        />
        {data?.current_user && (
          <NavItem
            className="nav-item-my"
            customRender={
              <My>
                <a className={`text-base ${currentTheme.linkClassName}`}>
                  <span>我的</span>
                  <Icon gitee="dropdown" className={`scale-50 ${currentTheme.iconClassName}`} />
                </a>
              </My>
            }
          />
        )}
      </ul>
    </nav>
  );

  const HeaderRight = (
    <nav className="flex shrink-0 items-center justify-end sm:hidden">
      <ul className="mb-0 contents">
        <NavItem
          className="lg:hidden"
          customRender={
            <SearchProjectsBox
              inputProps={{
                className: cn(
                  currentTheme.textClassName,
                  'text-black text-opacity-80 peer h-7 w-44 text-sm shadow-none bg-black bg-opacity-5 border-none hover:border-normal focus:border-normal hover:shadow-none focus:w-52',
                ),
              }}
            />
          }
        />
        {data?.current_user ? (
          <>
            <NavItem
              customRender={
                <UserNotice
                  iconProps={{
                    className: `scale-125 cursor-pointer text-lg ${currentTheme.iconClassName}`,
                  }}
                />
              }
            />
            <NavItem
              customRender={
                <CreateDropdown
                  iconProps={{
                    className: `scale-125 cursor-pointer text-lg ${currentTheme.iconClassName}`,
                  }}
                />
              }
            />
            <NavItem customRender={<UserDropdown />} />
          </>
        ) : (
          <>
            <NavItem
              aProps={{
                href: `${SITE_URL}/login?redirect_to_url=${encodeURIComponent(pathname)}`,
                className: `relative text-sm flex text-base ${currentTheme.textBtnClassName}`,
              }}
            >
              <Translate>登录</Translate>
            </NavItem>
            <NavItem
              aProps={{
                href: `${SITE_URL}signup?redirect_to_url=${encodeURIComponent(pathname)}`,
                className: cn(
                  currentTheme.btnClassName,
                  'relative flex text-base text-sm border border-solid rounded',
                  'px-2.5 py-1',
                ),
              }}
            >
              <Translate>注册</Translate>
            </NavItem>
          </>
        )}
      </ul>
    </nav>
  );

  const MobileHeader = (
    <>
      <nav className="hidden flex-1 shrink-0 items-center justify-between sm:flex">
        <ul className="relative mb-0 flex w-full items-center justify-between">
          <NavItem
            customRender={
              <Icon
                gitee="nav"
                className="cursor-pointer text-xl text-white"
                onClick={() => setMobileSidebarVisible(true)}
              />
            }
          />
          <NavItem
            className="absolute left-2/4 top-2/4 !mx-0 -translate-x-2/4 -translate-y-2/4 transform"
            aProps={{ href: SITE_URL }}
          >
            <img src={withBaseUrl('/img/logo-light.svg')} width="108" height="34" alt="gitee logo" />
          </NavItem>
          {data?.current_user && <NavItem customRender={<UserNotice disabled={true} />} />}
        </ul>
      </nav>
      <MobileSidebar visible={mobileSidebarVisible} onClose={handleMobileSidebarClose} />
    </>
  );

  return (
    <header
      id={styles['gitee-header--colorful']}
      className={cn(
        'ent-font-family',
        'absolute inset-x-0 left-0 top-0 z-50 bg-transparent  px-12 pt-8',
        'sm:fixed sm:h-header sm:bg-gray-700 sm:px-3 sm:pt-0',
      )}
      {...props}
    >
      <div className={cn('flex h-header items-center justify-between')}>
        {HeaderLeft}
        {HeaderRight}
        {MobileHeader}
      </div>
    </header>
  );
};

export default HeaderColorful;
