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
          <Link to="/react-full-pet-project" className={styles.link}>
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
      <div>
        <Link to="/react-full-pet-project/cart" className={styles.link}>
          <TiShoppingCart className={styles.cart} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
