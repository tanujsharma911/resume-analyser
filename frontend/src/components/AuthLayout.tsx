import { useUserStore } from "@/store/user.store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthLayout = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();

  const { user } = useUserStore();

  useEffect(() => {
    if (!user.isLoggedIn) navigate("/login");
  }, [user]);

  return <>{children}</>;
};

export default AuthLayout;
