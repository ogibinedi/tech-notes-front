import { useRef, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import { faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import Spinner from "../../components/Spinner";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername("");
            setPassword("");
            navigate("/dash");
        } catch (err) {
            if (!err.status) {
                setErrMsg("No Server Response");
            } else if (err.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.status === 401) {
                setErrMsg("Password and Username is not match. Please try again");
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev) => !prev);

    const errClass = errMsg ? "alert-danger" : "";

    if (isLoading) return <Spinner />;

    const content = (
        <main className="form-signin col-md-5 m-auto">
            <div className="card shadow-no">
                <div className="card-body">
                    <div
                        ref={errRef}
                        className={`alert ${errClass}`}
                        role="alert"
                        aria-live="assertive"
                    >
                        {errMsg}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h3
                            className="text-header text-dark mb-3"
                            style={{ marginTop: "-50px" }}
                        >
                            <FontAwesomeIcon icon={faLock} /> Login Credential
                        </h3>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label text-dark">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-dark">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="persist"
                                checked={persist}
                                onChange={handleToggle}
                            />
                            <label className="form-check-label text-dark" htmlFor="persist">
                                Trust this device
                            </label>
                        </div>
                        <Link className="text-primary" to="/">
                            Kembali kehalaman utama
                        </Link>
                        <br />
                        <button className="btn btn-outline-primary float-end">
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
    return content;
};

export default Login;
