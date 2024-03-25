import axios from "axios";

export const getTopProducts = async (offset: number) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=4`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
