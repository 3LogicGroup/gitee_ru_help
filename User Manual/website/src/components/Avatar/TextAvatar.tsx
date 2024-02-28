import React from 'react';
import { Avatar, AvatarProps } from 'gitee-ui';
import type { CSSProperties } from 'react';
import getTextAvatarColor from './getTextAvatarColor';

type TextAvatarProps = {
  src: string;
  size?: AvatarProps['size'];
  style?: CSSProperties;
};

const TextAvatar: React.FC<TextAvatarProps> = ({
  src,
  size,
  style,
  ...props
}) => {
  const [_, name] = src.split('#');
  const showLetter = name.charAt(0).toUpperCase();
  const backgroundColor = getTextAvatarColor(name);
  // size: 32 -> 14px
  const fontSize =
    typeof size === 'number' ? `${(size / 2.285).toFixed()}px` : undefined;
  return (
    <Avatar
      style={{ ...style, backgroundColor, fontSize }}
      size={size}
      {...props}
    >
      {showLetter}
    </Avatar>
  );
};

export default TextAvatar;
