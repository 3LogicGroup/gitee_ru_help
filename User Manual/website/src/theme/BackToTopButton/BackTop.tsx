import React from 'react';
import { BackTop, BackTopProps, Tooltip } from 'gitee-ui';
import { IconUpLine } from '@gitee/icons-react';

export type CustomAvatarProps = BackTopProps & {
  customClassNames?: string;
};

const CustomBackTop: React.FC<CustomAvatarProps> = ({ ...props }) => {
  const defaultCustomClassNames =
    'w-10 h-10 leading-10 bg-white hover:bg-gray-50 text-gray-400 rounded-full shadow text-center flex items-center justify-center';
  const { customClassNames = defaultCustomClassNames, ...otherProps } = props;

  return (
    <>
      <BackTop {...otherProps}>
        <Tooltip
          placement="left"
          title="回到顶部"
          color="rgba(0,0,0,.9)"
          overlayInnerStyle={{ color: 'white' }}
        >
          <div className={customClassNames}>
            <IconUpLine />
          </div>
        </Tooltip>
      </BackTop>
    </>
  );
};

export default CustomBackTop;
