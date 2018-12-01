var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false}); //Middleware to run in post request
var mongoose = require('mongoose');

//Connect to DB
mongoose.connect('mongodb://jcatt:bobo123@ds115263.mlab.com:15263/todo', { useNewUrlParser: true });

//create a schema - blueprint for data
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'learn to code'}];

module.exports = function(app){
    app.get('/todo', function(req, res){
        //get data from mongoDB and pass to views
        Todo.find({}, function(err, data){ //Retrieve all the items
            if (err) throw err;
            res.render('todo', {todos: data});
        }); 
        
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from view and add to mongoDB
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json({todos: data}); //RESponse of data is sent as json 
        })
        
        });

    app.delete('/todo/:item', function(req, res){ //access the item from this URL

        //delete requested item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) {
                throw err
            };
            res.json(data);
        }); 
   
    });

};