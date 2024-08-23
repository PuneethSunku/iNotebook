//To add into devDependencies(in package.json) we write like -D while installing
// nodemon is used to connect the mongo or to run the index.js file
//Need to know why they are using like require why not import
const connectToMongo = require('./db');
var cors = require('cors')
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(cors())
//Middleware need to keep if i want to use the request body and to send content in json
app.use(express.json());
//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))




app.get('/', (req, res) => {
  res.send('Hello Puneeth!')
})



app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
})