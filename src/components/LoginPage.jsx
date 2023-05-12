import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Select from "react-select";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { Button } from "react-bootstrap";
import { getUsers } from "../api/api";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const userValueFromContext = useContext(UserContext);
  const darkModeValueFromContext = useContext(DarkModeContext);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  const options = users.map((user) => {
    return { value: user.username, label: user.username };
  });

  const handleChange = (selectedUser) => {
    const correctUserObj = users.filter((user) => {
      return user.username === selectedUser.value;
    });
    userValueFromContext.setUser(...correctUserObj);
  };

  if (isLoading) {
    return (
      <div
        className={`loading-content ${
          darkModeValueFromContext ? "dark-mode" : ""
        }`}
      >
        <h1>Site loading...</h1>
        <div className="spinner-border"></div>
      </div>
    );
  } else {
    return (
      <div id="login-page">
        <form
          id={`${
            darkModeVar ? "login-form-dark-mode" : "login-form-light-mode"
          }`}
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
  }
};
