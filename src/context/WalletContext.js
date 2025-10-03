import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const STORAGE_PREFIX = "zottry.wallet.";
const DEFAULT_BALANCE = 185.75;

const WalletContext = createContext();

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
};

const loadBalance = (userId) => {
  const storage = getStorage();
  if (!storage || !userId) {
    return null;
  }
  try {
    const raw = storage.getItem(`${STORAGE_PREFIX}${userId}`);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (typeof parsed?.balance === "number") {
      return parsed.balance;
    }
    return null;
  } catch (error) {
    storage.removeItem(`${STORAGE_PREFIX}${userId}`);
    return null;
  }
};

const persistBalance = (userId, balance) => {
  const storage = getStorage();
  if (!storage || !userId) {
    return;
  }
  storage.setItem(
    `${STORAGE_PREFIX}${userId}`,
    JSON.stringify({ balance: Number.parseFloat(balance.toFixed(2)), updatedAt: Date.now() })
  );
};

export function WalletProvider({ children }) {
  const { user } = useAuth();
  const [balance, setBalance] = useState(DEFAULT_BALANCE);

  useEffect(() => {
    if (!user) {
      setBalance(DEFAULT_BALANCE);
      return;
    }
    const storedBalance = loadBalance(user.id);
    if (typeof storedBalance === "number") {
      setBalance(storedBalance);
    } else {
      persistBalance(user.id, DEFAULT_BALANCE);
      setBalance(DEFAULT_BALANCE);
    }
  }, [user]);

  const updateBalance = useCallback(
    (updater) => {
      setBalance((previous) => {
        const nextValue = typeof updater === "function" ? updater(previous) : updater;
        const normalized = Number.parseFloat(Number(nextValue).toFixed(2));
        if (user) {
          persistBalance(user.id, normalized);
        }
        return normalized;
      });
    },
    [user]
  );

  const requestWithdrawal = useCallback(
    (amount) => {
      const numeric = Number(amount);
      if (Number.isNaN(numeric) || numeric <= 0) {
        return { ok: false, message: "Enter a valid withdrawal amount." };
      }
      if (numeric > balance) {
        return { ok: false, message: "Withdrawal amount exceeds wallet balance." };
      }

      updateBalance((previous) => previous - numeric);
      return { ok: true };
    },
    [balance, updateBalance]
  );

  const addFunds = useCallback(
    (amount) => {
      const numeric = Number(amount);
      if (Number.isNaN(numeric) || numeric <= 0) {
        return { ok: false, message: "Enter a valid amount." };
      }
      updateBalance((previous) => previous + numeric);
      return { ok: true };
    },
    [updateBalance]
  );

  const formattedBalance = useMemo(() => {
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
    return formatter.format(balance);
  }, [balance]);

  const value = useMemo(
    () => ({
      balance,
      formattedBalance,
      setBalance: updateBalance,
      requestWithdrawal,
      addFunds,
      resetBalance: () => {
        if (user) {
          persistBalance(user.id, DEFAULT_BALANCE);
        }
        setBalance(DEFAULT_BALANCE);
      }
    }),
    [balance, formattedBalance, requestWithdrawal, addFunds, updateBalance, user]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
