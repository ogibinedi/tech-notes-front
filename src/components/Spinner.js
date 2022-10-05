const Spinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "100px" }}>
            <div
                className="spinner-border text-info"
                style={{ width: "3rem", height: "3rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
