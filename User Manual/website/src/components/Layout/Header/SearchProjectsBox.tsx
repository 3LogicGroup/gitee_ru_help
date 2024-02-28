import React, { useState } from 'react';
import type { ComponentProps } from 'react';
import { Input } from 'gitee-ui';
import type { InputProps } from 'gitee-ui';

type SearchProjectsBoxProps = ComponentProps<'input'> & {
  inputProps?: InputProps;
};
const SearchProjectsBox: React.FC<SearchProjectsBoxProps> = ({ inputProps, ...props }) => {
  const [text, setText] = useState('');
  const targetURl = `https://gitee.ru/search?fork_filter=on&q=${text}`;
  return (
    <div className="gitee-header__search relative">
      <Input
        onChange={(e) => {
          setText(e.target.value);
        }}
        onPressEnter={() => {
          text && (window.location.href = targetURl);
        }}
        value={text}
        className="peer h-7 w-44 border-gray-400 bg-transparent text-sm text-gray-300 shadow-none hover:shadow-none focus:w-52"
        placeholder="搜开源"
        {...inputProps}
      />
      {text && (
        <a
          onMouseDown={(e) => {
            // 由于使用了 focus: 控制显示, 为防止点击时输入框失去焦点, 故阻止鼠标按下的默认事件
            e.preventDefault();
          }}
          href={targetURl}
          className="gitee-header__search__item absolute top-full left-0 hidden w-full truncate bg-[rgb(55,65,81)] p-2 text-sm font-medium leading-8 text-[rgb(209,213,219)] hover:text-white peer-focus:block"
        >
          在全站搜索 <span className="font-semibold text-primary">{text}</span>
          {` `}
          相关项目
        </a>
      )}
    </div>
  );
};

export { SearchProjectsBox };
