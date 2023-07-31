//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('./util/database')
const app = express();
const Items = require('./models/items')
const CustomList = require('./models/customlist');
const customList = require("./models/customlist");

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const listTitle = req.body.list
  
  Items.find()
  .then(lists => {
    res.render("list", {
      listTitle : 'Today List',
      lists : lists,
      listName : listTitle
    });
  })
});



app.post("/", function(req, res){

  const item = req.body.newItem;
  const listTitle = req.body.list
Items.insertMany(
  {
    title : item
  }
 )
if (listTitle === 'Today List') {
  res.redirect('/')
 }
else {
  CustomList.findOne ({name : listTitle})
  .then(customList => {
    console.log(customList)
// customList.items.push ({title : item})
//     return customList.save()
  })
  .then(()=> {
    res.redirect('/' + listTitle)
  })
}
});


app.post("/delete", (req,res) => {
  const bodyId = req.body.deleteCheckBox
  Items.findByIdAndRemove(bodyId)
  .then(result => {
    console.log(result)
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
  })

})
const item1 = new Items({
  title : "Welcome to To-Do-List"
})
const item2 = new Items({
 title : "Please Support Creator!"
})
const item3 = new Items({
  title : "Here's The Creator Wallet!"
})
const defaultItems = [item1,item2,item3]
app.get('/:customListName', (req,res) => {
  const customListName = req.params.customListName
  CustomList.findOne({name : customListName})
  .then(result => {
    if(!result) {
      const customList = new CustomList( {
        name : customListName, 
        items : defaultItems
      })
      customList.save()
        res.redirect("/" + customListName) 
    }else {
      res.render("list", {
        listTitle : customListName,
       lists : defaultItems
      });
    }
  })
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
