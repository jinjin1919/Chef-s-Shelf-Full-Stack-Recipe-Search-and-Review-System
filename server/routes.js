const config = require('./config.json')
const mysql = require('mysql');

// Connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// Get Recipe Card information based on name
async function getRecipeCards(req, res) {
    var name = req.query.name ? req.query.name : "";
    if (req.query) {
        connection.query(`WITH ImageInfo AS (
                            SELECT DISTINCT id, recipeName, authorName, description, imageName, rating, reviewCount
                            FROM ImageName
                            WHERE recipeName LIKE '%${name}%'
                        )
                        SELECT R.name, I.id, I.authorName, I.description, I.imageName, I.rating, I.reviewCount, R.minutes, RS.n_steps, RI.n_ingredients
                        FROM ImageInfo I JOIN Recipes R ON I.id = R.id
                                        JOIN RecipeSteps RS ON I.id = RS.id
                                        JOIN RecipeIngredients RI ON I.id = RI.id;`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get Recipe information based on id
async function getRecipe(req, res) {
    var id = req.query.id ? req.query.id : 0;
    if (req.query) {
        connection.query(`WITH ImageInfo AS (
                                SELECT id, recipeName, authorName, description, imageName
                                FROM ImageName
                                WHERE id = ${id}
                            ),
                                Nutrition AS (
                                    SELECT id, calories, totalFat, sugar, sodium, protein, saturatedFat, totalCarb
                                    FROM RecipesNutrition
                                    WHERE id = ${id}
                                ),
                                RecipeInfo AS (
                                    SELECT id, ingredients, steps
                                    FROM Recipes
                                    WHERE id = ${id}
                                )
                            SELECT I.id, I.recipeName, I.authorName, I.description, I.imageName, R.ingredients, R.steps,
                                N.calories, N.totalFat, N.sugar, N.sodium, N.protein, N.saturatedFat, N.totalCarb
                            FROM ImageInfo I JOIN RecipeInfo R ON I.id = R.id
                                            JOIN Nutrition N ON I.id = N.id;`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get ingredient information
async function searchIngredients(req, res) {
    var name = req.query.name ? req.query.name : "";
    if (req.query) {
        connection.query(`SELECT DISTINCT ingredientDescription, protein, totalFat, carbohydrate, energy, sugar, fiber, calcium, iron, potassium,
                        sodium, vitaminA, vitaminD, vitaminC, vitaminB6, vitaminB12, vitaminK, vitaminEAdded, vitaminB12Added, cholesterol, fattyAcidMono, 
                        fattyAcidPoly, fattyAcidSat
                        FROM Nutrition
                        WHERE ingredientDescription LIKE '%${name}%' 
                        ORDER BY ingredientDescription;`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get brand information
async function searchBrand(req, res) {
    var name = req.query.name ? req.query.name : "";
    if (req.query) {
        connection.query(`SELECT DISTINCT G.brand, G.no_of_item, M.manufacturer, G.address, G.website
                        FROM Grocery_Brand G JOIN Manufacturer M on G.grb_id = M.grb_id
                        WHERE brand LIKE '%${name}%'
                        ORDER BY brand;`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get Recipe based on filtered nutrition
async function searchNutrition(req, res) {
    var clow = req.query.clow ? req.query.clow : 0
    var chigh = req.query.chigh ? req.query.chigh : 20000
    var plow = req.query.plow ? req.query.plow : 0
    var phigh = req.query.phigh ? req.query.phigh : 3600
    var num = req.query.num ? req.query.num : 100
    var attribute = req.query.attri ? req.query.attri: "sugar"
    var allergy = req.query.allergy ? req.query.allergy: ""
    var favor = req.query.favor ? req.query.favor : ""
    
    if (req.query) {
        connection.query(`WITH WithFavoriteIngredient AS (
                            SELECT R.name, R.id, N.calories, N.protein, N.sugar, N.sodium, N.totalFat, N.totalCarb
                            FROM Recipes R JOIN RecipesNutrition N on R.id = N.id
                            WHERE calories >= ${clow}
                            AND calories <= ${chigh}
                            AND protein >= ${plow}
                            AND protein <= ${phigh}
                            AND R.ingredients LIKE '%${favor}%'
                            AND N.${attribute} <= ${num}
                        )
                        SELECT DISTINCT R.name, R.id, R.protein, R.calories, R.sugar, R.sodium, R.totalFat, R.totalCarb, I.imageName
                        FROM WithFavoriteIngredient R JOIN ImageName I ON R.id = I.id
                        WHERE R.id NOT IN (
                                SELECT R.id
                                FROM Recipes R 
                                WHERE R.ingredients LIKE '%${allergy}%'
                            );`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Randomly get 10 recipes with time under 30 minutes and over 3 star rating
async function searchFastRecipes(req, res) {
    const rand = Math.floor(Math.random() * 1500) + 1
    if (req.query) {
        connection.query(`WITH MatchRecipe AS (
                            SELECT id, name, minutes, description, ingredients, steps
                            FROM Recipes
                            WHERE minutes < 30
                        ),
                            GoodRating AS (
                                SELECT recipe_id, rating
                                FROM Interaction
                                WHERE rating > 3
                            )
                        SELECT DISTINCT R.id, R.name, R.minutes, R.ingredients, RI.n_ingredients, R.steps, RS.n_steps, IM.description, IM.imageName, IM.authorName, IM.reviewCount, IM.rating
                        FROM MatchRecipe R JOIN GoodRating I ON R.id = I.recipe_id
                                        JOIN ImageName IM ON R.id = IM.id
                                        JOIN RecipeIngredients RI on R.id = RI.id
                                        JOIN RecipeSteps RS on R.id = RS.id
                        LIMIT 10
                        OFFSET ${rand};`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Randomly get 10 recipes with steps under 10 and over 3 star rating
async function searchEasyRecipes(req, res) {
    const rand = Math.floor(Math.random() * 1500) + 1
    if (req.query) {
        connection.query(`WITH MatchRecipe AS (
                            SELECT id, n_steps
                            FROM RecipeSteps
                            WHERE n_steps < 10
                        ),
                            GoodRating AS (
                                SELECT recipe_id, rating
                                FROM Interaction
                                WHERE rating > 3
                            )
                        SELECT DISTINCT R.id, R.name, R.minutes, R.ingredients, RI.n_ingredients, R.steps, RS.n_steps, IM.description, IM.imageName, IM.authorName, IM.reviewCount, IM.rating
                        FROM MatchRecipe RS JOIN GoodRating I ON RS.id = I.recipe_id
                                        JOIN ImageName IM ON RS.id = IM.id
                                        JOIN RecipeIngredients RI on RS.id = RI.id
                                        JOIN Recipes R on RS.id = R.id
                        LIMIT 10
                        OFFSET ${rand};`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Randomly get 10 recipes with high protein and and over 3 star rating
async function searchProteinRecipes(req, res) {
    const rand = Math.floor(Math.random() * 800) + 1
    if (req.query) {
        connection.query(`WITH MatchRecipe AS (
                            SELECT id, protein
                            FROM RecipesNutrition
                            WHERE protein > 100
                        ),
                            GoodRating AS (
                                SELECT recipe_id, rating
                                FROM Interaction
                                WHERE rating > 3
                            )
                        SELECT DISTINCT R.id, R.name, R.minutes, R.ingredients, RI.n_ingredients, R.steps, RS.n_steps, IM.description, IM.imageName, IM.authorName, IM.reviewCount, IM.rating
                        FROM MatchRecipe RN JOIN GoodRating I ON RN.id = I.recipe_id
                                        JOIN ImageName IM ON RN.id = IM.id
                                        JOIN RecipeIngredients RI on RN.id = RI.id
                                        JOIN RecipeSteps RS on RN.id = RS.id
                                        JOIN Recipes R on RN.id = R.id
                        LIMIT 10
                        OFFSET ${rand};`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Randomly get 10 recipes with low fat and over 3 star rating
async function searchLowFatRecipes(req, res) {
    const rand = Math.floor(Math.random() * 800) + 1
    if (req.query) {
        connection.query(`WITH MatchRecipe AS (
                            SELECT id, totalFat
                            FROM RecipesNutrition
                            WHERE totalFat < 10
                        ),
                            GoodRating AS (
                                SELECT recipe_id, rating
                                FROM Interaction
                                WHERE rating > 3
                            )
                        SELECT DISTINCT R.id, R.name, R.minutes, R.ingredients, RI.n_ingredients, R.steps, RS.n_steps, IM.description, IM.imageName, IM.authorName, IM.reviewCount, IM.rating
                        FROM MatchRecipe RN JOIN GoodRating I ON RN.id = I.recipe_id
                                        JOIN ImageName IM ON RN.id = IM.id
                                        JOIN RecipeIngredients RI on RN.id = RI.id
                                        JOIN RecipeSteps RS on RN.id = RS.id
                                        JOIN Recipes R on RN.id = R.id
                        LIMIT 10
                        OFFSET ${rand};`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get recommendation list
async function getRecommendationList(req, res) {
    var ingredient = req.query.ingredient ? req.query.ingredient : "";
    if (req.query) {
        connection.query(`WITH FindRecipeWithIngredient AS (
                            SELECT name, ingredients, id
                            FROM Recipes R
                            WHERE ingredients LIKE '%${ingredient}%'
                        ),
                        Connection1 AS (
                            SELECT DISTINCT R.name, RE.ingredients, R.id
                            FROM FindRecipeWithIngredient R JOIN FOOD.Interaction I on R.id = I.recipe_id
                                        JOIN Recipes RE on R.id = RE.id
                                        JOIN ImageName IM ON R.id = IM.id
                            WHERE I.rating = 5
                            LIMIT 6
                        ),
                        FindRecipeWithIngredient2 AS (
                            SELECT R.name, RE.ingredients, R.id
                            FROM Connection1 C1, Recipes R JOIN Recipes RE ON R.id = RE.id
                            WHERE SUBSTRING_INDEX(RE.ingredients,',', 1) LIKE SUBSTRING_INDEX(C1.ingredients,',', 1)
                        ),
                        Connection2 AS (
                            SELECT DISTINCT R.name, RE.ingredients, R.id
                            FROM FindRecipeWithIngredient2 R2, Connection1 C1,
                                Recipes R JOIN FOOD.Interaction I on R.id = I.recipe_id
                                        JOIN Recipes RE on R.id = RE.id
                                        JOIN ImageName IM ON R.id = IM.id
                            WHERE R.id = R2.id
                            AND R.id != C1.id
                            AND I.rating = 5
                            LIMIT 6
                        )
                        SELECT DISTINCT name, ingredients, id
                        FROM Connection1
                        UNION ALL
                        SELECT DISTINCT name, ingredients, id
                        FROM Connection2;`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get reviews/ratings
async function getRatingsAndReviews(req, res) {
    var id = req.query.id ? req.query.id : 0
    if (req.query) {
        connection.query(`SELECT DISTINCT review, rating
                        FROM Interaction
                        WHERE recipe_id = ${id};`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get random recipe of the day
async function generateRecipe(req, res) {
    const rand = Math.floor(Math.random() * 1500) + 1
    if (req.query) {
        connection.query(`SELECT DISTINCT R.id, R.name, I.imageName
                        FROM Recipes R JOIN ImageName I ON R.id = I.id
                        LIMIT 3
                        OFFSET ${rand};`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get stat for recipe with ingredient 
async function getRecipeStat(req, res) {
    var ingredient = req.query.ingredient ? req.query.ingredient : "";
    var calories =  req.query.calories ? req.query.calories : 0;
    var totalFat =  req.query.totalFat ? req.query.totalFat : 0;
    var sugar =  req.query.sugar ? req.query.sugar : 0;
    var sodium =  req.query.sodium ? req.query.sodium : 0;
    var protein =  req.query.protein ? req.query.protein : 0;
    var saturatedFat =  req.query.saturatedFat ? req.query.saturatedFat : 0;
    var totalCarb =  req.query.totalCarb ? req.query.totalCarb : 0;

    if (req.query) {
        connection.query(`WITH RecipeWithIngredient AS (
                        SELECT name, id
                        FROM Recipes R 
                        WHERE ingredients LIKE '%${ingredient}%'
                        ),
                        JoinTableWithNutrition AS (
                            SELECT RWI.id, RN.calories, RN.totalFat, RN.sugar, RN.sodium, RN.protein, RN.saturatedFat, RN.totalCarb
                            FROM RecipeWithIngredient RWI JOIN RecipesNutrition RN ON RWI.id = RN.id
                        ),
                        Calories AS (
                            SELECT COUNT(*) AS calories
                            FROM JoinTableWithNutrition
                            WHERE calories < ${calories}
                        ),
                        TotalFat AS (
                            SELECT COUNT(*) AS totalFat
                            FROM JoinTableWithNutrition
                            WHERE totalFat < ${totalFat}
                        ),
                        Sugar AS (
                            SELECT COUNT(*) AS sugar
                            FROM JoinTableWithNutrition
                            WHERE sugar < ${sugar}
                        ),
                        Sodium AS (
                            SELECT COUNT(*) AS sodium
                            FROM JoinTableWithNutrition
                            WHERE sodium < ${sodium}
                        ),
                        Protein AS (
                            SELECT COUNT(*) AS protein
                            FROM JoinTableWithNutrition
                            WHERE protein < ${protein}
                        ),
                        SaturatedFat AS (
                            SELECT COUNT(*) AS saturatedFat
                            FROM JoinTableWithNutrition
                            WHERE saturatedFat < ${saturatedFat}
                        ),
                        TotalCarb AS (
                            SELECT COUNT(*) AS totalCarb
                            FROM JoinTableWithNutrition
                            WHERE totalCarb < ${totalCarb}
                        )
                        SELECT C.calories, TF.totalFat, SU.sugar, SO.sodium, P.protein, SF.saturatedFat, TC.totalCarb
                        FROM Calories C, TotalFat TF, Sugar SU, Sodium SO, Protein P, SaturatedFat SF, TotalCarb TC;`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Register
async function setLogin(req, res) {
    var firstname = req.query.firstname ? req.query.firstname : "";
    var lastname = req.query.lastname ? req.query.lastname : "";
    var username = req.query.username ? req.query.username : "";
    var password = req.query.password ? req.query.password : "";

    if (req.query) {
        connection.query(`INSERT INTO Account (firstname, lastname, username, password)
                          VALUES ('${firstname}', '${lastname}', '${username}', '${password}');`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get Account Information
async function getAccountInformation(req, res) {
    var username = req.query.username ? req.query.username : "";

    if (req.query) {
        connection.query(`SELECT A.username, A.password, A.firstname, A.lastname
                            FROM Account A 
                            WHERE A.username LIKE '${username}';`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Check if login exist in database
async function login(req, res) {
    
    var username = req.body.username;
    var password = req.body.password;
    
    if (req.query) {
        connection.query(`SELECT * FROM Account 
                          WHERE username = '${username}' AND password = '${password}';`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.send({ error: error })
                            } 
                            if(results){
                                if (results.length > 0) {
                                    req.session.user = results[0].username;
                                    res.send({results:results})
                                }
                                else {
                                    res.send({results: '0'})
                                }

                            }
                            else {
                                res.send({results: '1'})
                            }
                            
                        });
    }
    else {
        res.json({ })
    }
}

// Check whether user is logged in 
async function userSession(req, res) {
    if (req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }
    else {
        res.send({loggedIn: false});
    }
}

async function logout(req, res) {
    req.session.destroy();
    res.send({loggedIn: false});                      
}

// Set user's favorite recipe
async function setFavoriteRecipe(req, res) {
    var username = req.body.username;
    var recipeID = req.body.recipeID;

    if (req.query) {
        connection.query(`INSERT INTO FavoriteRecipe (username, recipeID)
                            VALUES ('${username}', ${recipeID});`, function (error, results, fields) {
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.json({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

// Get user's favorite recipe
async function getFavoriteRecipe(req, res) {
    var username = req.query.username ? req.query.username : "";
    if (req.query) {
        connection.query(`SELECT DISTINCT R.id, R.name
                            FROM FavoriteRecipe FR JOIN Recipes R on R.id = FR.recipeID
                            WHERE FR.username = '${username}';`, function (error, results, fields) {  
                            if (error) {
                                console.log(error)
                                res.json({ error: error })
                            } else if (results) {
                                res.send({ results: results })
                            }
                        });
    }
    else {
        res.json({ })
    }
}

module.exports = {
    getRecipeCards,
    getRecipe,
    searchIngredients,
    searchBrand,
    searchNutrition,
    searchFastRecipes,
    searchEasyRecipes,
    searchProteinRecipes,
    searchLowFatRecipes,
    getRecommendationList,
    getRatingsAndReviews, 
    generateRecipe,
    getRecipeStat, 
    setLogin, 
    getAccountInformation, 
    login, 
    userSession,
    logout,
    setFavoriteRecipe,
    getFavoriteRecipe
}