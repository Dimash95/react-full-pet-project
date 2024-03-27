// components/Layout.js
import React, { useState } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ThemeContext } from "./context";
import classNames from "classnames";
import { store } from "./store/store";
import { Provider } from "react-redux";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState("dark");

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
          <main className="main">{children}</main>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default Layout;
