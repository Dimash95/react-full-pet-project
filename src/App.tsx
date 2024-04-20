import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home/home";
import Catalog from "./pages/catalog/catalog";
import About from "./pages/about/about";
import Contacts from "./pages/contacts/contacts";
import Cart from "./pages/cart/cart";
import { Detail } from "./pages/detail/detail";
import LoginForm from "./components/login/login";
import RegisterForm from "./components/registration/registration";
import PrivateRoute from "./utils/private-route";
import UserProfile from "./components/user-profile/user-profile";

const App = () => (
  <Layout>
    <Routes>
      <Route
        path="/react-full-pet-project"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/react-full-pet-project/catalog"
        element={
          <PrivateRoute>
            <Catalog />
          </PrivateRoute>
        }
      />
      <Route
        path="/react-full-pet-project/catalog/:categoryId"
        element={
          <PrivateRoute>
            <Catalog />
          </PrivateRoute>
        }
      />
      <Route
        path="/react-full-pet-project/catalog/:categoryId/detail/:cardId"
        element={
          <PrivateRoute>
            <Detail />
          </PrivateRoute>
        }
      />
      <Route path="/react-full-pet-project/about" element={<About />} />
      <Route path="/react-full-pet-project/contacts" element={<Contacts />} />
      <Route
        path="/react-full-pet-project/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route path="/react-full-pet-project/login" element={<LoginForm />} />
      <Route path="/react-full-pet-project/registration" element={<RegisterForm />} />
      <Route
        path="/react-full-pet-project/profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  </Layout>
);

export default App;
