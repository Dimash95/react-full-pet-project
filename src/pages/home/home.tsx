import HomeCategories from "./home-categories/home-categories";
import Card from "./home-card/home-card.tsx";
import HomeImage from "./home-image/home.image";
import HomeText from "./home-text/home-text";
import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.content}>
      <HomeImage />
      <HomeText />
      <HomeCategories />
      <Card />
    </div>
  );
}

export default Home;
