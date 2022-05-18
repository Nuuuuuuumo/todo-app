const mongoose = require('mongoose')
const colors = require('colors')

module.exports = async (dbUrl) => {
    try {
        await mongoose
            .connect(dbUrl)
            .then(() => console.log(colors.bgBlue('Data base connected')))
            .catch(err => console.log(colors.bgRed(err.message)))
    } catch (e) {
        console.log(e.message)
    }
}

