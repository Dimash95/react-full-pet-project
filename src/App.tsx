import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home/home";
import Catalog from "./pages/catalog/catalog";
import About from "./pages/about/about";
import Contacts from "./pages/contacts/contacts";
import Cart from "./pages/cart/cart";
import { Detail } from "./pages/detail/detail";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/react-full-pet-project" element={<Home />} />
      <Route path="/react-full-pet-project/catalog" element={<Catalog />} />
      <Route path="/react-full-pet-project/catalog/:categoryId" element={<Catalog />} />
      <Route path="/react-full-pet-project/catalog/:categoryId/detail/:cardId" element={<Detail />} />
      <Route path="/react-full-pet-project/about" element={<About />} />
      <Route path="/react-full-pet-project/contacts" element={<Contacts />} />
      <Route path="/react-full-pet-project/cart" element={<Cart />} />
    </Routes>
  </Layout>
);

export default App;
