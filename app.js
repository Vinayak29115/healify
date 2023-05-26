var path=require("path");
const ejs=require("ejs");
const https=require("https")
const express= require("express");
const ejs_lint=require("ejs-lint");
const fetch =require("node-fetch");
const bodyparser= require("body-parser");
const mongoose= require("mongoose");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));

mongoose.connect("mongodb+srv://admin:Dimpal%401979@cluster0.aiez7.mongodb.net/signsDB?retryWrites=true&w=majority" , { useNewUrlParser: true  ,
useUnifiedTopology : true  } );

// ----------------SignUpDatabase-------------

const detailsSchema = new mongoose.Schema ({
  firstname : {
    type : String ,
    //required : true
  } ,
  lastname : {
    type : String ,
    //required : true
  } ,
  email : {
    type : String ,
    //required : true ,
    //unique : true
  } ,
   pass : {
     type : String ,
     //required : true ,
   } ,
  confirmpass : {
    type : String ,
    //required : true ,
  } ,
  contact : {
    type : Number ,
    //required : true ,
    //unique : true ,
  }
} );

const Detail = mongoose.model("Detail", detailsSchema) ;


const detail1 = new Detail ( {
  firstname :  "Simran" ,
  lastname : "Bhardwaj" ,
  email : "simran.1923csi1111@kiet.edu" ,
  pass :"hehe" ,
  confirmpass : "hehe" ,
  contact : 1234567890 ,
}) ;

detail1.save() ;

const detail2 = new Detail ( {
  firstname : "Vinayak" ,
  lastname : "Rawat" ,
   email : "vinayak@kiet.edu",
   pass : "haha" ,
   confirmpass : "haha" ,
  contact : 4567890987 ,
}) ;

detail2.save() ;

const detail3 = new Detail ( {
  firstname : "Shivang" ,
  lastname : "kumar" ,
  email : "shivang@kiet.edu" ,
   pass : "op" ,
  confirmpass : "op" ,
  contact : 1546783456 ,
}) ;

detail3.save() ;

const defaultdetails = [detail1,detail2,detail3] ;

app.post("/signup",function(req,res){
    const firstname = req.body.fname ;

    const detailLastName = req.body.lname ;

     const detailEmail = req.body.myemail ;

     const detailPass = req.body.mypass ;

     const detailConfirmPass = req.body.mypass2 ;

    const detailContact = req.body.mynum ;

    const newuser = new Detail ( {
      firstname : firstname ,
      lastname : detailLastName ,
      email : detailEmail ,
      pass : detailPass ,
      confirmpass : detailConfirmPass ,
      contact : detailContact

    } );

    newuser.save() ;
    res.redirect("/") ;
}) ;

app.post("/signup",function(req,res){
Detail.find({} , function(err,foundDetails) {
  if(foundDetails.length === 0) {
Detail.insertMany( defaultdetails , function(err)  {
  if(err) {
    console.log(err)   ;
   }
    else {
      console.log("Sucessfully saved details to database") ;
    }
}) ;
res.redirect("/");
}
else{
  res.redirect("/signup");
}
});
});


// --------------Checking if user is registered or not ---------------


app.post("/login",function(req,res){
  const Usname = req.body.Uname ;

  const Logpass = req.body.Pass ;

   Detail.findOne({ email: Usname } , function(err , existingUser) {
   if (existingUser == null) {
     res.redirect("signup") ;
        console.log("This Email is not Registered , Kindly Login First");
   }

   else {
        res.redirect("sign-redirect");
   }
 }) ;
});

// ---------------profile--------------
const personalsSchema = new mongoose.Schema ({
  personal : {
    type : String ,
    //required : true
  } ,
  content : {
    type : String ,
    //required : true
  } ,
  security : {
    type : String ,
    //required : true ,
    //unique : true
  } ,
   subscriptions : {
     type : String ,
     //required : true ,
   }
} );
const Personal = mongoose.model("Personal", personalsSchema) ;

const personal1 = new Personal ( {
  personal :  "UserName : Simran" ,
  content : "The pandemic triggered massive disruption in the healthcare industry and pushed the sector to invest more in innovative new technology. Some of the following digital health trends gained momentum during the pandemic and are predicted to change the future of medicine:" ,
  security : "YourEmail : simran.1923csi1111@kiet.edu" ,
  subscriptions :"Need to subscribe" ,
});
personal1.save();
const defaultPersonals = [personal1]  ;

app.post("/personal",function(req,res){
Personal.find({} , function(err,foundPersonal) {
  if(foundPersonal.length === 0) {
Personal.insertMany( defaultPersonal , function(err)  {
  if(err) {
    console.log(err)   ;
   }
    else {
      console.log("Sucessfully saved details to database") ;
    }
}) ;
res.redirect("/profile");
}
else{
  res.redirect("/personal");
}
});
});
// ----------------feedDatabase---------------

const feedsSchema = new mongoose.Schema({
  head: String,
  picture: {
    type: String,
    get: v => `${v}`
  },
  data: String,
})
const Feed= mongoose.model("Feed", feedsSchema);

const feed1 = new Feed({
  head: "Omicron Symptoms Can Look Like Allergies—Here's How to Tell the Difference",
  picture: 'https://www.health.com/thmb/tOL84Bkbyso51VzdMIkuFabLNwE=/900x0/filters:no_upscale():max_bytes(150000):strip_icc():gifv():format(webp)/allergies-vs-omicron-pexels-polina-tankilevitch-3873179-180a09ce33164f04972e9c5c93431b57.jpg',
  data: "With Omicron and its subvariants specifically—due to increased exposure to COVID-19 through vaccination or prior illness, or other variables—the virus generally causes more mild disease. Though symptoms don't stray too far from those typically associated with COVID-19 in general, Omicron and its subvariants, can look a lot like common cold, and even seasonal allergies.",
});
const feed2 = new Feed({
  head: "Mental Illness and Gun Violence: Why It's Harmful to Link the Two",
  picture: 'https://www.health.com/thmb/GQ_M27YdToUWeFxy5bPTkotTIk8=/900x0/filters:no_upscale():max_bytes(150000):strip_icc():gifv():format(webp)/memorial-candles-GettyImages-1397633812-29d8da595cec42a2b0a7c41325ba6f1e.jpg',
  data: "An 18-year-old gunman claimed the lives of 19 school children and two adults in Uvalde, Texas, on Tuesday morning. The school shooting occurred just days after another mass shooting—a hate crime at a Buffalo, New York grocery store.",
});
const feed3 = new Feed({
  head: "Kidney Disease Patients Face Increased Risk of Developing Cancer, Study Shows",
  picture: 'https://assets.thehansindia.com/h-upload/2022/04/09/1286025-cancer.webp',
  data: "People with mild-to-moderate chronic kidney disease (CKD), and those who have received kidney transplants, may have an increased risk of developing cancer, new research shows. In some cases, people with CKD may have a heightened risk of death from certain cancers, as well.",
});
feed1.save();
feed2.save();
feed3.save();
const defaultFeeds = [feed1, feed2, feed3]

// ----------------------bookmarkDatabase-------------------------

const savesSchema = new mongoose.Schema({
  head: String,
  data: String,
})
const Save= mongoose.model("Save", savesSchema);

const save1 = new Save({
  head: "Rising Trends in Digital Health: 5 Technologies That Will Define the Future of Healthcare",
  data: "The pandemic triggered massive disruption in the healthcare industry and pushed the sector to invest more in innovative new technology. Some of the following digital health trends gained momentum during the pandemic and are predicted to change the future of medicine:",
});
const save2 = new Save({
  head: "Frequent Use of Antibiotics Tied to Inflammatory Bowel Disease in Older Adults",
  data: "Older people who frequently take antibiotics are at greater risk of developing inflammatory bowel disease (IBD), according to research presented at Digestive Disease Week (DDW) 2022. The study has not been peer-reviewed or published.",
});
const save3 = new Save({
  head: "12 fitness trends for 2022",
  data: "With online workouts still trending and more gym-goers returning to the gym, the world is trying to adapt to a new way of life. Let’s look toward 2022 with optimism in the hopes that the pandemic releases its grip on the world. As technology continues to advance, there will be new opportunities for brands and consumers in fitness. ",
});
save1.save();
save2.save();
save3.save();
const defaultSaves = [save1, save2, save3];


app.get("/", getFeeds, api, renderForm);
let feeDS=[];
let neWS=[];
async function getFeeds(req, res, next) {
   // Code here
   
   Feed.find({}, function (err, foundFeeds) {
     if(foundFeeds.length === 0){
       Feed.insertMany(defaultFeeds, function(err){
         if (err){
           console.log(err);
         }
         else{
           console.log("Working");
         }
       });
       res.redirect("/");
     }else{
       feeDS = foundFeeds;
     }
     next();
   });
};
async function api (req,res, next){
  const apikey = "cf0473208c26450d9ec1a8dee6d5a54c";
  const url="https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=cf0473208c26450d9ec1a8dee6d5a54c";
  const response = await fetch(url, {method:'GET'});
  const data = await response.json();
  neWS = data.articles;
  next();
}
function renderForm(req, res) {
    res.render("dashboard",{newListFeeds:feeDS, NEWS:neWS});
};

app.get("/sign-redirect",function(req,res){
    res.render("signup_redirect");
});

app.get("/compose",function(req,res){
    res.render("compose");
});

app.get("/about", function(req,res){
    res.render("About");
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

app.get("/personal",function(req,res){
    res.render("personal");
});

app.get("/bookmark",function(req,res){
  Save.find({}, function(err, foundSaves){
  if(foundSaves.length === 0){
    Save.insertMany(defaultSaves, function(err){
      if (err){
        console.log(err);
      }
      else{
        console.log("Working");
      }
    });
    res.redirect("/bookmark");
  }else{
    res.render("bookmark", {newListSaves: foundSaves});
  }
})
});
let sentiments;
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
let result;
app.get("/assistance",(req,res)=>{
  res.render("assistance",{sentiments:result});
});

app.post("/assistance",(req,res)=>{
  const feelings=req.body.myfeelings;
  sentiments = sentiment.analyze(feelings);
  if(sentiments.score === 0)
    result="You are emotionally well";
  else if(sentiments.score < -5)
    result="Your mental health is very bad";
  else if(sentiments.score < 0)
    result="Your mental well being is not so good but it can be if you change some habits.";
  else if(sentiments.score > 0)
    result="You are mentally well.";
  res.redirect("/assistance");
});


app.listen(process.env.PORT || 8080, ()=>{
    console.log("server started at port 8080");
});
