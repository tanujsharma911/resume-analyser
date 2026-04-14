export const isValidUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9._]+$/;
  return (
    username.length >= 3 &&
    username.length <= 20 &&
    regex.test(username) &&
    !/^[._]/.test(username) &&
    !/[._]$/.test(username)
  );
};
