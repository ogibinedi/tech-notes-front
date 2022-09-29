import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from "react-router-dom"

const DashFooter = () => {
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
                    <span>Current User:</span> &nbsp;&nbsp;
                    <span>Status:</span>
                </span>
            </div>
        </footer>
    )
    return content
}

export default DashFooter