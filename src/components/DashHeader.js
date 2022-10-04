import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashHeader = () => {
    const navigate = useNavigate();
    const content = (
        
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span role="button" className="navbar-brand" onClick={() => navigate('/dash')}>
                    <FontAwesomeIcon icon={faWrench} /> &nbsp;
                    TechNotesApp
                </span>
            </div>
        </nav>
    )
    return content
}

export default DashHeader