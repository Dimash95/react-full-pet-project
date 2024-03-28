import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTopProducts } from "../../../api/get-top-products";
import { DetailProductType } from "../../../types/detail-product";

import type { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCartItemSlice } from "../../../store/slices/cart-items-ids-slice";

import { TiShoppingCart } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import styles from "./home-card.module.css";

const Card = () => {
  const cartItemsIds = useSelector((state: RootState) => state.cartItemsIds.cartItemsIds);
  const dispatch = useDispatch();

  const [topProducts, setTopProducts] = useState<DetailProductType[]>([]);
  const [offset, setOffset] = useState(0);

  const displayTopProducts = async (offset: number) => {
    const fetchedItems = await getTopProducts(offset);
    if (fetchedItems) {
      setTopProducts(fetchedItems.data);
    }
  };

  const addToCart = (id: number) => {
    if (!cartItemsIds.includes(id)) {
      dispatch(addToCartItemSlice(id));
    }
  };

  const cartItemsIdsString = cartItemsIds.join(",");

  useEffect(() => {
    displayTopProducts(offset);
  }, [offset, cartItemsIdsString]);

  function onHandleOffset(number: number) {
    if (offset === 0 && number === -1) {
      return;
    }
    if (offset === topProducts.length && number === 1) {
      return;
    }
    setOffset(offset + number);
  }
  return (
    <>
      <h2 className={styles.title}>Top products</h2>
      <div className={styles.pagination}>
        <button className={styles.button} disabled={offset === 0 ? true : false}>
          <FaChevronLeft className={styles.arrow} onClick={() => onHandleOffset(-1)} />
        </button>
        <div className={styles.cards}>
          {topProducts.map((product) => (
            <div className={styles.card} key={product.id}>
              <Link
                to={`/react-full-pet-project/catalog/${product.category?.id}/detail/${product.id}`}
              >
                <img src={product.images?.[0]} alt={product.title} className={styles.cardImage} />
              </Link>
              <p className={styles.name}>{product.title?.slice(0, 20) + "..."}</p>
              <div className={styles.priceCartWrapper}>
                <p>{product.price} $</p>
                {cartItemsIds.includes(product.id) ? (
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
        <button className={styles.button} disabled={offset === topProducts.length ? true : false}>
          <FaAngleRight className={styles.arrow} onClick={() => onHandleOffset(1)} />
        </button>
      </div>
    </>
  );
};

export default Card;
