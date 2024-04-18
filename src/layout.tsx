// components/Layout.js
import React, { useState } from "react";
import { Provider } from "react-redux";

import Menu from "./components/menu/menu";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ThemeContext } from "./context";
import classNames from "classnames";
import { store } from "./store/store";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  if (localStorage.getItem("theme") === null) localStorage.setItem("theme", "dark");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  return (
    <Provider store={store}>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
        <div
          className={classNames("wrapper", {
            wrapperDark: theme === "dark",
            wrapperLight: theme === "light",
          })}
        >
          <Header />
          <Menu />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default Layout;
