import { FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import styles from "./footer.module.css";
import classNames from "classnames";
import { ThemeContext } from "../../context";
import { useContext } from "react";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={classNames(
        theme === "dark" ? styles.wrapperDark : styles.wrapperLight,
        styles.wrapper
      )}
    >
      <FaReact className={styles.logo} />
      <div className={styles.uni}>Made by Dimash</div>
      <div className={styles.githubLinkedin}>
        <a href="" className={styles.link}>
          <FaGithub className={styles.icon} />
        </a>
        <a href="" className={styles.link}>
          <FaLinkedin className={styles.icon} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
