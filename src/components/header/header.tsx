import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Switch } from "antd";
import styles from "./header.module.css";
import { ThemeContext } from "../../context";
import { useContext } from "react";
import classNames from "classnames";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const onChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
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
          <Link to="/react-full-pet-project/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/react-full-pet-project/catalog/1" className={styles.link}>
            Catalog
          </Link>
        </li>
        <li>
          <Link to="/react-full-pet-project/about" className={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link to="/react-full-pet-project/contacts" className={styles.link}>
            Contacts
          </Link>
        </li>
      </ul>
      <div className={styles.icons}>
        <Link to="/react-full-pet-project/cart" className={styles.link}>
          <TiShoppingCart className={styles.cart} />
        </Link>

        <Switch defaultChecked onChange={onChange} />
      </div>
    </div>
  );
};

export default Header;
