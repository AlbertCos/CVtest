const express = require("express");
const bodyparser = require("body-parser");

const app = express();

// app.use(app.router);
// routes.initialize(app);

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  }
app.post("/", function(req,res){
  var primerlemento=req.body.primero;
  var segundolemento=req.body.segundo;
  var tercerlemento=req.body.tercero;

  console.log(primerlemento,segundolemento,tercerlemento);
})

  var day = today.toLocaleDateString("en-US",options);

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



  res.render("list", {
    kindofday: day
  });
});

app.listen("3000", function() {
  console.log("Port: 3000 connected!");
});
