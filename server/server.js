const express = require('express');
const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}))
app.use(
    session({
      key: "user",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
        path: '/',
        httpOnly: false, 
        maxAge: null
      },
    })
  );

app.get('/getRecipeCards', routes.getRecipeCards)

app.get('/Recipe', routes.getRecipe)

app.get('/searchIngredients', routes.searchIngredients)

app.get('/searchBrand', routes.searchBrand)

app.get('/nutrition', routes.searchNutrition)

app.get('/FastRecipe', routes.searchFastRecipes)

app.get('/EasyRecipe', routes.searchEasyRecipes)

app.get('/ProteinRecipe', routes.searchProteinRecipes)

app.get('/LowFatRecipe', routes.searchLowFatRecipes)

app.get('/getRecommendationList', routes.getRecommendationList)

app.get('/getRatingsAndReviews', routes.getRatingsAndReviews)

app.get('/generateRecipe', routes.generateRecipe)

app.get('/getRecipeStat', routes.getRecipeStat)

app.post('/setLogin', routes.setLogin)

app.get('/getAccountInformation', routes.getAccountInformation)

app.post('/login', routes.login);

app.get('/login', routes.userSession);

app.get('/logout', routes.logout);

app.post('/setFavoriteRecipe', routes.setFavoriteRecipe)

app.get('/getFavoriteRecipe', routes.getFavoriteRecipe);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;