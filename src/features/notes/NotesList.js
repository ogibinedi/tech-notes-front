import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note';

const NotesList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <div className="alert alert-danger" role="alert">
            {error?.data?.message}
        </div>
    }

    if (isSuccess) {
        const { ids } = notes
        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null

        content = (
            <div className="container px-4 py-5">
                <h2 className="pb-2 border-bottom">List of Notes</h2>
                <div className="row col-md-12 align-items-md-center g-5 py-5">
                    <div className="d-flex flex-column ailgn-item-start gap-2">
                        <div className="card shadow-no">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Status</th>
                                                <th scope="col">Created</th>
                                                <th scope="col">Updated</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Owner</th>
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

export default NotesList