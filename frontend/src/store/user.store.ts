import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  username: string;
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
    username: "",
    displayName: "",
  },
  setUserData: (payload: UserState) => {
    useUserStore.setState({ user: payload });
  },
  clearUserData: () => {
    useUserStore.setState({
      user: {
        isLoggedIn: false,
        username: "",
        displayName: "",
      },
    });
  },
}));
