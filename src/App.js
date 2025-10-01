import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllLotteries from "./pages/AllLotteries";
import LotteryResults from "./pages/LotteryResults";
import MyOffers from "./pages/MyOffers";
import Promotions from "./pages/Promotions";
import HowToPlay from "./pages/HowToPlay";
import Rules from "./pages/Rules";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-lotteries" element={<AllLotteries />} />
          <Route path="/lottery-results" element={<LotteryResults />} />
          <Route path="/my-offers" element={<MyOffers />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
