import { useUserStore } from "@/store/user.store";

const Profile = () => {
  const { user } = useUserStore();
  return <div>Profile {user.displayName}</div>;
};

export default Profile;
