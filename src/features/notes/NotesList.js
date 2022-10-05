import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const NotesList = () => {
  const navigate = useNavigate();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("noteList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <Spinner />;

  if (isError) {
    return (content = (
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="alert alert-danger" role="alert">
              <strong>Warning!</strong> {error?.data?.message}
            </div>
          </div>
        </div>
      </div>
    ));
  }

  if (isSuccess) {
    const { ids } = notes;
    const tableContent = ids?.length
      ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <div className="container px-4 py-5">
        <h2 className="pb-2 border-bottom">List of Notes</h2>
        <div>
          <button
            className="btn btn-outline-primary float-end"
            onClick={() => navigate("/dash/notes/new")}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Note
          </button>
        </div>
        <div className="col-md-12 align-items-md-center g-5 py-5">
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

export default NotesList;
