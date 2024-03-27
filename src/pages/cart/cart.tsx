import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProductsByIds } from "../../api/get-products-by-ids";
import { ProductType } from "../../types/product";

import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setNewCartItemsSlice } from "../../store/slices/cart-items-ids-slice";

import { IoCloseSharp } from "react-icons/io5";
import styles from "./cart.module.css";

const Cart = () => {
  const cartItemsIds = useSelector((state: RootState) => state.cartItemsIds.cartItemsIds);
  const dispatch = useDispatch();

  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  const displayProducts = async (cartItemsIds: number[]) => {
    const fetchedProducts = await getProductsByIds(cartItemsIds);
    if (fetchedProducts) setCartProducts(fetchedProducts);
  };
  useEffect(() => {
    displayProducts(cartItemsIds);
  }, [cartItemsIds]);

  const removeFromCart = (id: number) => {
    const updatedCartItemsIds = cartItemsIds.filter((itemId) => itemId !== id);
    localStorage.setItem("cart", JSON.stringify([...cartItemsIds]));
    dispatch(setNewCartItemsSlice(updatedCartItemsIds));
    displayProducts(updatedCartItemsIds);
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
