const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { cp } = require('fs');

//parse the req body
app.use(bodyParser.json())

//port listening
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

//routes
app.post('/library/add', addBook);
app.delete('/library/delete', removeBook);
app.patch('/library/update', updateBook);
app.get('/library/get', getBooks);
app.put('/library/put', saveBooksWithSaveTime);


// logics
bookCollection = ["book1", "book2", "book3", 1, 2, 3, 2,4 ,5, 12,5,6, 1243 ,134 ];

//add book to lib
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


//delete book from lib
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

//update book - patch
function updateBook(req, res) {
    try {
        if (req && req.body && req.body.original_book && req.body.new_book) {
            const bookName = req.body.original_book;
            const newName = req.body.new_book;
            const index = this.bookCollection.indexOf(bookName);
            const indexOfNewName = this.bookCollection.indexOf(newName);
            if (index > -1 && indexOfNewName === -1) {
                this.bookCollection[index] = newName;
                res.json(`Book Name of ${bookName} updated to ${this.bookCollection[index]}. Updated Library Collection = ${this.bookCollection}`);
            } else if(index > -1 && indexOfNewName > -1) {
                throw 'DuplicateBook';
            } else if (index == -1) {
                throw 'DoesNotExist';
            }
        } else {
            throw 'Empty'
        }
    } catch (err) {
        if (err === 'Empty') {
            res.status(400).send({message: "Empty Data Not Allowed"});
        } else if (err === 'DoesNotExist') {
            res.status(400).send({ message: req.body.original_book + " does not exist in Library. Please select a book from this list : " + this.bookCollection });
        } else if (err === 'DuplicateBook') {
            res.status(400).send({ message: req.body.new_book + " already in Library. Please select another name for " + req.body.original_book });
        } else {
            res.status(500).send({ message: "Server Error" });
        }
    }
}

//get books string
booksString= '';
var collectionString = ''
function getBooks(req, res) {
    const collection = this.bookCollection;
    const index = 0;
    getBookList(collection, index, callbackReturnFn);
    res.send(this.booksString);
}

// --> async function getBookList with 3 params -> list, index, callback
async function getBookList (collection, index, callback) {
    if(index < collection.length) {
        collectionString += collection[index] + (index < collection.length -1 ?  ', ' : '');
        index++;
        await getBookList(collection, index, callback);
    }
    callback(collectionString);
};

 // --> callback fn with string as argument
function callbackReturnFn(collectionString) {
    this.booksString = collectionString;
    return this.booksString;
}

//put request
response = {};
async function saveBooksWithSaveTime(req, res) {
    const bookList = req.body.books;
    await asyncStoring(bookList);
    res.json(this.response);
    this.response = {};
}

async function asyncStoring(bookList) {
    for (let i = 0; i < bookList.length; i++) {
        await saveItemOnDatabase(bookList[i], saveBooksCB); // fn to be called
    }
 }

async function saveItemOnDatabase(book, callback) {
    const timeout = Math.random() * book.length * 100;
    await setTimeout(() => {
        callback(book, timeout);
        console.log(timeout)
    }, timeout);
}

async function saveBooksCB(book, time) {
    this.response[book] = time;
    return await this.response;
}