import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import Spinner from "../../components/Spinner";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useAuth } from '../../hooks/useAuth'
import useTitle from "../../hooks/useTitle";

const EditNote = () => {
    useTitle('Edit Note')
    const { id } = useParams();
    const { username, isManager, isAdmin } = useAuth()

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        })
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!note || !users?.length) return <Spinner />

    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <div className="alert alert-danger">No access</div>
        }
    }

    const content = <EditNoteForm users={users} note={note} />;

    return content;
};

export default EditNote;

