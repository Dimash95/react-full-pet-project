import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories?offset=0&limit=4"
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
