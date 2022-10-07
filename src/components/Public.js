import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faStickyNote, faUserGear } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth"
import { Button } from "react-bootstrap";

const Public = () => {
    const isAuth = useAuth();
    const navigate = useNavigate();
    const content = (
        <section className="container" style={{ marginTop: "80px" }}>
            <div className="bg-dark text-secondary px-4 py-5">
                <div className="py-5">
                    <h1 className="display-5 fw-bold text-white text-center">
                        techNotesApp <FontAwesomeIcon icon={faStickyNote} />
                    </h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="fs-5 mb-4">
                            Aplikasi TODO sederhana yang menerapkan RBAC
                        </p>
                        <address className="public__addr">
                            Jl. Raya ABC <br />
                            123 Foo Street <br />
                            Foo City <br />
                            <a href="tel:+62212345678">(622)12345678</a>
                        </address>
                        <br />
                        <p>
                            <strong>Owner: John Doe</strong>
                        </p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-lg px-4 me-sm-3 fw-bold"
                                onClick={() => navigate("/login")}
                            >
                                <FontAwesomeIcon icon={faUserGear} /> Employee Login
                            </button>
                            <Button variant="primary" onClick={() => navigate('/dash')}><FontAwesomeIcon icon={faDashboard} /> Go to Dashboard</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
    return content;
};

export default Public;
