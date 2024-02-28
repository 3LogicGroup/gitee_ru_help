import React from 'react';
// import cn from 'classnames';
import { useThemeConfig } from '@docusaurus/theme-common';
// import type { FooterLinkItem } from '@docusaurus/theme-common';
// import Link from '@docusaurus/Link';
// import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

import BottomBar from './BottomBar';
// import Icon from '../../components/Misc/Icon';

function Footer(): JSX.Element | null {
  // const { withBaseUrl } = useBaseUrlUtils();
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  // const { copyright, links, logo, style } = footer;
  // const [col1, col2, col3, col4] = links as { items: FooterLinkItem[] }[];

  return (
    <footer className={'text-sm'}>
      {/* <div
        className={cn(
          'border-t border-b-0 border-x-0 border-solid border-t-gray-200 bg-gray-50 py-5 px-8 text-gray-500 ',
          'dark:bg-dark dark:border-dark',
        )}
      >
        <div className={'w-[108px] h-[38px]'}>
          <img className={'hidden dark:block'} src={withBaseUrl('/img/logo-light.svg')} alt="" />
          <img className={'dark:hidden'} src={withBaseUrl('/img/logo-black.svg')} alt="" />
        </div>
        <p className="mt-2 mb-4 text-sm">深圳市奥思网络科技有限公司版权所有</p>
        <div className="grid grid-flow-col justify-between gap-x-8 leading-loose">
          <div className="col-span-6 flex justify-between">
            <nav className="flex flex-col md:hidden">
              {col1.items.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <nav className="flex flex-col">
              {col2.items.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <nav className="flex flex-col ">
              {col3.items.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <nav className="flex flex-col ">
              {col4?.items.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <nav className="col-span-2 flex flex-col justify-start lg:hidden">
              <Link
                className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
                target="_blank"
                href="https://qm.qq.com/cgi-bin/qm/qr?k=OUfztMuf7jElTIf78lMuNT_D_lZYOWnd"
              >
                <Icon className="mr-3 scale-125" gitee="logo-qq" />
                <span>官方技术交流QQ群：515965326</span>
              </Link>
              <Link
                className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
                target="_blank"
                href="mailto: git@oschina.cn"
              >
                <Icon className="mr-3 scale-125" gitee="msg-mail" />
                <span id="git-footer-email">git@oschina.cn</span>
              </Link>
              <Link
                className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
                target="_blank"
                href="https://www.zhihu.com/org/ma-yun-osc/"
              >
                <Icon className="mr-3   scale-125" gitee="logo-zhihu" />
                <span>Gitee</span>
              </Link>
              <Link
                className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
                href={'tel:400-606-0201'}
              >
                <Icon className="mr-3 scale-125" gitee="tel" />
                <span>售前及售后使用咨询：400-606-0201 </span>
              </Link>
            </nav>
          </div>
          <div className="col-span-1 flex xl:hidden">
            <div className="flex flex-col items-center">
              <img width="80" height="80" alt={''} src={withBaseUrl('/img/footer/mini-app.jpg')} />
              <span className="mt-2">微信小程序</span>
            </div>
            <div className="ml-6 flex flex-col items-center">
              <img width="80" height="80" alt={''} src={withBaseUrl('/img/footer/qrcode-wechat.jpg')} />
              <span className="mt-2">微信公众号</span>
            </div>
          </div>
        </div>
      </div> */}
      <BottomBar />
    </footer>
  );
}

export default React.memo(Footer);
