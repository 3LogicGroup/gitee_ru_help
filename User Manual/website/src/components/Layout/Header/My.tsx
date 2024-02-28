import React, { type ComponentProps, type PropsWithChildren } from 'react';
import { Dropdown, Divider as GDivider } from 'gitee-ui';
import { Loading } from '../../Loading';
import { useUserContext } from '../../../context/UserContext';

const Item = ({
  href,
  title,
  children,
}: PropsWithChildren<{
  href: string;
  title: string;
}>): JSX.Element => (
  <a
    href={href}
    title={title}
    className="gitee-header__my__item block truncate py-2 px-4 text-gray-300 hover:bg-slate-800 hover:text-white"
  >
    {children}
  </a>
);

const ItemGroupHeader = ({
  name,
  num,
  allHref,
  allText,
}: {
  name: string;
  num: number | undefined;
  allText?: string;
  allHref?: string;
}) => (
  <div className="flex justify-between px-4 text-gray-400">
    <div>
      {name} ({num || 0})
    </div>
    {/* 项目没有"全部"按钮 */}
    {allHref && (
      <a href={allHref} className="gitee-header__my__all-btn text-gray-400 hover:text-white">
        {allText}
      </a>
    )}
  </div>
);

const Divider = () => (
  <GDivider className="gitee-header__my__divider my-1 mx-4 w-auto min-w-max max-w-full border-t-gray-600 px-4" />
);
const My: React.FC<ComponentProps<'div'>> = ({ children, ...props }) => {
  const { isLoading, data } = useUserContext();
  const currentUser = data?.current_user;
  const userHref = currentUser?.href;

  const enterprises = currentUser?.enterprises;
  const groups = currentUser?.groups;
  const programs = currentUser?.programs;
  const projects = currentUser?.projects;

  const menus = (
    <div className="gitee-header__my__menu w-64 space-y-2 bg-gray-700 py-3 text-sm text-gray-300">
      <div>
        <ItemGroupHeader
          name={'企业'}
          num={enterprises?.total_count}
          allHref="https://gitee.ru/dashboard/enterprises"
          allText={'全部'}
        />
        <Divider />
        {enterprises?.nodes?.map((item) => {
          return (
            <Item href={`https://gitee.ru/${item?.path}/dashboard`} key={item?.id} title={item?.name || ''}>
              {item?.name}
            </Item>
          );
        })}
        {!enterprises?.nodes?.length && <div className="pt-3 text-center">{'暂无企业'}</div>}
      </div>
      <div>
        <ItemGroupHeader
          name={'组织'}
          num={groups?.total_count}
          allHref="https://gitee.ru/dashboard/groups"
          allText={'全部'}
        />
        <Divider />
        {groups?.nodes?.map((item) => {
          return (
            <Item href={`/${item?.path}`} title={item?.name || ''} key={item?.id}>
              {item?.name}
            </Item>
          );
        })}
        {!groups?.nodes?.length && <div className="pt-3 text-center">{'暂无组织'}</div>}
      </div>
      <div>
        <ItemGroupHeader name={'项目'} num={programs?.total_count} />
        <Divider />
        {programs?.nodes?.map((item) => {
          return (
            <Item
              href={`https://gitee.ru/${item?.enterprise?.path}/dashboard/programs/${item?.id}`}
              title={item?.name || ''}
              key={item?.id}
            >
              {item?.name}
            </Item>
          );
        })}
        {!programs?.nodes?.length && <div className="pt-3 text-center">{'暂无项目'}</div>}
      </div>
      <div>
        <ItemGroupHeader
          name={'仓库'}
          num={projects?.total_count}
          allHref={`https://gitee.ru${userHref}/projects`}
          allText={'全部'}
        />
        <Divider />
        {projects?.nodes?.map((item) => {
          return (
            <Item href={`https://gitee.ru/${item?.pwd}`} title={item?.name || ''} key={item?.id}>
              {item?.name}
            </Item>
          );
        })}
        {!projects?.nodes?.length && <div className="pt-3 text-center">{'暂无仓库'}</div>}
      </div>
    </div>
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Dropdown
          className="gitee-header__my"
          overlay={menus}
          arrow={false}
          align={{ offset: [0, 10] }}
          mouseEnterDelay={0}
          getPopupContainer={(triggerNode) => triggerNode}
          {...props}
        >
          <div>{children}</div>
        </Dropdown>
      )}
    </>
  );
};

export { My };
