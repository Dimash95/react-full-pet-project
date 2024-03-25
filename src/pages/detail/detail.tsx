import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailProduct } from "../../api/get-detail-product";
import styles from "./detail.module.css";

type DetailProductType = {
  images?: string;
  title?: string;
  description?: string;
  category?: { name?: string };
  price?: number;
};

export const Detail = () => {
  const { cardId = "" } = useParams<{ cardId?: string }>();
  const [detailProduct, setDetailProduct] = useState<DetailProductType>({});

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
      <img className={styles.image} src={detailProduct.images} alt="" />
      <div className={styles.text}>
        <h1 className={styles.title}>{detailProduct.title}</h1>
        <p>{detailProduct.description}</p>
        <p>
          <span className={styles.span}>Category:</span> {detailProduct.category?.name}
        </p>
        <p className={styles.price}>
          <span className={styles.span}>Price:</span> {detailProduct.price} $
        </p>
        <Link to={`/cart`}>
          <button className={styles.checkout}>Add to cart</button>
        </Link>
      </div>
    </div>
  );
};
