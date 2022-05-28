var path=require("path");
const ejs=require("ejs");
const https=require("https")
const express= require("express");
const ejs_lint=require("ejs-lint");
const fetch =require("node-fetch");
const bodyparser= require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/", async function(req,res){

    const apikey = "cf0473208c26450d9ec1a8dee6d5a54c";

    const url="https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=cf0473208c26450d9ec1a8dee6d5a54c";

    const response = await fetch(url, {method:'GET'});
    const data = await response.json();
    //console.log(data.articles);
    res.render("dashboard", {NEWS: data.articles});

});

app.get("/compose",function(req,res){
    res.render("compose");
});

app.get("/about", function(req,res){
    res.render('About');
});

app.get("/signup",function(req,res){
    res.render("signup");
});

app.get("/posts",function(req,res){
    res.render("post");
});

app.get("/profile",function(req,res){
    res.render("profile");
});

app.get("/bookmark",function(req,res){
    res.render("bookmark");
});

app.post("/compose",function(req,res){
    const title=req.body.post_title;
    const content=req.body.post_content;
    //this data will be stored in the database
});

app.post("/signup",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const bdate=req.body.bdate;
    const gender=req.body.gender;
    const email=req.body.email;
    const password=req.body.mypass;
    //This is just only for default sign up
})


app.listen(process.env.PORT || 8080, ()=>{
    console.log("server started at port 8080");
});
