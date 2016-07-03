var express = require('express');

var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Tolstoy',
            bookId: 656,
            read: false
        },

        {
            title: 'Les Miserables', 
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            bookId: 24280,
            read: false
        },

        {
            title: 'Harry Potter',
            genre: 'Fantasy',
            author: 'J.K. Rowling',
            read: false
        }]; 

var router = function(nav){

    adminRouter.route('/addBooks')
        .get(function(req, res){
            
            var url = 
                'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.insertMany(books, 
                    function(err, result){
                        res.send(result);
                        console.log('yo')
                        db.close();
                });
            });
        });

    return adminRouter;
} 

module.exports = router; 