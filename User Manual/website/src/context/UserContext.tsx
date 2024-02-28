import React, { type PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';
import { useUserInfoQuery, UserInfoQuery } from '../graphql/generated';
import { UseQueryResult } from 'react-query';
import client from '../graphql/client';

const UserContext = createContext<UseQueryResult<UserInfoQuery>>({} as UseQueryResult<UserInfoQuery>);

const UserContextProvider: React.FC<PropsWithChildren<{ disabled?: boolean }>> = ({ disabled, children }) => {
  const userData = useUserInfoQuery(client, undefined, {
    enabled: !disabled,
  });
  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}
export { UserContextProvider };
