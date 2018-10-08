const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const app = express();
app.use(express.static( __dirname + '/../public/dist/public' ));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/cakes');
mongoose.Promise = global.Promise;

const ReviewSchema = new mongoose.Schema({
  content: {type: String, required: true, minlength: 2},
  rating: {type: Number, min: 1, max: 5}
})

const CakeSchema = new mongoose.Schema({
  baker: {type: String, required: true, minlength: 2},
  imgUrl: {type: String, default: "https://clipartix.com/wp-content/uploads/2016/05/Birthday-cake-clip-art-free-birthday-cake-clipart-2-clipartcow.jpg" },
  reviews: [ReviewSchema]
})

mongoose.model('Review', ReviewSchema);
mongoose.model('Cake', CakeSchema);

const Cake = mongoose.model('Cake');
const Review = mongoose.model('Review');


app.get('/cakes', (req, res) => {
  // get all cakes
  Cake.find().then(result => {
    res.json({status: "success", result: result});
  }).catch(err => {
    res.json({status: "error", result: err.errors});
  })
})

app.post('/cakes', (req, res) => {
  // post new cake
  const cake = new Cake(req.body);
  cake.save().then(result => {
    res.json({status: "success", result: result});
  }).catch(err => {
    res.json({status: "error", result: err.errors});
  })
})

app.post('/cakes/:id', (req, res) => {
  // post cake review
  const review = new Review(req.body)
  review.save().then(review => 
    Cake.findByIdAndUpdate(
      req.params.id,
      {$push: {reviews: review}},
      {runValidators: true})
  ).then(result => {
    console.log(result)
    res.json({status: "success", result: result});
  }).catch(err => {
    res.json({status: "error", result: err.errors});
  })
})

app.listen(8000, () => {
  console.log('LISTENING AT PORT 8000')
})