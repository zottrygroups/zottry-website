import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  fetchLotteries,
  fetchOffers,
  fetchPromotions,
  fetchResults
} from "../services/lotteryService";

const LotteryDataContext = createContext();

export function LotteryDataProvider({ children }) {
  const [lotteries, setLotteries] = useState([]);
  const [latestResults, setLatestResults] = useState([]);
  const [archivedResults, setArchivedResults] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [offers, setOffers] = useState([]);
  const [savedPromotions, setSavedPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [lotteryData, latestResultsData, archivedResultsData, promotionData, offerData] =
        await Promise.all([
          fetchLotteries(),
          fetchResults("latest"),
          fetchResults("archived"),
          fetchPromotions(),
          fetchOffers()
        ]);

      setLotteries(lotteryData);
      setLatestResults(latestResultsData);
      setArchivedResults(archivedResultsData);
      setPromotions(promotionData);
      setOffers(offerData);
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const togglePromotionSave = (promotionId) => {
    setSavedPromotions((previous) =>
      previous.includes(promotionId)
        ? previous.filter((id) => id !== promotionId)
        : [...previous, promotionId]
    );
  };

  const updateOfferStatus = (offerId, nextStatus) => {
    setOffers((previous) =>
      previous.map((offer) =>
        offer.id === offerId ? { ...offer, status: nextStatus } : offer
      )
    );
  };

  const contextValue = useMemo(
    () => ({
      lotteries,
      latestResults,
      archivedResults,
      promotions,
      offers,
      savedPromotions,
      togglePromotionSave,
      updateOfferStatus,
      loading,
      error,
      refreshAll: loadData
    }),
    [
      lotteries,
      latestResults,
      archivedResults,
      promotions,
      offers,
      savedPromotions,
      loading,
      error,
      loadData
    ]
  );

  return (
    <LotteryDataContext.Provider value={contextValue}>
      {children}
    </LotteryDataContext.Provider>
  );
}

export function useLotteryData() {
  const context = useContext(LotteryDataContext);
  if (!context) {
    throw new Error("useLotteryData must be used within a LotteryDataProvider");
  }
  return context;
}
