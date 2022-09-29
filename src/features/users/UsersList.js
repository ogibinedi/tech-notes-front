import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <div className="alert alert-danger" role="alert">
            {error?.data?.message}
        </div>
    }

    if (isSuccess) {
        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null
        content = (
            <div className="container px-4 py-5">
                <h2 className="pb-2 border-bottom">Users Management</h2>
                <div className="row col-md-6 align-items-md-center g-5 py-5">
                    <div className="d-flex flex-column ailgn-item-start gap-2">
                        <div className="card shadow-no">
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
                                        <tbody>
                                            {tableContent}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        return content
    }
}

export default UsersList