import { createContext } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: localStorage.getItem("theme") || "dark",
  setTheme: () => {},
});
