require('./db');
const express = require('express');
require('dotenv').config()
const cors = require('cors')
const app = express();
const PORT = process.env.PORT;
const registerRoute = require("./routes/userRoutes");
const { errorHandler } = require('./middleware/errorHandler');
const path = require('path');
__dirname = path.resolve();

app.use(cors())
app.use(express.json());



//Available routes
app.use('/api/user', registerRoute)


//-----------deployment--------

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running")
    }
    )
}


app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Application is listenning on ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`)
})