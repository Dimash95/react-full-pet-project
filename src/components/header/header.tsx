import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ThemeContext } from "../../context";

import { FaReact } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";

import { Switch } from "antd";
import classNames from "classnames";
import styles from "./header.module.css";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

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
          <NavLink to="/react-full-pet-project/catalog/" className={setActivePage}>
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
        <NavLink to="/react-full-pet-project/login" className={setActivePage}>
          <CgProfile className={styles.icon} />
        </NavLink>
        <NavLink to="/react-full-pet-project/cart" className={setActivePage}>
          <TiShoppingCart className={styles.icon} />
        </NavLink>

        <Switch defaultChecked={theme === "dark"} onChange={onChange} />
      </div>
    </div>
  );
};

export default Header;
