const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// __________________ DB Config __________________ //
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('db is up & running!'));

mongoose.connection.on('connected', () => {
    console.log('connected to mongo db!');
})
mongoose.connection.on('error', (err) => {
    console.error(`error connecting to mongo db: ${err}`);
});

// __________________ Middleware __________________ //
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// __________________ Routes __________________ //
// app.use('/users', userRoutes);
// app.use('/expenses', expenseRoutes);
module.exports = app;

// __________________ Static Files __________________ //
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../../client', 'build', 'index.html')
        );
    })
}