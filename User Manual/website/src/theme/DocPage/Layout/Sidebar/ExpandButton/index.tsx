import React from 'react';
import cn from 'classnames';
import { IconAngleRight } from '@gitee/icons-react';
import type { Props } from '@theme/DocPage/Layout/Sidebar/ExpandButton';
import styl from './index.module.less';

export default function DocPageLayoutSidebarExpandButton({ toggleSidebar }: Props): JSX.Element {
  return (
    <div className={styl['expand-button-sidebar']}>
      <button
        type="button"
        className={cn(
          'button button--secondary button--outline flex items-center justify-center text-white',
          styl['expand-button'],
        )}
        onClick={toggleSidebar}
      >
        <IconAngleRight />
      </button>
    </div>
  );
}
