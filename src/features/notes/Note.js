import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"
import { selectNoteById } from "./notesApiSlice"


const Note = ({ noteId }) => {
    const note = useSelector(state => selectNoteById(state, noteId))
    const navigate = useNavigate()
    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long'
        })
        const updated = new Date(note.updatedAt).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long'
        })
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr>
                <td>{note.completed ? <span className="badge text-bg-success">Completed</span> : <span className="badge text-bg-danger">Open</span>}</td>
                <td>{created}</td>
                <td>{updated}</td>
                <td>{note.title}</td>
                <td>{note.username}</td>
                <td>
                    <button className='btn btn-sm btn-primary' onClick={handleEdit}><FontAwesomeIcon icon={faPenToSquare} /></button>
                </td>
            </tr>
        )
    } else return null
}

export default Note