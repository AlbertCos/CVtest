const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.get("/", function(req, res) {

  var today = new Date();
  if (today.getDay() === 6 || today.getDay() === 0) {
  res.send("Yay it´s the weekend!");
} else {
  res.send("Boo! I have to work!");
}

});



app.listen("3000", function() {
  console.log("Port: 3000 connected!")
});
