import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { getCategories } from "../../api/get-categories";
import CatalogCard from "./catalog-card/catalog-card";
import { CategoryType } from "../../types/category";

import { Input } from "antd";
import styles from "./catalog.module.css";

function Catalog() {
  const { categoryId = "" } = useParams();
  const inputRef = useRef(null);
  const [searchedValue, setSearchedValue] = useState(localStorage.getItem("searchedValue") || "");

  const [categories, setCategories] = useState<CategoryType[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchedValue(e.target.value);
    localStorage.setItem("searchedValue", e.target.value);
  }

  function clearSearch() {
    setSearchedValue("");
    localStorage.setItem("searchedValue", "");
  }

  const setActiveCategory = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.activeLink : styles.link;

  const displayCategories = async () => {
    const fetchedItems = await getCategories();
    if (fetchedItems) {
      setCategories(fetchedItems.data);
    }
  };

  useEffect(() => {
    displayCategories();
    if (inputRef.current) (inputRef.current as HTMLInputElement)?.focus();
  }, [searchedValue]);

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
          <Input
            ref={inputRef}
            placeholder="Search ..."
            style={{ width: 300 }}
            value={searchedValue}
            onChange={handleChange}
          />
          <p className={styles.clear} onClick={clearSearch}>
            Clear
          </p>
        </div>
      </div>
      <div>
        <CatalogCard categoryId={categoryId} searchedValue={searchedValue} />
      </div>
    </div>
  );
}

export default Catalog;
