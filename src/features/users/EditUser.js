import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import Spinner from "../../components/Spinner";

import { useGetUsersQuery } from "./usersApiSlice";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
    useTitle('Edit User')
    const { id } = useParams();

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

    if (!user) return <Spinner />

    const content = <EditUserForm user={user} />;


    return content;
};

export default EditUser;

