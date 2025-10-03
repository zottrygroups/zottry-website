const STORAGE_KEY = "zottry.auth.session";

const USERS = [
  {
    id: "user-1",
    email: "zottry@test.com",
    password: "Password123",
    name: "Zottry Test User"
  },
  {
    id: "user-2",
    email: "zottry@test.in",
    password: "Password123",
    name: "Zottry India Test User"
  }
];

const normalizeEmail = (email) => (email || "").trim().toLowerCase();

const findUserByEmail = (email) => {
  const normalized = normalizeEmail(email);
  return USERS.find((user) => user.email.toLowerCase() === normalized) || null;
};

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

const persistSession = (user) => {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  storage.setItem(STORAGE_KEY, JSON.stringify(user));
};

const clearSession = () => {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  storage.removeItem(STORAGE_KEY);
};

export function login(email, password) {
  if (!email || !password) {
    return null;
  }

  const stored = findUserByEmail(email);
  if (!stored || stored.password !== password) {
    return null;
  }

  const user = {
    id: stored.id,
    email: stored.email,
    name: stored.name
  };

  persistSession(user);
  return user;
}

export function logout() {
  clearSession();
}

export function register(formData) {
  const email = formData?.email || "";
  const password = formData?.password || "";
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throw new Error("An email address is required to register.");
  }

  if (findUserByEmail(email)) {
    throw new Error("An account with that email already exists.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const record = {
    id: `user-${Date.now()}`,
    email: email.trim(),
    password,
    name:
      `${formData?.firstName || ""} ${formData?.lastName || ""}`.trim() ||
      email.trim()
  };

  USERS.push(record);

  const account = {
    id: record.id,
    email: record.email,
    name: record.name
  };

  persistSession(account);
  return account;
}

export function getSession() {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    clearSession();
    return null;
  }
}

export function getDemoCredentials() {
  const [firstUser] = USERS;
  if (!firstUser) {
    return { email: "", password: "" };
  }

  return {
    email: firstUser.email,
    password: firstUser.password
  };
}
