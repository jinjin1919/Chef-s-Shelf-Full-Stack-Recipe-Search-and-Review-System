import React from 'react';
import { Button, Card, CardBody } from "shards-react";
import "./recipe.css"
import 'react-slideshow-image/dist/styles.css'
import MenuBar from '../components/MenuBar';
import Axios from 'axios';

import { Table, Row, BackTop } from 'antd'

import { getRecipe, getRatingsAndReviews, getRecommendationList } from '../fetcher'
const { Column } = Table;

class Recipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: window.location.search ? window.location.search.substring(1).split('=')[1].replaceAll("%20", " ") : "",
            name: "",
            recipeResult: [],
            recipeReview: [],
            image: [],
            steps: [],
            ingredient: "",
            recommendation: [],
            username: "",
            rating: 0,
            checkLoginIn: false
        }
        // Update user's favorite recipe after user click on "Save"
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    // Go to the following page after user click on recipe
    goToMatch(id) {
        window.location = `/Recipe?id=${id}`
    }

    // After user click on save, put the recipe information into the user's account
    handleFavorite(event) {
        Axios.get("http://localhost:8080/login").then((res) => {
            console.log(res.data.loggedIn)
            if (res.data.loggedIn === true) {
                this.setState({ username: res.data.user })
                const data = {
                    username: this.state.username,
                    recipeID: this.state.id
                }
                Axios.post("http://localhost:8080/setFavoriteRecipe", data).then(res => {
                    console.log("success")
                })
            }
        });
    }

    componentDidMount() {
        // Get the recipe information, reviews, and recommendation list 
        getRecipe(this.state.id).then(res => {
            this.setState({ recipeResult: res.results[0] })
            this.setState({ image: this.state.recipeResult.imageName })
            this.setState({ name: this.state.recipeResult.recipeName })
            this.setState({ steps: (this.state.recipeResult.steps).replace("[", "").replace("]", "").replaceAll("'", "") })
            this.setState({ ingredient: (this.state.recipeResult.ingredients).split(',')[0] })

            getRatingsAndReviews(this.state.id).then(res => {
                this.setState({ recipeReview: res.results })
            })

            getRecommendationList(this.state.ingredient.split(' ')[0]).then(res => {
                this.setState({ recommendation: res.results })
            })
        })


        Axios.get("http://localhost:8080/login").then((res) => {
            console.log(res.data.loggedIn)
            this.setState({ checkLoginIn: res.data.loggedIn })
        });
    }

    render() {

        const checkLoginIn = this.state.checkLoginIn;

        return (
            <div>
                <MenuBar />
                {/* Title and image of the recipe  */}
                <Card style={{ width: '90vw', margin: '0 auto', marginTop: '2vh' }}>
                    <CardBody>
                        <Row gutter='30' align='middle' justify='center'>
                            <h1> {this.state.name} </h1>
                        </Row>
                        {/* Check if user is already logged in. If so, user can save the receipe. Otherwise, the save button is hidden from user */}
                        {checkLoginIn
                            ? <Button style={{ background: "#00B4CC", borderColor: "#00B4CC" }} onClick={event => { this.handleFavorite() }}>
                                Save
                            </Button>
                            : <p></p>
                        }

                        <Row gutter='30' align='middle' justify='center'>
                            <img
                                src={this.state.image}
                                referrerpolicy="no-referrer" alt="Recipe" style={{ width: "50vw" }}
                                onerror="this.onerror=null;this.src='https://chefshelf.s3.amazonaws.com/Food/noimage.jpg';" />
                        </Row>
                        <Row gutter='30' align='middle' justify='center'>
                            <img src={'shelf.jpg'} alt="shelf" style={{ width: "50vw" }} />
                        </Row>
                        {/* Description of the recipe */}
                        <Row>
                            <h2>Description</h2>
                            <h3>{this.state.recipeResult.description}</h3>
                        </Row>
                    </CardBody>
                </Card>
                {/* Steps, Ingredients, and Nutrition Information of the recipe*/}
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Card style={{ width: '90vw', margin: '0 auto', marginTop: '2vh' }}>
                        <Row>
                            <h2>Steps</h2>
                            <h3>{this.state.steps}</h3>
                        </Row>
                    </Card>
                    <Card style={{ width: '40vw', margin: '0 auto', marginTop: '2vh' }}>
                        <Row>
                            <h2>Ingredient</h2>
                            <h3>{this.state.recipeResult.ingredients}</h3>
                        </Row>
                    </Card>
                    <Card style={{ width: '40vw', margin: '0 auto', marginTop: '2vh' }}>
                        <Row align='left' justify='left'>
                            <h2>Nutrition Information</h2>
                            <h3>
                                Calories: {this.state.recipeResult.calories} Amount per serving <br />
                                % Daily Value <br />
                                Total Fat: {this.state.recipeResult.totalFat} % <br />
                                Sugar: {this.state.recipeResult.sugar} % <br />
                                Sodium: {this.state.recipeResult.sodium} % <br />
                                Protein: {this.state.recipeResult.protein} % <br />
                                Saturated Fat: {this.state.recipeResult.saturatedFat} % <br />
                                Total Carbohydrate: {this.state.recipeResult.totalCarb} %
                            </h3>
                        </Row>
                    </Card>
                </div>
                {/* Reviews and rating of the recipe */}
                <Card style={{ width: '90vw', margin: '0 auto', marginTop: '2vh' }}>
                    <div>
                        <div style={{ width: '60vw', margin: '0 auto', marginTop: '2vh' }}>
                            <h2>Recipe Reviews</h2>
                            <Table onRow={(record, rowIndex) => {
                                return {
                                };
                            }} dataSource={this.state.recipeReview} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                                <Column title="Reviews" dataIndex="review" key="review" sorter={(a, b) => a.review.localeCompare(b.review)} />
                                <Column title="Rating" dataIndex="rating" key="rating" sorter={(a, b) => a.rating - b.rating} />
                            </Table>
                        </div>
                    </div>
                </Card>
                {/* Recommendation List for the user */}
                <Card style={{ width: '90vw', margin: '0 auto', marginTop: '2vh' }}>
                    <div>
                        <div style={{ width: '60vw', margin: '0 auto', marginTop: '2vh' }}>
                            <h2>Recommendation List</h2>
                            <Table onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => { this.goToMatch(record.id) },
                                };
                            }} dataSource={this.state.recommendation} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 4, showQuickJumper: true }}>
                                <Column title="Recipe ID" dataIndex="id" key="id" />
                                <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => a.name.localeCompare(b.name)} />
                                <Column title="Ingredients" dataIndex="ingredients" key="ingredients" sorter={(a, b) => a.ingredients.localeCompare(b.ingredients)} />
                            </Table>
                        </div>
                    </div>
                </Card>

                {/* Button to back to the top page */}
                <BackTop>
                    <div>
                        <Button style={{ background: "#00B4CC", borderColor: "#00B4CC" }}> UP </Button>
                    </div>
                </BackTop>
            </div>
        )
    }
}

export default Recipe