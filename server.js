const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI || process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

const todoAppRouter = require('./routes/todoApp')

app.use('/todoApp', todoAppRouter)

if(process.env.NODE_ENV === 'production') {
	app.use(express.static( 'client/build' ));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
}

app.listen(port, () => {
    console.log(`Server is running in port: ${port}`)
})