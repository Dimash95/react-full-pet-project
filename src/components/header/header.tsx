import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <FaReact className={styles.logo} />

      <ul>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/catalog/1" className={styles.link}>
            Catalog
          </Link>
        </li>
        <li>
          <Link to="/about" className={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contacts" className={styles.link}>
            Contacts
          </Link>
        </li>
      </ul>
      <div>
        <Link to="/cart" className={styles.link}>
          <TiShoppingCart className={styles.cart} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
