import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";
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
import { useAuth } from "./context/AuthContext";

function SessionRedirector() {
  const { user, lastAction } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && lastAction?.type === "timeout") {
      navigate("/", { replace: true });
    }
  }, [user, lastAction, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <Navbar />
      <SessionRedirector />
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
          <Route
            path="/wallet"
            element={
              <PrivateRoute>
                <Withdrawal />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/results"
            element={
              <PrivateRoute>
                <Results />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdrawal"
            element={
              <PrivateRoute>
                <Withdrawal />
              </PrivateRoute>
            }
          />
          <Route
            path="/limits"
            element={
              <PrivateRoute>
                <Limits />
              </PrivateRoute>
            }
          />
          <Route
            path="/self-exclusion"
            element={
              <PrivateRoute>
                <SelfExclusion />
              </PrivateRoute>
            }
          />
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
