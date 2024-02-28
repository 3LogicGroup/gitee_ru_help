/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { PageMetadata, HtmlClassNameProvider } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import Svg404 from '@site/static/img/404.svg';
import styl from './NotFound.module.less';

export default function NotFound(): JSX.Element {
  return (
    <HtmlClassNameProvider className={styl['notfound-page']}>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      >
      </PageMetadata>
      <Layout>
        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="px-2 text-center text-[#2e405e] dark:text-[#909aaa]">
            <Svg404 />
            <p className="mt-4 text-[16px] dark:text-[#e3e3e3]">
              <Translate id="theme.NotFound.title" description="The title of the 404 page">
                你所访问的页面不存在！
              </Translate>
            </p>
            <Translate id="theme.NotFound.description" description="The description of the 404 page">
              资源不存在或者没有访问权限，点击
            </Translate>
            <a href="/" rel="noreferrer">
              <Translate id="theme.NotFound.linkText" description="The link text of the 404 page">
                这里
              </Translate>
            </a>
            <Translate id="theme.NotFound.homepage" description="The homepage of the 404 page">
              返回首页
            </Translate>
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
