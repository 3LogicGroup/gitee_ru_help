import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Tooltip } from 'gitee-ui';
import udeskImg from './images/udesk.png';
declare global {
  interface Window {
    ud: any;
  }
}
type UdeskServerProps = {
  className?: string;
};
const UdeskServer: React.FC<UdeskServerProps> = ({ className }) => {
  const [udeskVisible, setUdeskVisible] = useState(window.ud?.visible);

  useEffect(() => {
    const handleVisible = (e: any) => {
      const visible = e?.value?.visible;
      setUdeskVisible(visible);
    };
    window.addEventListener('udeskVisible', handleVisible);
    return () => {
      window.removeEventListener('udeskVisible', handleVisible);
    };
  }, []);
  return (
    <>
      <div
        className={cn('cursor-pointer md:hidden', udeskVisible ? 'hidden' : '', className)}
        onClick={(e) => {
          if (window && typeof window.ud === 'function') {
            window.ud(window.ud.visible ? 'hidePanel' : 'showPanel');
          }
        }}
      >
        <Tooltip
          color="rgba(0,0,0,.9)"
          overlayInnerStyle={{ color: 'white' }}
          placement="left"
          title="智能客服"
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
        >
          <img width={40} height={40} src={udeskImg} alt="智能客服" />
        </Tooltip>
      </div>
    </>
  );
};
export default UdeskServer;
