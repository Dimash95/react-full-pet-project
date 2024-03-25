import { useEffect, useState } from "react";
import { getTopProducts } from "../../../api/get-top-products";
import { TiShoppingCart } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import styles from "./home-card.module.css";
import { Link } from "react-router-dom";
import { DetailProductType } from "../../../types/detail-product";

const Card = () => {
  const [topProducts, setTopProducts] = useState<DetailProductType[]>([]);
  const [offset, setOffset] = useState(0);

  const displayTopProducts = async (offset: number) => {
    const fetchedItems = await getTopProducts(offset);
    if (fetchedItems) {
      setTopProducts(fetchedItems.data);
    }
  };

  useEffect(() => {
    displayTopProducts(offset);
  }, [offset]);

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
              <Link to={`/catalog/${product.category?.id}/detail/${product.id}`}>
                <img src={product.images?.[0]} alt={product.title} className={styles.cardImage} />
              </Link>
              <p className={styles.name}>{product.title}</p>
              <div className={styles.priceCartWrapper}>
                <p>{product.price} $</p>
                <TiShoppingCart className={styles.cart} />
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
