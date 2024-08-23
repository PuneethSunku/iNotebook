import React,{ useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context ;

    const[note , setNote] =useState({title: "", description: "", tag: ""});

    const handleClick = (event)=>{
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""}); //TO get blank to add new data
        props.showAlert("Added Note Successfully", "success");
    }

    const onChange = (event)=>{
        setNote({...note, [event.target.name]: event.target.value}) //IMPORTANTTTTTTTTT, here u are giving the current value to its corresponding name of the input
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className= 'my-3'>
                <div className="form-group my-3" >
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control my-1" id="title" name="title" value={note.title || ""} onChange={onChange} minLength={3} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control my-1" id="description" name="description" value={note.description || ""} onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control my-1" id="tag" name="tag" value={note.tag || ""} onChange={onChange} minLength={3} required />
                </div>
                <button disabled={note.title.length<3 || note.description.length<5 || note.tag.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>  
            </form>
        </div>
    )
}

export default AddNote
