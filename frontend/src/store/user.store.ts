import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  email: string;
  displayName: string;
}

interface UserStoreType {
  user: UserState;
  setUserData: (user: UserState) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserStoreType>(() => ({
  user: {
    isLoggedIn: false,
    email: "",
    displayName: "",
  },
  setUserData: (payload: UserState) => {
    useUserStore.setState({ user: payload });
  },
  clearUserData: () => {
    useUserStore.setState({
      user: {
        isLoggedIn: false,
        email: "",
        displayName: "",
      },
    });
  },
}));
