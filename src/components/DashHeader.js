import React from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
    const content = (
        <header className="daash-header">
            <div className="dash-header__container">
                <Link to="/dash">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* Add nav button later */}
                </nav>
            </div>
        </header>
    )
    return content
}

export default DashHeader