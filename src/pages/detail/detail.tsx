import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailProduct } from "../../api/get-detail-product";
import { DetailProductType } from "../../types/detail-product";
import styles from "./detail.module.css";

export const Detail = () => {
  const { cardId = "" } = useParams<{ cardId?: string }>();
  const [detailProduct, setDetailProduct] = useState<DetailProductType>({});

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
        {cartItemsIds.has(detailProduct.id) ? (
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
