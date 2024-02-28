import React, { PropsWithChildren } from 'react';
import cn from 'classnames';

const Container: React.FC<PropsWithChildren<{ className?: string }>> = (props) => {
  return (
    <div className={cn('mx-auto w-[1240px] min-w-[1240px] px-5 xl:w-full xl:min-w-full', props.className)}>
      {props.children}
    </div>
  );
};

export default Container;
