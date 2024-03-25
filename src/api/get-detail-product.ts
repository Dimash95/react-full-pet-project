import axios from "axios";

export const getDetailProduct = async (cardId: string) => {
  try {
    const response = await axios.get(` https://api.escuelajs.co/api/v1/products/${cardId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
