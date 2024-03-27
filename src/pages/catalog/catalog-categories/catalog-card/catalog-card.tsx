import { TiShoppingCart } from "react-icons/ti";
import styles from "./catalog-card.module.css";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../../api/get-products-by-category";
import { Link } from "react-router-dom";
import { ProductType } from "../../../../types/product";

type CatalogCardProps = {
  categoryId: string;
  searchedValue: string;
};

const CatalogCard = ({ categoryId, searchedValue }: CatalogCardProps) => {
  const [productsByCategory, setProductsByCategory] = useState<ProductType[]>([]);

  const [cartItemsIds, setCartItemsIds] = useState<Set<number>>(() => {
    const savedCart = localStorage.getItem("cart");
    return new Set(savedCart ? (JSON.parse(savedCart) as number[]) : []);
  });

  const addToCart = (id: number) => {
    if (!cartItemsIds.has(id)) {
      const newCartItemIds = new Set(cartItemsIds).add(id);
      setCartItemsIds(newCartItemIds);
      localStorage.setItem("cart", JSON.stringify([...newCartItemIds]));
    }
  };

  useEffect(() => {
    const displayProducts = async (categoryId: string, searchedValue: string) => {
      const fetchedProducts = await getProductsByCategory(categoryId, searchedValue);
      if (fetchedProducts) setProductsByCategory(fetchedProducts.data);
    };
    displayProducts(categoryId, searchedValue);
  }, [categoryId, searchedValue]);

  return (
    <>
      <div className={styles.cards}>
        {productsByCategory.map((product) => (
          <div className={styles.card} key={product.id}>
            <Link to={`/react-full-pet-project/catalog/${categoryId}/detail/${product.id}`}>
              <img src={product.images[0]} alt={product.title} className={styles.cardImage} />
            </Link>
            <p className={styles.name}>{product.title}</p>
            <div className={styles.priceCartWrapper}>
              <p>{product.price} $</p>
              {cartItemsIds.has(product.id) ? (
                <Link to="/react-full-pet-project/cart" className={styles.addedToCart}>
                  Go to cart
                </Link>
              ) : (
                <TiShoppingCart className={styles.cart} onClick={() => addToCart(product.id)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CatalogCard;
