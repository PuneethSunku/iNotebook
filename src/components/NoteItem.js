import React,{ useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const {note, updateNote, showAlert} = props;
    const context = useContext(noteContext);
    const { deleteNote } = context ;
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const confirmDelete = () => {
        deleteNote(note._id);
        setShowModal(false);
        props.showAlert("Deleted Note Successfully", "success");
    };

    const cancelDelete = () => {
        setShowModal(false);
    };
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={handleDeleteClick}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
            {showModal && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={cancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete the <strong>{note.title}</strong> note?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default NoteItem
