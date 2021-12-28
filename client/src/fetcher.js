import config from './config.json'

import axios from "axios"

// Daily Limit of 150 points
// List of API Key: cb1c464d94f142c08b156c5beddade8b, db254b5cd61744d39a2deebd9c361444
// Cindy's API Key: d3bcf9af063d4731b9705f7b78ad2ed8,18bdc43e2ff2469a9bacc64c71b59f79
// const WIKI_APIUrl = "https://en.wikipedia.org/w/api.php"
const UNSPLASH_API_KEY = "mcj2n5RZNmIZDRSvSoBxqtOy2D79lcDCSKFIP8lpQAA"
const EDAMAN_APP_ID = "400f1ee0"
const EDAMAN_APP_KEY = "d3249be1e8288f360c63050541aec3e4"

const getRecipe = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/Recipe/?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getRecipeCards = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRecipeCards/?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllIngredients = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/searchIngredients`, {
        method: 'GET',
    })
    return res.json()
}

const getIngredientsSearch = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/searchIngredients/?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getBrandSearch = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/searchBrand/?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getNutrition = async (clow, chigh, plow, phigh, num3, attri, allergy, favor) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/nutrition?clow=${clow}&chigh=${chigh}&plow=${plow}&phigh=${phigh}&num3=${num3}&attri=${attri}&allergy=${allergy}&favor=${favor}`, {
        method: 'GET',
    })
    return res.json()
}

const getFastRecipe = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/fastRecipe`, {
        method: 'GET',
    })
    return res.json()
}

const getEasyRecipe = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/easyRecipe`, {
        method: 'GET',
    })
    return res.json()
}

const getProteinRecipe = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/proteinRecipe`, {
        method: 'GET',
    })
    return res.json()
}

const getLowFatRecipe = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/lowFatRecipe`, {
        method: 'GET',
    })
    return res.json()
}

const getMealData = async (name) => {
    var res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=db254b5cd61744d39a2deebd9c361444&query=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getRecommendationList = async (ingredient) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRecommendationList?ingredient=${ingredient}`, {
        method: 'GET',
    })
    return res.json()
}

const getRatingsAndReviews = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRatingsAndReviews?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const generateRecipe = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/generateRecipe`, {
        method: 'GET',
    })
    return res.json()
}

const getRecipeStat = async (ingredient, calories, totalFat, sugar, sodium, protein, saturatedFat, totalCarb) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getRecipeStat?ingredient=${ingredient}&calories=${calories}&totalFat=${totalFat}&sugar=${sugar}&sodium=${sodium}&protein=${protein}&saturatedFat=${saturatedFat}&totalCarb=${totalCarb}`, {
        method: 'GET',
    })
    return res.json()
}

const setLogin = async (firstname, lastname, username, password) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/setLogin?firstname=${firstname}&lastname=${lastname}&username=${username}&password=${password}`, {
        method: 'POST',
    })
    return res.json()
}

const getAccountInformation = async (username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getAccountInformation?username=${username}`, {
        method: 'GET',
    })
    return res.json()
}

const loggingIn = async (username, password) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`, {
        method: 'POST'
    })
    return res.json()
}

const getUserSession = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login`, {
        method: 'GET'
    })
    return res.json()
}

const getFavoriteRecipe = async (username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getFavoriteRecipe?username=${username}`, {
        method: 'GET'
    })
    return res.json()
}

const searchWiki = async (name) => {
    var res = await axios.get(`/w/api.php?&action=query&list=search&srsearch=${name}&format=json`, {
        method: 'GET',
    }).then(res =>{
        if (res.data.query.search.length > 0){
            const pageId = res.data.query.search[0].pageid;
            return `https://en.wikipedia.org/?curid=${pageId}`;

        }else{
            return '';
        }
    })
    return res
}

const getBrandImage = async (name) => {
    var res = await fetch(`https://api.unsplash.com/search/photos?&query=${name}&client_id=${UNSPLASH_API_KEY}&orientation=landscape`, {
        method: 'GET',
    })
    return res.json()
}

const getIngredientImage = async (name) => {
    var res = await fetch(`https://api.unsplash.com/search/photos?&query=${name}&client_id=mcj2n5RZNmIZDRSvSoBxqtOy2D79lcDCSKFIP8lpQAA`, {
        method: 'GET',
    })
    return res.json()
}

const getBrandMap = async(name) => {
    var res = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&key=AIzaSyA4pqujZgpruRhNLTgLAW6WxPp9PIgi7iE`, {
        method: 'GET',
    })
    return res.json()
}

const getIngredInfo = async (name) => {
    var res = await fetch(`https://api.edamam.com/api/food-database/v2/parser?&app_id=${EDAMAN_APP_ID}&app_key=${EDAMAN_APP_KEY}&ingr=${name}`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getAllIngredients,
    getIngredientsSearch,
    getBrandSearch,
    getNutrition,
    getFastRecipe,
    getEasyRecipe,
    getProteinRecipe,
    getLowFatRecipe,
    getMealData,
    getRecommendationList,
    getRatingsAndReviews,
    getIngredientImage,
    generateRecipe,
    getRecipeStat, 
    setLogin, 
    getAccountInformation,
    getUserSession,
    loggingIn,
    getFavoriteRecipe,
    searchWiki,
    getBrandImage,
    getBrandMap,
    getIngredInfo,
    getRecipeCards,
    getRecipe
}