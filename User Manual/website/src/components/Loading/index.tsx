import React from 'react';
import type { SpinProps } from 'gitee-ui';
import { Spin } from 'gitee-ui';
import LoadingIcon from 'gitee-ui/lib/button/LoadingIcon';

const Loading: React.FC<SpinProps> = ({ ...props }) => {
  return (
    <Spin
      spinning={true}
      className="text-gray-400 text-xl"
      indicator={<LoadingIcon prefixCls="" existIcon={false} loading={true} />}
      {...props}
    />
  );
};
export type { SpinProps as LoadingProps };
export { Loading };
