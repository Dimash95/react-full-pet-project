import { Link } from "react-router-dom";

import styles from "./home-categories.module.css";
import { useEffect, useState } from "react";
import { getCategories } from "../../../api/get-categories";

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);

  const displayCategories = async () => {
    const fetchedItems = await getCategories();
    if (fetchedItems) {
      setCategories(fetchedItems.data);
    }
  };

  useEffect(() => {
    displayCategories();
  }, []);
  // const navigate = useNavigate();

  // const displayNavigation = (name) => {
  //   navigate("/catalog/" + name.toLowerCase());
  // };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.categories}>
        {categories.map((category) => (
          <Link
            to={`/catalog/${category.id}`}
            key={category.id}
            className={styles.link}
            // onClick={() => displayNavigation(category.name)}
          >
            <img src={category.image} alt="category" className={styles.image} />
            <p className={styles.name}>{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
