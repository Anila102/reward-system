const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')
const Auth =require("./src/routes/auth")
const Tasks =require("./src/routes/tasks")


const app = express()
const port = 5000;

app.use(cors())
app.use(express.json())
app.use('/api/auth',Auth);
app.use('/api/tasks',Tasks);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
