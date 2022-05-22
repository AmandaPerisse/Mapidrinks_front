import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./providers/UserContext";
import './styles/reset.css';
import './styles/style.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ListProductsPage from './pages/ListProductsPage';
import ProductPage from './pages/ProductPage';

function App() {

  const initialToken = localStorage.getItem("token");
  const initialUsername = localStorage.getItem("username");
  const initialUserStreet = localStorage.getItem("street");
  const initialUserNumber = localStorage.getItem("number");

  const [infoUsername, setInfoUsername] = useState(JSON.parse(initialUsername));
  const [infoStreet, setInfoStreet] = useState(JSON.parse(initialUserStreet));
  const [infoNumber, setInfoNumber] = useState(JSON.parse(initialUserNumber));
  const [token, setToken] = useState(initialToken);
  localStorage.setItem('products', JSON.stringify([]));

  return (

    <UserContext.Provider value={{ infoNumber, setInfoNumber, infoUsername, setInfoUsername, infoStreet, setInfoStreet, token, setToken }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/:category" element={<ListProductsPage />}></Route>
          <Route path="/:category/:productName" element={<ProductPage />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
