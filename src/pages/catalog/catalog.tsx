import { useEffect, useState } from "react";
import { getCategories } from "../../api/get-categories";
import Category from "./catalog-categories/catalog-categories";
import styles from "./catalog.module.css";

function Catalog() {
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
  return (
    <div className={styles.content}>
      <Category categories={categories} />
    </div>
  );
}

export default Catalog;
