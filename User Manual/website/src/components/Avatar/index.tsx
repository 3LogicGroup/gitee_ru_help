import React from 'react';
import type { ComponentProps } from 'react';
import { Avatar, AvatarProps } from 'gitee-ui';
import noPortrait from './no-portrait.png';
import TextAvatar from './TextAvatar';

type CustomAvatarProps = AvatarProps & {
  /**用户 id */
  id?: number;
  /** a 标签的 target */
  target?: ComponentProps<'a'>['target'];
  /** 指定用户被锁定、注销时候显示的头像 */
  useDefaulAvatar?: boolean;
};
const CustomAvatar: React.FC<CustomAvatarProps> = ({
  id,
  size,
  target,
  src,
  useDefaulAvatar = false,
  style = {},
  ...props
}) => {
  const matchFlag = 'no_portrait.png';
  let avatarComp;

  if (
    !useDefaulAvatar &&
    typeof src === 'string' &&
    src.startsWith(matchFlag)
  ) {
    avatarComp = <TextAvatar src={src} style={style} size={size} {...props} />;
  } else {
    avatarComp = (
      <Avatar
        src={useDefaulAvatar ? noPortrait : src}
        style={style}
        size={size}
        // 图片存在但 404 等失败情况, 将使用 icon (src 必须存在才使用 icon, 否则头像会因为 src 是 undefined 而闪烁)
        icon={
          src && (
            <img
              src={noPortrait}
              width={Number(size)}
              height={Number(size)}
              alt="头像"
            />
          )
        }
        {...props}
      />
    );
  }

  return avatarComp;
};
export type { CustomAvatarProps };
export default CustomAvatar;
