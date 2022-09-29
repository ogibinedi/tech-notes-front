import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashHeader = () => {
    const navigate = useNavigate();
    const content = (
        // <header className="daash-header">
        //     <div className="dash-header__container">
        //         <Link to="/dash">
        //             <h1 className="dash-header__title">techNotes</h1>
        //         </Link>
        //         <nav className="dash-header__nav">
        //             {/* Add nav button later */}
        //         </nav>
        //     </div>
        // </header>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span role="button" className="navbar-brand" onClick={() => navigate('/dash')}>
                    <FontAwesomeIcon icon={faWrench} /> &nbsp;
                    Wakanda's Repairs
                </span>
            </div>
        </nav>
    )
    return content
}

export default DashHeader