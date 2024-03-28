import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProductsByCategory } from "../../../../api/get-products-by-category";
import { ProductType } from "../../../../types/product";

import type { RootState } from "../../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCartItemSlice } from "../../../../store/slices/cart-items-ids-slice";

import { TiShoppingCart } from "react-icons/ti";
import styles from "./catalog-card.module.css";

type CatalogCardProps = {
  categoryId: string;
  searchedValue: string;
};

const CatalogCard = ({ categoryId, searchedValue }: CatalogCardProps) => {
  const cartItemsIds = useSelector((state: RootState) => state.cartItemsIds.cartItemsIds);
  const dispatch = useDispatch();

  const [productsByCategory, setProductsByCategory] = useState<ProductType[]>([]);

  const addToCart = (id: number) => {
    if (!cartItemsIds.includes(id)) {
      dispatch(addToCartItemSlice(id));
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
            <p className={styles.name}>{product.title.slice(0, 20) + "..."}</p>
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
    </>
  );
};

export default CatalogCard;
