const express = require("express");
const bodyparser = require("body-parser");
// const date = require(__dirname+"/date.js");
const mongoose = require("mongoose");

const app = express();

mongoose.set("useNewUrlParser",true);
mongoose.set("useUnifiedTopology",true);
mongoose.connect("mongodb://localhost:27017/todolistDB");


const itemsSchema= {
  name:String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1= new Item({
  name: "Comprar Bananas"
});

const item2= new Item({
  name: "Ir a por naranjas"
});
const item3= new Item({
  name: "Pedir Gasolina"
});

const defaultItems = [ item1,item2,item3];


app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  // let day = date();
  Item.find({},function(err,foundItems){
      if(foundItems.length===0){
        Item.insertMany(defaultItems,function(err){
          if(err){
            console.log(err);
          }else{
            console.log("All right!");
          }
        });
        res.redirect("/");
      }else{
        res.render("list", { newlistItem: foundItems,  ListTittle: "Today"});
      }
  });
});

app.post("/", function(req, res) {

  const itemName =req.body.newItem;
  const item =new Item({
    name:itemName
  });

item.save();
res.redirect("/");

});

app.post("/delete", function(req, res) {

  const checkedItemID = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemID,function(err){
    if(err){
      console.log(err);
    }else{
      console.log("deleted successfull!");
    }
  })
  
  res.redirect("/");
});

app.get("/work", function(req, res) {
  res.render("list", {
    newlistItem: workitems,
    ListTittle: "work List"
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});



app.listen("3000", function() {
  console.log("Port: 3000 connected!");
});
