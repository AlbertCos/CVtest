const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.get("/", function(req,res){
  res.send("hello")
});

app.listen("3000", function(){
  console.log("Port: 3000 connected!")
});
