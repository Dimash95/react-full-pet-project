import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context";

import { Switch } from "antd";
import { FaReact } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

import classNames from "classnames";
import styles from "./menu.module.css";

const Menu = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [activePage, setActivePage] = useState("Home");
  const onChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  const closeMenu = (event?: React.MouseEvent<HTMLAnchorElement>) => {
    const wrapper = document.querySelector(`.${styles.wrapper}`);
    if (wrapper) {
      wrapper.classList.remove(styles.show);
    }
    if (event) setActivePage(event.currentTarget.text);
  };

  const openMenu = () => {
    const wrapper = document.querySelector(`.${styles.wrapper}`);
    if (wrapper) {
      wrapper.classList.add(styles.show);
    }
  };

  return (
    <>
      <div className={styles.logoMenu}>
        <FaReact className={styles.logo} />
        <p className={styles.activePage}>{activePage}</p>
        <IoMenu className={styles.menu} onClick={openMenu} />
      </div>
      <div
        className={classNames(
          theme === "dark" ? styles.wrapperDark : styles.wrapperLight,
          styles.wrapper
        )}
      >
        <IoCloseSharp className={styles.close} onClick={() => closeMenu()} />
        <div className={styles.icons}>
          <Switch defaultChecked={theme === "dark" ? true : false} onChange={onChange} />
        </div>
        <ul className={styles.list}>
          <li>
            <Link
              to="/react-full-pet-project/"
              className={styles.link}
              onClick={(event) => closeMenu(event)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/react-full-pet-project/catalog/1"
              className={styles.link}
              onClick={(event) => closeMenu(event)}
            >
              Catalog
            </Link>
          </li>
          <li>
            <Link
              to="/react-full-pet-project/about"
              className={styles.link}
              onClick={(event) => closeMenu(event)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/react-full-pet-project/contacts"
              className={styles.link}
              onClick={(event) => closeMenu(event)}
            >
              Contacts
            </Link>
          </li>
        </ul>

        <Link
          to="/react-full-pet-project/cart"
          className={styles.link}
          onClick={(event) => closeMenu(event)}
        >
          <TiShoppingCart className={styles.cart} />
        </Link>
      </div>
    </>
  );
};

export default Menu;
