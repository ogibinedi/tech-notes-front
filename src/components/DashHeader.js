import {
    faSignOutAlt,
    faStickyNote,
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [sendLogout, { isLoading, isSuccess, isError, error }] =
        useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess, navigate]);

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUserClicked = () => navigate('/dash/users')

    let dashClass = null;
    if (
        !DASH_REGEX.test(pathname) &&
        !NOTES_REGEX.test(pathname) &&
        !USERS_REGEX.test(pathname)
    ) {
        dashClass = "";
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <li className="nav-item">
                <button title="New Note" className="btn btn-outline-info ms-2 mb-2" onClick={onNewNoteClicked}>
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                </button>
            </li>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <li className="nav-item">
                <button title="New User" className="btn btn-outline-info ms-2 mb-2" onClick={onNewUserClicked}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            </li>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <li className="nav-item">
                    <button title="Users" className="btn btn-outline-info ms-2 mb-2" onClick={onUserClicked}>
                        <FontAwesomeIcon icon={faUserGear} />
                    </button>
                </li>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <li className="nav-item">
                <button title="Notes" className="btn btn-outline-info ms-2 mb-2" onClick={onNotesClicked}>
                    <FontAwesomeIcon icon={faFilePen} />
                </button>
            </li>
        )
    }

    const logoutButton = (
        <li className="nav-item">
            <button
                className="btn btn-outline-info ms-2 mb-2"
                title="Logout"
                onClick={sendLogout}
            >
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        </li>
    );

    const errClass = isError ? "alert-danger" : ""

    let buttonContent
    if (isLoading) {
        buttonContent = (
            <div className="container-fluid">
                <div className="alert alert-success">
                    Logging Out...
                </div>
            </div>
        )
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <nav className={`navbar navbar-expand-md navbar-dark bg-dark ${dashClass}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dash">
                        <FontAwesomeIcon icon={faStickyNote} /> techNotes
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
                            {buttonContent}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={`alert ${errClass}`}>{error?.data?.message}</div>
        </>
    );
    return content;
};

export default DashHeader;
