const delay = (ms = 600) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const demoPassword = "PlayZottry!";

const users = new Map([
  [
    "demo@zottry.com",
    {
      id: "demo",
      email: "demo@zottry.com",
      name: "Demo Player",
      password: demoPassword
    }
  ]
]);

export async function loginUser({ email, password }) {
  await delay();
  const key = email.trim().toLowerCase();
  const account = users.get(key);

  if (!account || account.password !== password) {
    throw new Error("We couldn't match those login details.");
  }

  return {
    user: {
      id: account.id,
      email: account.email,
      name: account.name
    }
  };
}

export async function registerUser(formData) {
  await delay(750);
  const key = formData.email.trim().toLowerCase();

  if (users.has(key)) {
    throw new Error("An account with that email already exists.");
  }

  const id = `user-${Date.now()}`;
  const name = `${formData.firstName || ""} ${formData.lastName || ""}`.trim() || "Zottry Player";

  const record = {
    id,
    email: key,
    name,
    password: formData.password
  };

  users.set(key, record);

  return {
    user: {
      id,
      email: record.email,
      name: record.name
    }
  };
}

export async function logoutUser() {
  await delay(250);
  return { ok: true };
}

export function getDemoCredentials() {
  return {
    email: "demo@zottry.com",
    password: demoPassword
  };
}
