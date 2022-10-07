import { Link } from "react-router-dom"
const NotFound = () => {
    return (
        <div className="container-fluid col-6" style={{ margin: "auto", marginTop: "70px" }}>
            <div className="alert alert-danger">
                <strong>Ops!</strong> The page that you are looking for is not exist - &nbsp;
                <Link to="/" className="alert-link">Kembali kehalaman utama</Link>
            </div>
        </div>
    )
}

export default NotFound