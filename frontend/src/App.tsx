import { Outlet } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useUserStore } from "./store/user.store";
import { useEffect } from "react";
import { getUserData } from "./api/auth.api";

const queryClient = new QueryClient();

function App() {
  const { user } = useUserStore();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserData();

      if (res?.status === 200 && res?.data?.user) {
        useUserStore.setState({
          user: {
            isLoggedIn: true,
            username: res.data.user.username,
            displayName: res.data.user.displayName,
          },
        });
      }
    };
  }, [user]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
