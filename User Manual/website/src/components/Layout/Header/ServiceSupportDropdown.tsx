import React from 'react';
import { Dropdown, DropdownProps } from 'gitee-ui';

type ServiceSupportDropdownProps = Omit<DropdownProps, 'overlay'> & {
  contactUsModalClassName?: string;
  contactUsModalContactType?: 'enterprise' | 'education' | 'privatization' | 'other';
};

const ServiceSupportDropdown: React.FC<ServiceSupportDropdownProps> = ({
  children,
  contactUsModalClassName,
  contactUsModalContactType = 'enterprise',
  ...props
}) => {
  const itemClassName =
    'gitee-header__service-support__item flex items-center py-2 px-5 text-[rgb(209,213,219)] hover:bg-slate-800 hover:text-white cursor-pointer';
  const menus = (
    <div className="gitee-header__service-support__menu py-2 text-sm">
      {/* <a href="/?utm_sources=site_nav" target="_blank" className={itemClassName}>
        帮助中心
      </a> */}
      <a href="/enterprise" target="_blank" className={itemClassName}>
        产品文档
      </a>
      <span
        className={itemClassName}
        onClick={(e) => {
          if (window && typeof window.ud === 'function') {
            window.ud(window.ud.visible ? 'hidePanel' : 'showPanel');
          }
        }}
      >
        智能客服
      </span>
      <a href="https://blog.gitee.ru/?utm_sources=site_nav" target="_blank" className={itemClassName}>
        博客
      </a>
    </div>
  );
  return (
    <Dropdown overlay={menus} arrow={false} getPopupContainer={(triggerNode) => triggerNode} {...props}>
      <div>{children}</div>
    </Dropdown>
  );
};
export { ServiceSupportDropdown };
