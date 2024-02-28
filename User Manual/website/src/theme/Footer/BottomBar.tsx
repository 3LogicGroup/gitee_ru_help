import React from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

const BottomBar = () => {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <div className="bg-slate-900 flex h-11 items-center justify-between px-5 text-gray-400">
      <div className="flex ">
        <div className="flex items-center text-sm xl:hidden">
          <span className={'w-5 h-5 '}>
            <img src={withBaseUrl('/img/footer/logo-openatom.png')} alt={'openatom'} />
          </span>
          <a
            href="https://www.openatom.org/"
            className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
            rel="nofollow noreferrer noreferrer"
            target="_blank"
          >
            <span className="ml-1">开放原子开源基金会</span>
          </a>
          <div className="ml-1 text-muted">合作代码托管平台</div>
        </div>

        <div className="flex mx-4 lg:hidden">
          <span className={'w-5 h-5 '}>
            <img src={withBaseUrl('/img/footer/complaint.png')} alt={'complaint'} />
          </span>
          <a
            href="https://12377.cn/"
            className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
            rel="nofollow noreferrer noreferrer"
            target="_blank"
          >
            <span className="ml-1">违法和不良信息举报中心</span>
          </a>
        </div>

        <div className="flex">
          <a
            href="https://beian.miit.gov.cn"
            className="text-link-tertiary hover:text-link-tertiary-hover hover:underline active:text-link-tertiary-active"
            rel="nofollow noreferrer noreferrer"
            target="_blank"
          >
            <span className="ml-1">粤ICP备12009483号</span>
          </a>
        </div>
      </div>

      {/* <div className="items-center flex">
        <i className="icon gitee-icon tag-web text-base mr-1" />
        <a className="text-gray-400 mr-1 hover:opacity-80" href="/">
          中 文
        </a>
        /
        <a className="text-gray-400 ml-1 hover:opacity-80" href="/en">
          English
        </a>
      </div> */}
    </div>
  );
};

export default BottomBar;
