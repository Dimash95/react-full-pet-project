import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getDetailProduct } from "../../api/get-detail-product";
import { DetailProductType } from "../../types/detail-product";

import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCartItemSlice } from "../../store/slices/cart-items-ids-slice";

import styles from "./detail.module.css";

export const Detail = () => {
  const cartItemsIds = useSelector((state: RootState) => state.cartItemsIds.cartItemsIds);
  const dispatch = useDispatch();

  const { cardId = "" } = useParams<{ cardId?: string }>();
  const [detailProduct, setDetailProduct] = useState<DetailProductType>({
    id: 0,
    images: [],
    title: "",
    description: "",
    category: { id: 0, name: "" },
    price: 0,
  });

  const addToCart = (id: number) => {
    if (!cartItemsIds.includes(id)) {
      dispatch(addToCartItemSlice(id));
    }
  };

  useEffect(() => {
    const displayDetailProduct = async () => {
      if (cardId) {
        const fetchedDetailProduct = await getDetailProduct(cardId);
        if (fetchedDetailProduct) setDetailProduct(fetchedDetailProduct.data);
      }
    };

    displayDetailProduct();
  }, [cardId]);

  return (
    <div className={styles.content}>
      <img className={styles.image} src={detailProduct.images?.[0]} alt="" />
      <div className={styles.text}>
        <h1 className={styles.title}>{detailProduct.title}</h1>
        <p>{detailProduct.description}</p>
        <p>
          <span className={styles.span}>Category:</span> {detailProduct.category?.name}
        </p>
        <p className={styles.price}>
          <span className={styles.span}>Price:</span> {detailProduct.price} $
        </p>
        {cartItemsIds.includes(detailProduct.id) ? (
          <Link to="/react-full-pet-project/cart" className={styles.checkout}>
            Go to cart
          </Link>
        ) : (
          <button className={styles.checkout} onClick={() => addToCart(detailProduct.id)}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
