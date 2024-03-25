import { useEffect, useState } from "react";
import { getProductsByIds } from "../../api/get-products-by-ids";
import styles from "./cart.module.css";
import { ProductType } from "../../types/product";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  const [cartItemsIds] = useState<Set<number>>(() => {
    const savedCart = localStorage.getItem("cart");
    return new Set(savedCart ? (JSON.parse(savedCart) as number[]) : []);
  });

  useEffect(() => {
    const displayProducts = async (cartItemsIds: Set<number>) => {
      const fetchedProducts = await getProductsByIds(cartItemsIds);
      if (fetchedProducts) setCartProducts(fetchedProducts);
    };
    displayProducts(cartItemsIds);
  }, [cartItemsIds]);

  return (
    <div className={styles.content}>
      <div className={styles.cards}>
        {cartProducts.map((product) => (
          <div className={styles.card} key={product.id}>
            <Link to={`/react-full-pet-project/catalog/${product.id}/detail/${product.id}`}>
              <img src={product.images[0]} alt={product.title} className={styles.cardImage} />
            </Link>
            <p className={styles.name}>{product.title}</p>
            <div className={styles.priceCartWrapper}>
              <p>{product.price} $</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
