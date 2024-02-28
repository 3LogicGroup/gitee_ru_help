import React from 'react';
import cn from 'classnames';
import Icon from '@site/src/components/Misc/Icon';
import { useQueryClient } from 'react-query';
import client from '../../../graphql/client';
import { useLogoutMutation } from '../../../graphql/generated';

const Logout: React.FC<{ className?: string }> = ({ className }) => {
  const queryClient = useQueryClient();
  const { mutate: logout } = useLogoutMutation(client, {
    onSuccess: () => {
       window.location.href="/";
    },
  });
  return (
    <>
      <div
        className={cn(
          'flex items-center py-2 px-5 text-gray-300 hover:bg-slate-800 hover:text-white',
          className
        )}
        onClick={() => {
          logout({});
        }}
      >
        <Icon gitee="exit" className="mr-3 scale-95" />
        <span>退出</span>
      </div>
    </>
  );
};
export { Logout };
