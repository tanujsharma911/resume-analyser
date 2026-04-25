import { api } from "./axios";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) {
  try {
    const res = await api.post("/api/auth/register", {
      email,
      password,
      displayName,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    const res = await api.post("/api/auth/logout");
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserData() {
  try {
    const res = await api.get("/api/auth/get-me");
    return res;
  } catch (error) {
    console.log(error);
  }
}
