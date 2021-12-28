import React from 'react';
import { Form, FormInput, FormGroup, Button, Card } from "shards-react";
import "./recipe.css"

import 'react-slideshow-image/dist/styles.css'
import MenuBar from '../components/MenuBar';

import {
    Row,
    Col,
    Progress
} from 'antd'
import { getRecipeStat } from '../fetcher'

class Stat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            statResults: [],
            ingredient: "(Ingredient)",
            calories: 0,
            totalFat: 0,
            sugar: 0,
            sodium: 0,
            protein: 0,
            saturatedFat: 0,
            totalCarb: 0,
            progress: 0
        }

        // Update the states based on the values the user entered 
        this.onSearch = this.onSearch.bind(this)
        this.handleIngredientChange = this.handleIngredientChange.bind(this)
        this.handleCaloriesChange = this.handleCaloriesChange.bind(this)
        this.handleTotalFatChange = this.handleTotalFatChange.bind(this)
        this.handleSugarChange = this.handleSugarChange.bind(this)
        this.handleSodiumChange = this.handleSodiumChange.bind(this)
        this.handleProteinChange = this.handleProteinChange.bind(this)
        this.handleSaturatedFatChange = this.handleSaturatedFatChange.bind(this)
        this.handleTotalCarbChange = this.handleTotalCarbChange.bind(this)
        this.handleProgressChange = this.handleProgressChange.bind(this)

    }

    // When the user click search, get the count for the number of recipes that matches the user's criteria
    onSearch() {
        getRecipeStat(this.state.ingredient, this.state.calories, this.state.totalFat, this.state.sugar, this.state.sodium, this.state.protein, this.state.saturatedFat, this.state.totalCarb).then(res => {
            this.setState({ statResults: res.results[0] })
            // Update progress bar to 100 
            this.handleProgressChange(100)
        });
        // Update the progress bar to 50
        this.handleProgressChange(50)   
    }

    // Update the progress bar
    handleProgressChange(event) {
        this.setState({ progress: event })
    } 

    // Update the ingredient
    handleIngredientChange(event) {
        this.setState({ ingredient: event.target.value })
    }

    // Update the calories
    handleCaloriesChange(event) {
        this.setState({ calories: event.target.value })
        console.log(this.state.calories)
    }

    // Update the total fat
    handleTotalFatChange(event) {
        this.setState({ totalFat: event.target.value })
    }

    // Update the sugar
    handleSugarChange(event) {
        this.setState({ sugar: event.target.value })
    }

    // Update the sodium
    handleSodiumChange(event) {
        this.setState({ sodium: event.target.value })
    }

    // Update the protein
    handleProteinChange(event) {
        this.setState({ protein: event.target.value })
    }

    // Update the saturated fat
    handleSaturatedFatChange(event) {
        this.setState({ saturatedFat: event.target.value })
    }

    // Update the total carb
    handleTotalCarbChange(event) {
        this.setState({ totalCarb: event.target.value })
    }

    render() {
        return (
            <div>
                <MenuBar />
                {/* Title */}
                <div className="title">
                    <h3 style={{ fontSize: '55px', padding: "100px 100px 10px" }}> RECIPE STATISTICS </h3>
                </div>
                <div className='shelf'>
                    <img src={'shelf.jpg'} alt="shelf" style={{ width: 500 }} />
                </div>
                <div>
                    <h3>To view statistics for this website please enter in the following information:</h3>
                </div>
                {/* Form for the user to fill out their criteria */}
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Ingredient</label>
                            <FormInput placeholder="Enter Ingredient" onChange={this.handleIngredientChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Calories (% Daily Value)</label>
                            <FormInput placeholder="Max Calories" onChange={this.handleCaloriesChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Total Fat (% Daily Value)</label>
                            <FormInput placeholder="Max Total Fat" onChange={this.handleTotalFatChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sugar (% Daily Value)</label>
                            <FormInput placeholder="Max Sugar" onChange={this.handleSugarChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sodium (% Daily Value)</label>
                            <FormInput placeholder="Max Sodium" onChange={this.handleSodiumChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Protein (% Daily Value)</label>
                            <FormInput placeholder="Max Protein" onChange={this.handleProteinChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Saturated Fat (% Daily Value)</label>
                            <FormInput placeholder="Max Saturated Fat" onChange={this.handleSaturatedFatChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Total Carbohydrate (% Daily Value)</label>
                            <FormInput placeholder="Max Total Carbohydrate" onChange={this.handleTotalCarbChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh', background: "#00B4CC", borderColor: "#00B4CC" }} onClick={this.onSearch}>Search</Button>
                        </FormGroup></Col>
                        <Progress percent={this.state.progress} status="active" strokeColor="#00B4CC" style={{width:"100%"}}/>
                    </Row>


                </Form>

                {/* Display the results based on the criteria the user entered */}
                <h2> Total Number of Recipes on this Website that Meets the Criteria</h2>
                <div >
                    <Card style={{ width: '90vw', margin: '0 auto', marginTop: '2vh' }}>
                        <Row>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                                <h3> <label> Number of Recipes with {this.state.ingredient} with Max Calories {this.state.calories} </label></h3>
                                <h3> <label> Number of Recipes with {this.state.ingredient} with Max Total Fat   {this.state.totalFat} </label></h3>
                                <h3> <label> Number of Recipes with {this.state.ingredient} with Max Sugar   {this.state.sugar} </label></h3>
                                <h3> <label> Number of Recipes with {this.state.ingredient} with Max Sodium   {this.state.sodium} </label></h3>
                                <h3> <label> Number of Recipes with {this.state.ingredient} with Max Protein   {this.state.protein} </label></h3>
                                <h3> <label> Number of Recipes with {this.state.ingredient} with Max Saturated Fat   {this.state.saturatedFat}</label></h3>
                                <h3> <label> Number of Recipes with {this.state.ingredient} with Max Total Carbohydrate   {this.state.totalCarb} </label></h3>
                            </Col>
                            <Col flex={2} style={{ textAlign: 'right' }}>
                                <h3><FormInput placeholder="Number of Recipes" value={this.state.statResults.calories} style={{ width: 200 }} /> </h3>
                                <h3><FormInput placeholder="Number of Recipes" value={this.state.statResults.totalFat} style={{ width: 200 }} /> </h3>
                                <h3><FormInput placeholder="Number of Recipes" value={this.state.statResults.sugar} style={{ width: 200 }} /> </h3>
                                <h3><FormInput placeholder="Number of Recipes" value={this.state.statResults.sodium} style={{ width: 200 }} /> </h3>
                                <h3><FormInput placeholder="Number of Recipes" value={this.state.statResults.protein} style={{ width: 200 }} /> </h3>
                                <h3><FormInput placeholder="Number of Recipes" value={this.state.statResults.saturatedFat} style={{ width: 200 }} /> </h3>
                                <h3><FormInput placeholder="Number of Recipes" value={this.state.statResults.totalCarb} style={{ width: 200 }} /> </h3>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Stat

