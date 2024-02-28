/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cn from 'classnames';
import type { Props } from '@theme/DocSidebar/Desktop/CollapseButton';
import { IconAngleLeft } from '@gitee/icons-react';
import styl from './index.module.css';

export default function CollapseButton({ onClick }: Props): JSX.Element {
  return (
    <button
      type="button"
      className={cn('button button--secondary button--outline text-white flex items-center justify-center', styl['collapse-button'])}
      onClick={onClick}
    >
      <IconAngleLeft />
    </button>
  );
}
