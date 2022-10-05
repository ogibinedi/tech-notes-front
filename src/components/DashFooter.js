import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const DashFooter = () => {
    const { username, status } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const onGoHomeClick = () => navigate('/dash')
    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="btn btn-sm btn-outline-primary"
                title="Home"
                onClick={onGoHomeClick}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className="footer mt-auto py-3 bg-dark">
            <div className="container">
                <span className="text-muted">
                    {goHomeButton} &nbsp;&nbsp;
                    <span>Current User: <span className="badge text-bg-primary">{username}</span> </span> &nbsp;&nbsp;
                    <span>Status: <span className="badge text-bg-warning">{status}</span> </span>
                </span>
            </div>
        </footer>
    )
    return content
}

export default DashFooter