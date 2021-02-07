const express = require("express");
const bodyparser = require("body-parser");

const app = express();

let primerlementos = [];
let workitems = [];
// app.use(app.router);
// routes.initialize(app);

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };


  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    newlistItem: primerlementos,
    ListTittle: day
  });

});

app.post("/", function(req, res) {

  let primerlemento = req.body.newItem;

  if (req.body.list === "work") {
    workitems.push(primerlemento);
    res.redirect("/work");
  } else {

    primerlementos.push(primerlemento);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    newlistItem: workitems,
    ListTittle: "work List"
  });
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
