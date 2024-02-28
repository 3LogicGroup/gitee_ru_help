import React, { ComponentProps } from 'react';
import { Skeleton } from 'gitee-ui';
import { useQueryClient } from 'react-query';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import cn from 'classnames';
import { IconShieldEdu, IconShieldEnt, IconShieldOrg } from '@gitee/icons-react';
import { Loading } from '../../Loading';
import { useMyNamespacesQuery, DashboardQuery } from '../../../graphql/generated';
import client from '../../../graphql/client';

const Namespaces: React.FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as { [key: string]: string };
  const SITE_URL = customFields.SITE_URL;
  const queryClient = useQueryClient();
  const { data: dashboardDatas, status } = queryClient.getQueryState<DashboardQuery>('dashboard') || {};

  const { nodes: namespaces, pageInfo } = dashboardDatas?.current_user?.namespaces || {};
  const { refetch: getNamespaces, isFetching: loadMoreFetching } = useMyNamespacesQuery(
    client,
    {
      first: 5,
      after: pageInfo?.endCursor,
    },
    {
      enabled: false,
      onSuccess: (res) => {
        const { nodes, pageInfo } = res.current_user?.namespaces || {};
        if (dashboardDatas?.current_user?.namespaces) {
          dashboardDatas.current_user.namespaces.nodes = namespaces?.concat(nodes || []);
          dashboardDatas.current_user.namespaces.pageInfo = {
            endCursor: pageInfo?.endCursor,
            hasNextPage: pageInfo?.hasNextPage || false,
          };
        }
        queryClient.setQueryData('dashboard', dashboardDatas);
      },
    },
  );
  return (
    <>
      <div className={cn('mt-6 sm:mt-0', className)}>
        <div className="border-b border-solid border-gray-200 pb-1 text-base font-medium sm:hidden">
          我的企业/高校/组织
        </div>
        <Skeleton loading={status === 'idle' || status === 'loading'} className="mt-2" active>
          {namespaces?.length ? (
            <ul className="mt-2">
              {namespaces.map((item) => {
                let path = item?.path;
                if (item?.type === 'ENTERPRISE') {
                  path = path + '/dashboard';
                }
                return (
                  <li
                    key={item?.id}
                    className="flex cursor-pointer items-center justify-between pt-2 pb-2 sm:px-5 sm:hover:bg-slate-800 sm:hover:text-white"
                  >
                    <div className="mr-4 flex-1 overflow-hidden">
                      <a
                        className={cn(
                          'flex items-center sm:text-gray-300 sm:hover:text-gray-300 sm:hover:no-underline',
                        )}
                        target="_blank"
                        rel="noreferrer"
                        href={`${SITE_URL}/${path}`}
                        title={item?.display_name}
                      >
                        {item?.type === 'ENTERPRISE' && item.is_edu && (
                          <span className="inline-flex items-center" title="高校">
                            <IconShieldEdu color="#36B37E" width={18} />
                          </span>
                        )}
                        {item?.type === 'ENTERPRISE' && !item.is_edu && (
                          <span className="inline-flex items-center" title="企业">
                            <IconShieldEnt color="#77A7FF" width={18} />
                          </span>
                        )}
                        {item?.type === 'GROUP' && (
                          <span className="inline-flex items-center" title="组织">
                            <IconShieldOrg color="#C26A00" width={18} />
                          </span>
                        )}
                        <div className="ml-2 truncate">{item?.display_name}</div>
                      </a>
                    </div>
                  </li>
                );
              })}
              {pageInfo?.hasNextPage ? (
                <li className="mt-2 sm:ml-5">
                  {loadMoreFetching ? (
                    <Loading />
                  ) : (
                    <a href="#" className="sm:text-gray-400" onClick={() => getNamespaces()}>
                      加载更多
                    </a>
                  )}
                </li>
              ) : null}
            </ul>
          ) : (
            <div className="mt-8 sm:ml-5 sm:mt-2">
              <div>
                你还没有加入
                <a href={`${SITE_URL}/organizations/new`}>组织</a>/<a href={`${SITE_URL}/enterprises`}>企业</a>
              </div>
              <div>
                <a href={`${SITE_URL}/enterprises`}>了解 Gitee 企业版</a>或<a href={`${SITE_URL}/enterprises/new`}>创建免费企业版</a>
              </div>
            </div>
          )}
        </Skeleton>
      </div>
    </>
  );
};

export default Namespaces;
