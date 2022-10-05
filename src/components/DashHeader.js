import { faSignOutAlt, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const pathname = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);
  if (isLoading) return <p>Logging Out...</p>;
  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "";
  }

  const logoutButton = (
    <button
      className="btn btn-outline-info"
      title="Logout"
      onClick={sendLogout}
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
  const content = (
    <nav className={`navbar navbar-expand-md navbar-dark bg-dark ${dashClass}`}>
      <Link className="navbar-brand" to="/dash">
        <FontAwesomeIcon icon={faWrench} /> techNotes
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">{logoutButton}</li>
        </ul>
      </div>
    </nav>
  );
  return content;
};

export default DashHeader;

