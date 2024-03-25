// components/Layout.js
import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="wrapper">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
