import { useState, useEffect } from "react"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons"

const NewNoteForm = ({ users }) => {
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()
    console.log("Isi users: ", users)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option key={user.id} value={user.id} > {user.username}</option>
        )
    })

    const errClass = isError ? "invalid-feedback" : ""
    const validTitleClass = !title ? 'is-invalid' : ''
    const validTextClass = !text ? 'is-invalid' : ''

    const content = (
        <div className="container px-4 py-5">
            <h2 className="pb-2 border-bottom">Create a New Note</h2>
            <div className="row">
                <div className="mt-2 mb-0"><button className="btn btn-outline-primary float-end" onClick={() => navigate('/dash/notes')}><FontAwesomeIcon icon={faArrowLeft} /> Kembali</button></div>
                <div className="col-md-12">
                    <div className="card shadow-no mt-3">
                        <div className="card-body">
                            <form className="form-controll" onSubmit={onSaveNoteClicked}>
                                <div className="mb-3">
                                    <label htmlFor="titleInput" className="form-label text-dark">Judul</label>
                                    <input
                                        type="text"
                                        className={`form-control ${validTitleClass}`}
                                        id="title"
                                        name="title"
                                        placeholder="Judul"
                                        aria-label="Judul"
                                        autoComplete="off"
                                        value={title}
                                        onChange={onTitleChanged}
                                    />
                                    <div className={errClass}>
                                        {error?.data?.message}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="textInput" className="form-label text-dark">Konten</label>
                                    <textarea
                                        className={`form-control ${validTextClass}`}
                                        id="text"
                                        name="text"
                                        placeholder="Konten"
                                        value={text}
                                        onChange={onTextChanged}
                                    />
                                    <div className={errClass}>
                                        {error?.data?.message}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="selectOption" className="form-label text-dark">ASSIGNED TO</label>
                                    <select
                                        id="username"
                                        name="username"
                                        className="form-select"
                                        value={userId}
                                        onChange={onUserIdChanged}
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
        </div>
    )

    return content
}

export default NewNoteForm