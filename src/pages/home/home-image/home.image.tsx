import Image from "../../../assets/img/car.png";
import styles from "./home-image.module.css";

const HomeImage = () => {
  return (
    <>
      <img src={Image} alt="image" className={styles.image} />
    </>
  );
};

export default HomeImage;
