import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context ;
    let navigate = useNavigate();
    console.log(localStorage.getItem('token'));
    useEffect(()=>{
        if(localStorage.getItem('token')){ //If token is not null
            getNotes();
        }
        else{
            navigate("/login");
        }
        //eslint-disable-next-line
    },[]) //Empty array telling to fetch once only

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNewNote({id:currentNote._id, edittitle: currentNote.title, editdescription: currentNote.description, edittag: currentNote.tag,});
    };
    
    const[newNote , setNewNote] =useState({id: "", edittitle: "", editdescription: "", edittag: ""})
    const handleClick = (event)=>{
        console.log("Updating the note");
        editNote(newNote.id, newNote.edittitle, newNote.editdescription, newNote.edittag);
        refClose.current.click();
        props.showAlert("Updated Note Successfully", "success");
    }

    const onChange = (event)=>{
        setNewNote({...newNote, [event.target.name]: event.target.value}) //IMPORTANTTTTTTTTT, here u are giving the current value to its corresponding name of the input
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            {/* Button trigger modal */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"> 
                Launch demo modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className= 'my-3'>
                            <div className="form-group my-3">
                                <label htmlFor="edittitle">Title</label>
                                <input type="text" className="form-control my-1" id="edittitle" name="edittitle" value={newNote.edittitle} onChange={onChange} minLength={3} required/>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="editdescription">Description</label>
                                <input type="text" className="form-control my-1" id="editdescription" name="editdescription" value={newNote.editdescription} onChange={onChange} minLength={5} required/>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="edittag">Tag</label>
                                <input type="text" className="form-control my-1" id="edittag" name="edittag" value={newNote.edittag} onChange={onChange} minLength={3} required/>
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={newNote.edittitle.length<3 || newNote.editdescription.length<5 || newNote.edittag.length<3} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length===0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert}/>;
                })}
            </div>
        </>
    );
};

export default Notes;
//If we write d-none in className it means display none(i.e dont display)
//To click on any button u can do using ref from any function