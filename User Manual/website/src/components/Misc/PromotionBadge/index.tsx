import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const PromotionBadge = () => {
  const {
    i18n: { currentLocale},
  } = useDocusaurusContext();
  if (currentLocale !== 'zh-CN') {
    return null;
  }
  return (
    <sup className="absolute -right-1/2 top-0 inline-block -translate-y-2 scale-90 rounded-sm bg-red-700 py-px px-1 text-xs font-normal text-white">
      特惠
    </sup>
  );
};
export default PromotionBadge;
