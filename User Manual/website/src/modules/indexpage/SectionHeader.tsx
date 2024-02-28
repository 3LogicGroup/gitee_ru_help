import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { IconSearch } from '@gitee/icons-react';
import header from './images/header.png';
import style from './search.module.less';
import MeiliSearchInput from '../../components/MeiliSearchInput';

const SectionHeader = () => {
  return (
    <section>
      <div
        className={cn('relative h-[600px] w-full bg-cover bg-center bg-no-repeat')}
        style={{
          backgroundImage: `url(${header})`,
        }}
      >
        <div className="absolute inset-x-0 mx-auto mt-[164px] text-center sm:mt-32">
          <h1 className="mb-10 font-AlimamaShuHeiTi text-5xl font-bold sm:text-3xl">欢迎使用 Gitee 帮助中心</h1>
          <div className={style['indexpage-custom-search']}>
            <MeiliSearchInput className={style['indexpage-custom-input']}/>
            <div className="relative left-[230px] -top-12 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F5FD] sm:left-0 sm:hidden">
              <IconSearch color="#2C7EF8" fontSize={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default SectionHeader;
