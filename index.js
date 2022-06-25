const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const p1 = Recipe.create({
      title: "Burger aux couleurs de l'Italie",
      level: "Easy Peasy",
      ingredients: [
        "2 tomatoes",
        "1 red onion",
        "15ml basilic cream",
        "Mayonnaise",
        "Minced beef",
        "Italian cheese",
        "Burger bread",
        "Salad",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://media.discordapp.net/attachments/988151515145470003/990220495037284432/IMG20220625134227.jpg?width=1706&height=1280",
      duration: 25,
      creator: "ShalltearFR",
    })
      .then((data) => {
        // console.log('process succesful', data)
      })
      .catch((error) => {
        console.log(error);
      });

    const p2 = Recipe.create(data)
      .then((data) => {
        console.log("process succesful", data);
      })
      .catch((error) => {
        console.log(error);
      });

    return Promise.all([p1, p2])
  })
  .then(() => {
    
    // all done => closing connection
    mongoose.connection.close()
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
