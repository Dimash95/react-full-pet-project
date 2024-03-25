import axios from "axios";
import { ProductType } from "../types/product";

export const getProductsByIds = async (cartItemsIds: Set<number>) => {
  try {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/`);

    const filteredProducts = response.data.filter((product: ProductType) =>
      cartItemsIds.has(product.id)
    );

    return filteredProducts;
  } catch (error) {
    console.error(error);
  }
};
