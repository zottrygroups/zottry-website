import {
  getDemoCredentials as getMockDemoCredentials,
  login,
  logout,
  register
} from "./mockAuth";

const delay = (ms = 600) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function loginUser({ email, password }) {
  await delay();
  const account = login(email, password);

  if (!account) {
    throw new Error("We couldn't match those login details.");
  }

  return { user: account };
}

export async function registerUser(formData) {
  await delay(750);
  const account = register(formData);
  return { user: account };
}

export async function logoutUser() {
  await delay(250);
  logout();
  return { ok: true };
}

export function getDemoCredentials() {
  return getMockDemoCredentials();
}
