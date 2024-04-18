import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/auth";

// Функция для входа в систему
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response);
    throw error;
  }
};

// Функция для обновления токенов
export const refreshTokens = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
  } catch (error) {
    console.error("Refresh Token Error:", error.response);
    throw error;
  }
};
