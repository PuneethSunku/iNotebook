const express = require('express')
const router =  express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body , validationResult} = require('express-validator');//To validate the input notes

//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes" . login required
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//ROUTE 2: Add new Note using: POST "/api/notes/addnote" . login required
router.post('/addnote',fetchuser,[
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
], async(req,res)=>{
    try {
        const {title , description ,tag} =req.body;

        const errors = validationResult(req); //This will check is there any validation errors
        if (!errors.isEmpty()) { 
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title,description,tag,user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
})

//ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote" . login required
//we use put instead of doing first get and the post , directly we use put
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
    const {title , description , tag} = req.body;
    try {
        //Create a newNote Object
        const newNote ={};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Check whether the note exist or not & is the user accesing the note is the owner of that note or not
        const note = await Notes.findById(req.params.id);//this id we get from request parameter only u can check url for this
        if(!note){res.status(404).send("Note Not found")}
        
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Access Denied")
        }
            
        //Now update the note

        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true}) //new:true means if any new note is added , add that also
        res.json({updatedNote});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})  

// Delete a Note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Check whether the note exists or not
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not found");
        }

        // Check if the user accessing the note is the owner of that note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied");
        }

        // Now delete the note
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: deletedNote });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router