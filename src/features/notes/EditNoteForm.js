import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditNoteForm = ({ note, users }) => {
    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "alert-danger" : ""
    const validTitleClass = !title ? 'is-invalid' : ''
    const validTextClass = !text ? 'is-invalid' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <div className="container px-4 py-5">
            <h2 className="pb-2 border-bottom">Update Note</h2>
            <div className="row">
                <div className={`alert ${errClass}`}>
                    {errContent}
                </div>
                <div className="mt-2 mb-0">
                    <span>Created: {created}</span> | <span>Updated: {updated}</span>
                    <button className="btn btn-outline-primary float-end" onClick={() => navigate('/dash/notes')}><FontAwesomeIcon icon={faArrowLeft} /> Kembali</button>
                </div>
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
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="completed"
                                        id="user-active"
                                        checked={completed}
                                        onChange={onCompletedChanged} />
                                    <label className="form-check-label text-dark" htmlFor="flexCheckDefault">
                                        WORK COMPLETE:
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="selectOption" className="form-label text-dark">ASSIGNED TO</label>
                                    <select
                                        id="note-username"
                                        name="username"
                                        className="form-select"
                                        value={userId}
                                        onChange={onUserIdChanged}
                                    >
                                        {options}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-danger btn-lg"
                                        onClick={onDeleteNoteClicked}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                    <button
                                        className="btn btn-primary  btn-lg float-end"
                                        disabled={!canSave}
                                        onClick={onSaveNoteClicked}
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

export default EditNoteForm