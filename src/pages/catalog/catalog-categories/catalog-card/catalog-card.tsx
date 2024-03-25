import { TiShoppingCart } from "react-icons/ti";
import styles from "./catalog-card.module.css";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../../api/get-products-by-category";
import { Link } from "react-router-dom";

type CatalogCardProps = {
  categoryId: string;
  searchedValue: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

const CatalogCard = ({ categoryId, searchedValue }: CatalogCardProps) => {
  const [productsByCategory, setProductsByCategory] = useState<Product[]>([]);

  const displayProducts = async (categoryId: string, searchedValue: string) => {
    const fetchedProducts = await getProductsByCategory(categoryId, searchedValue);
    if (fetchedProducts) setProductsByCategory(fetchedProducts.data);
  };

  useEffect(() => {
    displayProducts(categoryId, searchedValue);
  }, [categoryId, searchedValue]);

  const addToCart = (id: number) => {
    console.log("Add to cart", id);
  };

  return (
    <>
      <div className={styles.cards}>
        {productsByCategory.map((product) => (
          <div className={styles.card} key={product.id}>
            <Link to={`/catalog/${categoryId}/detail/${product.id}`}>
              <img src={product.images[0]} alt={product.title} className={styles.cardImage} />
            </Link>
            <p className={styles.name}>{product.title}</p>
            <div className={styles.priceCartWrapper}>
              <p>{product.price} $</p>
              <TiShoppingCart className={styles.cart} onClick={() => addToCart(product.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CatalogCard;
