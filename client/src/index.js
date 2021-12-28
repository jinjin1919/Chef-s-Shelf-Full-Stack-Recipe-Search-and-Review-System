import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import IngredientPage from './pages/IngredientPage';

import BrandPage from './pages/BrandPage';
import NutritionPage from './pages/NutritionPage'
import RecommendationPage from './pages/RecommendationPage';
import AboutPage from './pages/AboutPage';

import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess'

import SearchRecipeResult from './pages/SearchRecipeResult';
import SearchIngredientResult from './pages/SearchIngredientResult';
import SearchBrandResult from './pages/SearchBrandResult';

import FastRecipe from './pages/FastRecipe';
import EasyRecipe from './pages/EasyRecipe';
import ProteinRecipe from './pages/ProteinRecipe';
import LowFatRecipe from './pages/LowFatRecipe';

import Recipe from './pages/Recipe';
import Ingredient from './pages/Ingredient';

import Stat from './pages/Stat';
import Account from './pages/Account';
import Brand from './pages/Brand';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/recipespage"
							render={() => (
								<RecipesPage />
							)}/>
        <Route exact
							path="/ingredientpage"
							render={() => (
								<IngredientPage />
							)}/>
		<Route exact
							path="/brandpage"
							render={() => (
								<BrandPage />
							)}/>
		<Route exact
							path="/nutrition"
							render={() => (    
								<NutritionPage />
							)}/>
		<Route exact
							path="/recommendation"
							render={() => (
								<RecommendationPage />
							)}/>
		<Route exact
							path="/about" 
							render={() => (
								<AboutPage />
							)}/>
		<Route exact
							path="/login" 
							render={() => (
								<Login />
							)}/>
		<Route exact
							path="/getRecipeCards"
							render={() => (
								<SearchRecipeResult />
							)}/>
		<Route exact
							path="/searchIngredients"
							render={() => (
								<SearchIngredientResult />
							)}/>
		<Route exact
							path="/searchBrand"
							render={() => (
								<SearchBrandResult />
							)}/>
		<Route exact
							path="/recipe"
							render={() => (
								<Recipe />
							)}/>
		<Route exact
							path="/fastRecipe"
							render={() => (    
								<FastRecipe />
							)}/>
		<Route exact
							path="/easyRecipe"
							render={() => (    
								<EasyRecipe />
							)}/>
		<Route exact
							path="/proteinRecipe"
							render={() => (    
								<ProteinRecipe />
							)}/>
		<Route exact
							path="/lowFatRecipe"
							render={() => (    
								<LowFatRecipe />
							)}/>
		<Route exact
							path="/ingredient"
							render={() => (    
								<Ingredient />
							)}/>		
		<Route exact
							path="/stat"
							render={() => (    
								<Stat />
							)}/>	
		<Route exact
							path="/register"
							render={() => (    
								<Register />
							)}/>	
		<Route exact
							path="/account"
							render={() => (    
								<Account />
							)}/>
		<Route exact
							path="/registerSuccess"
							render={() => (    
								<RegisterSuccess />
							)}/>
		<Route exact
							path="/brand"
							render={() => (
								<Brand />
							)}/>		
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

