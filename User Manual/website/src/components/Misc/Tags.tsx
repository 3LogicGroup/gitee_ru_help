import React, { MouseEvent } from 'react';

interface TagsProps {
  tags?: string[];
  children?: React.ReactNode;
  onClick?: (e: MouseEvent, val: string) => void;
}

const Tags = ({ children, tags, onClick }: TagsProps) => {
  if (Array.isArray(tags) && tags.length > 0) {
    return (
      <>
        {tags.map((tag) => {
          return (
            <Tags.Item key={tag} onClick={(e) => onClick(e, tag)}>
              {tag}
            </Tags.Item>
          );
        })}
      </>
    );
  }
  return <>{children}</>;
};

Tags.Item = ({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <span
      className={
        'mr-2 inline-block cursor-pointer rounded bg-[#efefef] px-2 py-1 text-sm text-[#6a6a6a] active:bg-[#e8e8e8]'
      }
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Tags;
