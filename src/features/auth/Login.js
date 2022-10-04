import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Login = () => {
   const content = (
    <main className='form-signin col-md-5 m-auto'>
            <div className="card shadow-no">
                <div className="card-body">
                    <div 
                        className={`alert`} 
                        role="alert" 
                        aria-live='assertive'>
                        
                    </div>
                    <form >
                        <h3 className='text-header text-dark mb-3' style={{ marginTop: "-50px"}}>Login Credential</h3>
                        <div className="mb-3">
                            <label
                                htmlFor="username"
                                className="form-label text-dark">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                autoComplete="off"
                                required />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="form-label text-dark">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                required />
                        </div>
                        <button className="btn btn-outline-primary float-end"><FontAwesomeIcon icon={faSignInAlt} /> Login</button>
                    </form>
                </div>
            </div>
        </main>
   )
   return content 
}

export default Login