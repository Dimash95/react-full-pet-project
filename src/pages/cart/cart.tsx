import { useEffect, useState } from "react";
import { getProductsByIds } from "../../api/get-products-by-ids";
import { ProductType } from "../../types/product";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./cart.module.css";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  const [cartItemsIds] = useState<Set<number>>(() => {
    const savedCart = localStorage.getItem("cart");
    return new Set(savedCart ? (JSON.parse(savedCart) as number[]) : []);
  });

  const displayProducts = async (cartItemsIds: Set<number>) => {
    const fetchedProducts = await getProductsByIds(cartItemsIds);
    if (fetchedProducts) setCartProducts(fetchedProducts);
  };
  useEffect(() => {
    displayProducts(cartItemsIds);
  }, [cartItemsIds]);

  const removeFromCart = (id: number) => {
    cartItemsIds.delete(id);
    localStorage.setItem("cart", JSON.stringify([...cartItemsIds]));
    displayProducts(cartItemsIds);
    // setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  return (
    <div className={styles.content}>
      <div className={styles.cards}>
        {cartProducts.map((product) => (
          <div className={styles.card} key={product.id}>
            <div className={styles.remove} onClick={() => removeFromCart(product.id)}>
              <IoCloseSharp />
            </div>
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
