import { UserContext } from "../contexts/UserContext.js";
import { useContext } from "react";

export const Profile = () => {
  const userValueFromContext = useContext(UserContext);
  console.log(userValueFromContext.user.username);
  return <h3>Logged in as: {userValueFromContext.user.username}</h3>;
};
