const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("server.js");
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

app.post('/library/add', addBook);
app.delete('/library/delete', removeBook)


// logics
bookCollection = [];

function addBook(req, res) {
    try {
        if (req && req.body && req.body.book) {
            const bookName = req.body.book;
            if (!this.bookCollection.includes(bookName)) {
                this.bookCollection.push(bookName);
                res.json(`Library Collection = ${this.bookCollection}`);
            } else {
                throw 'AlreadyExists'
            }
        } else {
            throw 'Empty'
        }
    } catch (err) {
        if (err === 'Empty') {
            res.status(400).send({message: "Empty Data"});
        } else if (err === 'AlreadyExists') {
            res.status(400).send({ message: req.body.book + " Already Exists" });
        } else {
            res.status(500).send({ message: "Server Error" });
        }
    }
}


//delete book
function removeBook(req, res) {
    try {
        if (req && req.body && req.body.book) {
            const bookName = req.body.book;
            const index = this.bookCollection.indexOf(bookName);
            if (index > -1) {
                this.bookCollection.splice(index, 1);
                res.json(`Book Removed. Updated Library Collection = ${this.bookCollection}`);
            } else {
                throw 'DoesNotExist'
            }
        } else {
            throw 'Empty'
        }
    } catch (err) {
        if (err === 'Empty') {
            res.status(400).send({message: "Empty Data Not Allowed"});
        } else if (err === 'DoesNotExist') {
            res.status(400).send({ message: req.body.book + " does not exist in Library. Please select a book from this list : " + this.bookCollection });
        } else {
            res.status(500).send({ message: "Server Error" });
        }
    }
}