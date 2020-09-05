var express = require("express");
var request = require('request');
var mongoose = require('mongoose');
var Story = require('./module/story');
var Question = require('./module/qusetion');
mongoose.connect('mongodb://localhost/corona',{useNewUrlParser: true,useUnifiedTopology: true})
var app= express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
var bodyp,b;
request('https://api.rootnet.in/covid19-in/stats/latest',function(error,response,body)
{
    if(!error && response.statusCode==200)
    {
         bodyp=JSON.parse(body);
    }
})
request('https://api.covid19india.org/state_district_wise.json',function(error,response,body)
{
    if(!error && response.statusCode==200)
    {
         b=JSON.parse(body);
    }
})
app.get('/',function(req,res){
    res.render('cases',{bodyp:bodyp})
})
app.get('/typestate',function(req,res){
    res.render('cases/statedata',{bodyp:bodyp});
})
app.get('/deaths',function(req,res){
    res.render('cases/statewisedeath',{bodyp:bodyp});
})
app.post('/typestate',function(req,res){
     res.render('cases/yourstate',{bodyp:bodyp,Name:req.body.Name,b:b})
})
//////////////////////////////////////////
app.get('/question',function(req,res)
{
    res.render('question/questionform')
})
app.post('/question',function(req,res)
{
    Question.create(
        {
            author:req.body.author,
        question:req.body.question
        },function(err,question)
        {
            Question.find({},function(err,questions)
            {
                res.render('question/qa',{questions:questions})
            })
        }
    )
})
app.get('/question/read',function(req,res)
{
            Question.find({},function(err,questions)
            {
                res.render('question/qa',{questions:questions})
            })
})
app.get('/question/:id',function(req,res)
{
    Question.findById(req.params.id,function(err,question)
    {
           res.render('question/answer',{question:question})
    })
})
app.post('/question/:id',function(req,res)
{
    Question.findById(req.params.id,function(err,question)
    {
           question.answer.push(
               {
                   author:req.body.author,
                   answer:req.body.answer
               }
           )
           question.save(function(err,question)
           {
              res.redirect('/question/read')
           })
    })
})
app.listen(3000,function()
{
    console.log("server is running...")
})