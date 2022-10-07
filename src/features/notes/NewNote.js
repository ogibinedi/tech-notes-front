import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import Spinner from "../../components/Spinner";
import useTitle from "../../hooks/useTitle";

const NewNote = () => {
    useTitle('Create New Note')
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!users.length) return <Spinner />;

    const content = <NewNoteForm users={users} />;

    return content;
};

export default NewNote;

