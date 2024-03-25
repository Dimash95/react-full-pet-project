import axios from "axios";

export const getProductsByCategory = async (categoryId: string, searchedValue: string) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${searchedValue}&price_min=0&price_max=1000&categoryId=${categoryId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
