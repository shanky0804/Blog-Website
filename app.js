//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
//1Connect start
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin-sanket:Test@123@cluster0.lp8np.mongodb.net/blogDB', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});
//1Connect complete
const homeStartingContent = "Writing is an easy way to express your feelings, your opinions and even to just write stories that interest you.Artwork is a great way to express what you like. You can create a picture however you want and put your own personal touches on the work.There is a huge importance of writing skills in our life. This essay and speech highlights how it plays a good role in our life. 'There is no greater agony than bearing an untold story inside you.' ― Maya Angelou";
const aboutContent = "My name is Sanket. I am a Computer Science Engineer. I am good at programming and interested in Web Development. I am also good at Cricket.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
//2Schema Build
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});
//2Schema Built
//3PostModel
const Post = mongoose.model("Post", blogSchema);
//3PostModel
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let posts = [];

app.get("/", function(req, res){
  //5Getting the post that were made by the 
  Post.find(function (err, posts) {
    if (err) {return console.error(err);}
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
    //console.log(posts);
  })
  //5Getting the post that were made by the 
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  //4Saving a Post
  post.save(function(err){
    if(err){return console.log(err);}
    else{ res.redirect("/");}
  });
  //4Saving a Post
 
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  //6Posting for each param
  Post.findById(requestedPostId, function (err, post) {
    if(err){console.log(err);}
    else{res.render("post", {
      title: post.title,
      content: post.content
    });}
  });
  //6Posting for each param
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
