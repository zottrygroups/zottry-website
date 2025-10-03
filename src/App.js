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
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import Transactions from "./pages/Transactions";
import Withdrawal from "./pages/Withdrawal";
import Limits from "./pages/Limits";
import SelfExclusion from "./pages/SelfExclusion";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";
import LoginModal from "./components/LoginModal";

function App() {
  return (
    <Router>
      <Navbar />
      <LoginModal />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/results" element={<Results />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/limits" element={<Limits />} />
          <Route path="/self-exclusion" element={<SelfExclusion />} />
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
