// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an instance of Express
const app = express();
const port = 4000;


app.use(cors(
  {
    origin: ["https://food-flier.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
))


// Define your MongoDB connection URL
const mongoURI = 'mongodb+srv://ansab9588:ansab9588@cluster0.u3xqxpg.mongodb.net/food-flier-db?retryWrites=true&w=majority'; // Change 'mydatabase' to your database name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true });

// Create a connection object
const mdb = mongoose.connection;

// Handle MongoDB connection errors
mdb.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Handle successful MongoDB connection
mdb.once('open', async() => {
    console.log('Connected to MongoDB successfully');

    // find() is used to search in the fetched data collection
    // find({}) is used to get all the data in that collection
    // toArray() is responsible for making sure that there is enough memory to store the results

    // Fetching data from "food_items" collection from DB
    const fetched_food_items = await mongoose.connection.db.collection('food_items').find({}).toArray();
    global.food_items = fetched_food_items;     // Global variables can be used and update anywhere in our app

    // Fetching data from "food_category" collection from DB
    const fetched_food_category = await mongoose.connection.db.collection('food_category').find({}).toArray();
    global.food_category = fetched_food_category;


 
    app.get('/', async(req, res) => {
      res.send("Hello!, Mongo Community-----");
    });
  });


  // For SignUp Page
  app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,"
    );
    next();
  })


// Define your API routes or middleware here
app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
