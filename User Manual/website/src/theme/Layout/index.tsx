import React, { ComponentProps, useEffect } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { switchDarkClassName } from '../../utils';
import sensor from '../../utils/sensor';
import udesk from '../../utils/udesk';

type Props = ComponentProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  const location = useLocation();
  const isBrowser = useIsBrowser();
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as { [key: string]: string };
  useEffect(() => {
    isBrowser && udesk.init();
    isBrowser && sensor.init(customFields.SENSOR_SERVER_URL);
  }, [isBrowser, customFields]);
  useEffect(() => {
    localStorage.theme && switchDarkClassName(localStorage.theme);
  }, [location.pathname]);

  return (
    <>
      <Layout {...props} />
    </>
  );
}
