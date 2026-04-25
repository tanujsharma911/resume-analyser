import { useUserStore } from "@/store/user.store";
import React from "react";

const Profile = () => {
  const { user } = useUserStore();
  return <div>Profile {user.displayName}</div>;
};

export default Profile;
