import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}>{role}</option>
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = isError ? "invalid-feedback" : ""
    const validUserClass = !validUsername ? 'is-invalid' : ''
    const validPwdClass = !validPassword ? 'is-invalid' : ''
    const validRolesClass = !Boolean(roles.length) ? 'is-invalid' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <div className="container px-4 py-5">
            <h2 className="pb-2 border-bottom">Create a New User</h2>
            <div className="row">
                <div className="mt-2 mb-0"><button className="btn btn-outline-primary float-end" onClick={() => navigate('/dash/users')}><FontAwesomeIcon icon={faArrowLeft} /> Kembali</button></div>
                <div className="col-md-12">
                    <div className="card shadow-no mt-3">
                        <div className="card-body">
                            <form className="form-controll" onSubmit={e => e.preventDefault()}>
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
                                        {errContent}
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
                                        {errContent}
                                    </div>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="user-active"
                                        id="user-active"
                                        checked={active}
                                        onChange={onActiveChanged} />
                                    <label className="form-check-label text-dark" htmlFor="flexCheckDefault">
                                        {user.active === true ? `ACTIVE:` : `NON ACTIVE`}
                                    </label>
                                </div>
                                <div className="mb-3">
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
                                        {errContent}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary  btn-lg float-end"
                                        disabled={!canSave}
                                        onClick={onSaveUserClicked}
                                    ><FontAwesomeIcon icon={faSave} /></button>
                                    <button
                                        className="btn btn-danger  btn-lg"
                                        disabled={!canSave}
                                        onClick={onDeleteUserClicked}
                                    ><FontAwesomeIcon icon={faTrashCan} /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return content
}

export default EditUserForm
