const express= require("express");
const bodyparser= require("body-parser");
const ejs=require("ejs");
var path=require("path");
const ejs_lint=require("ejs-lint");
const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/", function(req,res){
    res.render("dashboard");
})
app.get("/compose",function(req,res){
    res.render("compose");
})
app.get("/about", function(req,res){
    res.render('About');
})
app.get("/signup",function(req,res){
    res.render("signup");
})
app.get("/posts",function(req,res){
    res.render("post");
})
app.get("/profile",function(req,res){
    res.render("profile");
})
app.get("/bookmark",function(req,res){
    res.render("bookmark");
})
app.post("/compose",function(req,res){
    const title=req.body.post_title;
    const content=req.body.post_content;
    //this data will be stored in the database
})

app.post("/signup",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const bdate=req.body.bdate;
    const gender=req.body.gender;
    const email=req.body.email;
    const password=req.body.mypass;
    //This is just only for default sign up
})

app.listen(2000, function(){
    console.log("server started at port 2000");
});