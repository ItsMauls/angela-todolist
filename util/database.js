const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://maulputra09:QUGj7s9BjpeqejCG@cluster0.fupzsui.mongodb.net/todoListDB')
.then(()=> {
    console.log('Database Connected!')
})
.catch(err => console.log(err))

