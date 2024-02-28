import React, { forwardRef } from 'react';
import cn from 'classnames';
import { useLocation } from '@docusaurus/router';
import type { ComponentProps, ReactNode, Ref } from 'react';

type ActiveLinkProps = ComponentProps<'a'> & {
  activeClassName?: string;
  exact?: boolean;
  isActive?: boolean;
  ref?: Ref<HTMLAnchorElement>;
};

const ActiveLink = forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  (
    {
      children,
      className,
      activeClassName,
      exact,
      isActive: inputIsActive,
      ...props
    },
    ref
  ) => {
    const { pathname } = useLocation();
    const isActive =
      inputIsActive ??
      (props.href &&
        (pathname.startsWith(props.href) ||
          (exact && pathname === props.href)));
    return (
      <a
        ref={ref}
        className={cn(
          className,
          activeClassName && { [activeClassName]: isActive }
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

ActiveLink.displayName = 'ActiveLink';

type NavItemProps = ComponentProps<'li'> & {
  aProps?: ActiveLinkProps;
  customRender?: ReactNode;
};

const NavItem: React.FC<NavItemProps> = ({
  className,
  children,
  aProps,
  customRender,
  ...props
}) => {
  return (
    <li
      className={cn(
        'mx-3 flex-shrink-0 delay-300 first:ml-0 last:mr-0 md:mx-2',
        className
      )}
      {...props}
    >
      {customRender ? (
        customRender
      ) : (
        <ActiveLink
          className="relative flex text-base text-gray-300 hover:text-white"
          activeClassName="font-bold"
          href={`${aProps?.href || ''}`}
          {...aProps}
        >
          {children}
        </ActiveLink>
      )}
    </li>
  );
};

export { NavItem };
