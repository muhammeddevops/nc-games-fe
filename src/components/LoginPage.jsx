import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Select from "react-select";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { Button } from "react-bootstrap";

export const LoginPage = ({ users }) => {
  const userValueFromContext = useContext(UserContext);
  const darkModeValueFromContext = useContext(DarkModeContext);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

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
    <div id="login-page">
      <form
        id={`${darkModeVar ? "login-form-dark-mode" : "login-form-light-mode"}`}
      >
        <h2
          id={`${darkModeVar ? "login-h2-dark-mode" : "login-h2-light-mode"}`}
        >
          Login as:
        </h2>
        <Select
          options={options}
          onChange={handleChange}
          autoFocus={true}
          id="react-select"
        />

        {userValueFromContext.user ? (
          <Link to="/homepage">
            <Button
              type="button"
              className="loginBtn"
              id={`${darkModeVar ? "read-more-dark" : "read-more-light"}`}
            >
              Continue
            </Button>
          </Link>
        ) : null}
      </form>
    </div>
  );
};
