import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { ThemeContext } from "../../context";

import { FaReact } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";

import { Switch } from "antd";
import classNames from "classnames";
import styles from "./header.module.css";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <NavLink to="/react-full-pet-project/login">Login</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to="/react-full-pet-project/registration">Registration</NavLink>,
  },
];

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {}, [accessToken]);

  const setActivePage = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.activeLink : styles.link;

  const onChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
    <div
      className={classNames(
        theme === "dark" ? styles.wrapperDark : styles.wrapperLight,
        styles.wrapper
      )}
    >
      <FaReact className={styles.logo} />
      <ul className={styles.list}>
        <li>
          <NavLink to="/react-full-pet-project/" end className={setActivePage}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/react-full-pet-project/catalog/1" className={setActivePage}>
            Catalog
          </NavLink>
        </li>
        <li>
          <NavLink to="/react-full-pet-project/about" className={setActivePage}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/react-full-pet-project/contacts" className={setActivePage}>
            Contacts
          </NavLink>
        </li>
      </ul>
      <div className={styles.icons}>
        {accessToken ? (
          <NavLink to="/react-full-pet-project/profile" className={setActivePage}>
            <CgProfile className={styles.icon} />
          </NavLink>
        ) : (
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <CgProfile className={styles.icon} />
          </Dropdown>
        )}
        <NavLink to="/react-full-pet-project/cart" className={setActivePage}>
          <TiShoppingCart className={styles.icon} />
        </NavLink>

        <Switch defaultChecked={theme === "dark"} onChange={onChange} />
      </div>
    </div>
  );
};

export default Header;
