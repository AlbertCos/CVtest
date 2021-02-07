const express = require("express");
const bodyparser = require("body-parser");

const app = express();

var primerlementos =[];
// app.use(app.router);
// routes.initialize(app);

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };


  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    newlistItem: primerlementos,
    kindofday: day
  });

});

app.post("/", function(req, res) {
  var primerlemento = req.body.newItem;
  primerlementos.push(primerlemento);
  res.redirect("/");

});



app.listen("3000", function() {
  console.log("Port: 3000 connected!");
});


// if (today.getDay() === 6 || today.getDay() === 0) {
//   day = "Weekend";
// } else {
//   day = "Weekday";
// }

// switch (today.getDay()) {
//   case 0:
//     day = "Sunday";
//     break;
//   case 1:
//     day = "Monday";
//     break;
//   case 2:
//     day = "Tuesday";
//     break;
//   case 3:
//     day = "Wednesday";
//     break;
//   case 4:
//     day = "Thursday";
//     break;
//   case 5:
//     day = "Friday";
//     break;
//   case 6:
//     day = "Saturday";
//     break;
// }
