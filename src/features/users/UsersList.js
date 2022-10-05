import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/Spinner";

const UsersList = () => {
    const navigate = useNavigate();
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery("usersList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    let content;

    if (isLoading) content = <Spinner />;

    if (isError) {
        return (content = (
            <div className="container">
                <div className="row">
                    <div className="col-md-121 mt-5">
                        <div className="alert alert-danger" role="alert">
                            <strong>Warning!</strong> {error?.data?.message}
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    if (isSuccess) {
        const { ids } = users;

        const tableContent = ids?.length && ids.map((userId) => <User key={userId} userId={userId} />)

        content = (
            <div className="container px-4 py-5">
                <h2 className="pb-2 border-bottom col-md-8">Users Management</h2>
                <div className="mb-0 col-md-8">
                    <button
                        className="btn btn-outline-primary float-end"
                        onClick={() => navigate("/dash/users/new")}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add User
                    </button>
                </div>
                <div className="col-md-8 g-5 py-5">
                    <div className="d-flex flex-column ailgn-item-start gap-2">
                        <div className="card shadow-no ">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Username</th>
                                                <th scope="col">Roles</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>{tableContent}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return content;
    }
};

export default UsersList;
