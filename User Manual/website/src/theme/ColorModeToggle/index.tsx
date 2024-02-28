import React, { ComponentProps, useEffect } from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import type ColorModeToggleType from '@theme/ColorModeToggle';
import { switchDarkClassName } from '../../utils';

type Props = ComponentProps<typeof ColorModeToggleType>;

export default function ColorModeToggleWrapper(props: Props): JSX.Element {
  useEffect(() => {
    props.value && switchDarkClassName(props.value);
  }, [props.value]);


  return (
    <ColorModeToggle {...props} />
  );
}
