const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.export = mongoose.connect('mongodb://localhost/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})