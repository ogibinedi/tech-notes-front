import { faBookOpen, faStickyNote, faUserPlus, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
    const { username, isManager, isAdmin } = useAuth()
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    const content = (
        <div className="container px-4 py-5">
            <h2 className="pb-2 border-bottom">Dashboard Panel</h2>
            <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
                <div className="d-flex flex-column align-items-start gap-2">
                    <h4 className="text-header">Welcome <span className='badge rounded-pill text-bg-secondary'>{username}</span>. Halaman ini digunakan untuk me manage terkait catatan sekaligus dilengkapi dengan RBAC sesuai roles masing-masing</h4>
                    <p className="text-muted">{today}</p>
                    <Link to="/" className="btn btn-outline-primary btn-lg">Go to Main Page</Link>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 g-4">
                    <div className="d-flex flex-column gap-2" style={{ paddingLeft: "25px" }}>
                        <Link to="/dash/notes" className="btn btn-outline-primary btn-lg" style={{ width: "50px" }}>
                            <FontAwesomeIcon icon={faStickyNote} />
                        </Link>
                        <h4 className="fw-semibold mb-0">View techNotes</h4>
                        <p className="text-muted">Halaman ini digunakan untuk memenej catatan, membaca, menambah, mengedit dan menghapus</p>
                    </div>
                    <div className="d-flex flex-column gap-2" style={{ paddingLeft: "25px" }}>
                        <Link to="/dash/notes/new" className="btn btn-outline-primary btn-lg" style={{ width: "50px" }}>
                            <FontAwesomeIcon icon={faBookOpen} />
                        </Link>
                        <h4 className="fw-semibold mb-0">Add New Note</h4>
                        <p className="text-muted">Shortcut jika ingin mebuat note baru tanpa harus melihat daftar note</p>
                    </div>
                    {
                        (isManager || isAdmin) &&
                        <>
                            <div className="d-flex flex-column gap-2" style={{ paddingLeft: "25px" }}>
                                <Link to="/dash/users" className="btn btn-outline-primary btn-lg" style={{ width: "50px" }}>
                                    <FontAwesomeIcon icon={faUserGear} />
                                </Link>
                                <h4 className="fw-semibold mb-0">View User Settings</h4>
                                <p className="text-muted">Halaman ini digunakan untuk memenej RBAC</p>
                            </div>
                            <div className="d-flex flex-column gap-2" style={{ paddingLeft: "25px" }}>
                                <Link to="/dash/users/new" className="btn btn-outline-primary btn-lg" style={{ width: "50px" }}>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </Link>
                                <h4 className="fw-semibold mb-0">Add New User</h4>
                                <p className="text-muted">Shortcut untuk membuat user baru sekaligus rbac</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
    return content
}

export default Welcome