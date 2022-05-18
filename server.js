//IMPORTS
const express = require('express')
const config = require('config')
const cors = require('cors')
const colors = require('colors');
const router = require('./routes/router')


//Application
const app = express()
const PORT = config.get('port') || 3030
const DB = config.get('dbUrl')
const connectDB = require('./dataBase/mongoDB')

app.use(cors())
app.use(express.json())
app.use('/api/tasks', router)
const start = async () => {
    try {
        await connectDB(DB)
        app.listen(PORT, () => {
            console.log(colors.blue(`Server has been started on PORT ${PORT}`))
        })
    } catch (e) {
        console.log(e)
    }
}
start()