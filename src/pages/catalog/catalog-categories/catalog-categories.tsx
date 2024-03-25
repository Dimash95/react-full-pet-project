import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import CatalogCard from "./catalog-card/catalog-card";
import { Input } from "antd";
import styles from "./catalog-categories.module.css";

type CategoryProps = {
  categories: {
    id: number;
    name: string;
  }[];
};

const Category = ({ categories }: CategoryProps) => {
  const { categoryId = "" } = useParams();
  const [searchedValue, setSearchedValue] = useState("");
  const { Search } = Input;

  function onSearch(value: string) {
    setSearchedValue(value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoriesSortSearch}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <Link
              className={styles.name}
              to={`/catalog/${category.id}`}
              key={category.id}
              onClick={() => setSearchedValue("")}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className={styles.sortSearch}>
          <Search placeholder="input search text" style={{ width: 300 }} onSearch={onSearch} />
        </div>
      </div>
      <div>
        <CatalogCard categoryId={categoryId} searchedValue={searchedValue} />
      </div>
    </div>
  );
};

export default Category;
