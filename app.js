const express = require("express");
const bodyparser = require("body-parser");
const _= require("lodash");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb+srv://admin-alberto:Test123@cluster0.7kyk1.mongodb.net/todolistDB");


const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  name: "Comprar Bananas"
});

const item2 = new Item({
  name: "Ir a por naranjas"
});
const item3 = new Item({
  name: "Pedir Gasolina"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);



app.get("/", function(req, res) {

  // let day = date();
  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("All right!");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {newlistItem: foundItems,ListTittle: "Today"});
    }
  });
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
            name: customListName,
            items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          newlistItem: foundList.items,
          ListTittle: foundList.name,
        });
      }
    }
  });

});


app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+ listName);
    });

  }

});

app.post("/delete", function(req, res) {

  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemID, function(err) {
      if (!err) {
        console.log("deleted successfull!");
        res.redirect("/");
      }
    });
  }else{

    List.findOneAndUpdate({name:listName},{$pull:{items: {_id:checkedItemID}}},
    function(err,foundList){
      if(!err){
        console.log("deleted successfull!");
        res.redirect("/"+listName);
      }
    });
  }


  });

app.get("/about", function(req, res) {
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
};

app.listen(port, function() {
  console.log("Port: 3000 connected!");
});
