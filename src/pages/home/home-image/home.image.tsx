import { useContext } from "react";
import DarkImage from "../../../assets/img/dark-car.png";
import LightImage from "../../../assets/img/light-car.png";
import { ThemeContext } from "../../../context";
import styles from "./home-image.module.css";

const HomeImage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {theme === "light" ? (
        <img src={LightImage} alt="image" className={styles.image} />
      ) : (
        <img src={DarkImage} alt="image" className={styles.image} />
      )}
    </>
  );
};

export default HomeImage;
