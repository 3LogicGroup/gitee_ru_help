import React from 'react';
import cn from 'classnames';
import { useThemeConfig } from '@docusaurus/theme-common';
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import MeiliSearchInput from '../../../components/MeiliSearchInput';


import styles from './styles.module.css';

export default function NavbarContent() {
  const items = useThemeConfig().navbar.items as NavbarItemConfig[];

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <div className={cn("navbar__inner")}>
      <div className="navbar__items">
        <NavbarMobileSidebarToggle />
        <NavbarLogo />
        {items.map((item, i) => (
          <NavbarItem {...item} key={i} />
        ))}
      </div>
      <div className="navbar__items navbar__items--right md:hidden">
        <NavbarColorModeToggle className={styles.colorModeToggle} />
        {!searchBarItem && (
          <NavbarSearch className={styles.navbarSearch}>
            <MeiliSearchInput />
          </NavbarSearch>
        )}
      </div>
    </div>
  );
}
