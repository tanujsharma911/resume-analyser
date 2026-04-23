import { Outlet } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useUserStore } from "./store/user.store";
import { useEffect } from "react";
import { getUserData } from "./services/auth.api";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSideBar";

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

    fetchUserData();
  }, [user]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
