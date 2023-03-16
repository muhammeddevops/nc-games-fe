import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Select from "react-select";
import { Link } from "react-router-dom";

export const LoginPage = ({ users }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userValueFromContext = useContext(UserContext);

  const options = users.map((user) => {
    return { value: user.username, label: user.username };
  });

  const handleChange = (selectedUser) => {
    const correctUserObj = users.filter((user) => {
      return user.username === selectedUser.value;
    });
    userValueFromContext.setUser(...correctUserObj);
  };

  return (
    <form id="login-form">
      <h2 className="login-h2">Login as:</h2>
      <Select
        options={options}
        onChange={handleChange}
        autoFocus={true}
        id="react-select"
      />

      {userValueFromContext.user ? (
        <Link to="/homepage">
          <button type="button">Continue</button>
        </Link>
      ) : null}
    </form>
  );
};
//
