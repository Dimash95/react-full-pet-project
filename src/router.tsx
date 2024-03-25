import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Catalog from "./pages/catalog/catalog";
import About from "./pages/about/about";
import Contacts from "./pages/contacts/contacts";
import Cart from "./pages/cart/cart";
import { Detail } from "./pages/detail/detail";
import Layout from "./layout";

export const router = (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:categoryId" element={<Catalog />} />
      <Route path="/catalog/:categoryId/detail/:cardId" element={<Detail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  </Routes>
);
