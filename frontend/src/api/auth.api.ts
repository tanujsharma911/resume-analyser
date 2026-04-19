import axios from "./axios";

export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const res = await axios.post("/api/auth/login", {
      username,
      password,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser({
  username,
  password,
  displayName,
}: {
  username: string;
  password: string;
  displayName: string;
}) {
  try {
    const res = await axios.post("/api/auth/register", {
      username,
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
    const res = await axios.post("/api/auth/logout");
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserData() {
  try {
    const res = await axios.post("/api/auth/get-me");
    return res;
  } catch (error) {
    console.log(error);
  }
}
