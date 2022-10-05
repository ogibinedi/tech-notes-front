import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

const Public = () => {
  const navigate = useNavigate();
  const content = (
    <section className="container" style={{ marginTop: "80px" }}>
      <div className="bg-dark text-secondary px-4 py-5">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white text-center">
            TechNotesApp <FontAwesomeIcon icon={faWrench} />
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">
              Berlokasi di negeri wakanda yang indah, tempat yang nyaman dan
              strategis
            </p>
            <address className="public__addr">
              Jl. Belok Kanan Belok Kiri <br />
              212 Wiro Sableng <br />
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
                Employee Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  return content;
};

export default Public;

