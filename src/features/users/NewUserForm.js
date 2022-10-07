import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])


    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, // HTMLCollection
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    const notify = () => toast.success('User Added Successfully', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
            notify()
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role} > {role}</option>
        )
    })

    const errClass = isError ? "invalid-feedback" : ""
    const validUserClass = !validUsername ? 'is-invalid' : ''
    const validPwdClass = !validPassword ? 'is-invalid' : ''
    const validRolesClass = !Boolean(roles.length) ? 'is-invalid' : ''

    const content = (
        <div className="container px-4 py-5">
            <h2 className="pb-2 border-bottom">Create a New User</h2>
            <div className="row">
                <div className="mt-2 mb-0"><button className="btn btn-outline-primary float-end" onClick={() => navigate('/dash/users')}><FontAwesomeIcon icon={faArrowLeft} /> Kembali</button></div>
                <div className="col-md-12">
                    <div className="card shadow-no mt-3">
                        <div className="card-body">
                            <form className="form-controll" onSubmit={onSaveUserClicked}>
                                <div className="mb-3">
                                    <label htmlFor="usernameInput" className="form-label text-dark">Username: [3-20 karakter]</label>
                                    <input
                                        type="text"
                                        className={`form-control ${validUserClass}`}
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        aria-label="Username"
                                        autoComplete="off"
                                        value={username}
                                        onChange={onUsernameChanged}
                                    />
                                    <div className={errClass}>
                                        {error?.data?.message}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordInput" className="form-label text-dark">Password: [4-12 karakter (!@#$%)]</label>
                                    <input
                                        type="password"
                                        className={`form-control ${validPwdClass}`}
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onPasswordChanged}
                                        placeholder="Password"
                                        aria-label="Password"
                                    />
                                    <div className={errClass}>
                                        {error?.data?.message}
                                    </div>
                                </div>
                                <div className="mb-3 col-4">
                                    <label htmlFor="selectOption" className="form-label text-dark">ASSIGNED ROLES</label>
                                    <select
                                        id="roles"
                                        name="roles"
                                        className={`form-select ${validRolesClass}`}
                                        multiple={true}
                                        size={3}
                                        value={roles}
                                        onChange={onRolesChanged}
                                    >
                                        {options}
                                    </select>
                                    <div className={errClass}>
                                        {error?.data?.message}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary  btn-lg float-end"
                                        disabled={!canSave}
                                    ><FontAwesomeIcon icon={faSave} /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )

    return content
}

export default NewUserForm