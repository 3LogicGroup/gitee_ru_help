import * as React from 'react';
import cn from 'classnames';
import iconConfig from './iconConfig';

interface IconProp {
  gitee?: string;
  className?: string;

  [propName: string]: any;
}

const Icon: React.FC<IconProp> = ({ gitee = '', className, ...props }): React.ReactElement | null => {
  if (!gitee) {
    return null;
  }
  const iconClass = iconConfig.gitee(gitee);
  const basicClass = `icon ${iconClass}`;
  const finalClass = cn(basicClass, className);

  return <i {...props} className={finalClass} />;
};

export default Icon;
