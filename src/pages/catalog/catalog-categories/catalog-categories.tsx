import { NavLink, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef(null);
  const [searchedValue, setSearchedValue] = useState("");
  const { Search } = Input;

  function onSearch(value: string) {
    setSearchedValue(value);
  }

  const setActiveCategory = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.activeLink : styles.link;

  useEffect(() => {
    if (inputRef.current) (inputRef.current as HTMLInputElement)?.focus();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoriesSortSearch}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <NavLink
              className={setActiveCategory}
              to={`/react-full-pet-project/catalog/${category.id}`}
              key={category.id}
              onClick={() => setSearchedValue("")}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
        <div className={styles.sortSearch}>
          <Search
            ref={inputRef}
            placeholder="Search ..."
            style={{ width: 300 }}
            onSearch={onSearch}
          />
        </div>
      </div>
      <div>
        <CatalogCard categoryId={categoryId} searchedValue={searchedValue} />
      </div>
    </div>
  );
};

export default Category;
