import { Outlet } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useUserStore } from "./store/user.store";
import { useEffect, useState } from "react";
import { getUserData } from "./services/auth.api";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  const { user } = useUserStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user.isLoggedIn) return;

      setLoading(true);

      const res = await getUserData();

      if (res?.status === 200 && res?.data?.user) {
        useUserStore.setState({
          user: {
            isLoggedIn: true,
            email: res.data.user.email,
            displayName: res.data.user.displayName,
          },
        });

        console.log("User data fetched successfully:", res.data.user);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="w-full text-center p-5">Loading...</div>;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Toaster richColors />
      </QueryClientProvider>
    </>
  );
}

export default App;
