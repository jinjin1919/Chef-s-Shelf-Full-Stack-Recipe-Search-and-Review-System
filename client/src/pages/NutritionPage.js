import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import "./styles.css"
import MenuBar from '../components/MenuBar';
import { Row, Col, Divider, Slider, Pagination, Progress } from 'antd'
import { getNutrition } from '../fetcher';
import NutritionCard from '../components/NutritionCard';

// Result per page
const numEachPage = 8;

// Constant values for different nutrition
const options = [
    {
        label: "Sodium",
        value: "sodium",
    },
    {
        label: "Sugar",
        value: "sugar",
    },
    {
        label: "Total Fat",
        value: "totalFat",
    },
    {
        label: "Total Carb",
        value: "totalCarb",
    },
];

class NutritionPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            AttributeQuery: "sugar",
            allergyFd: '',
            favoriteFd: '',
            attributeNum: 100,
            caloriesHigh: 20000,
            caloriesLow: 0,
            proteinHigh: 3600,
            proteinLow: 0,
            RecipesResults: [],
            minValue: 0,
            maxValue: 8,
            progress: 0
        }

        // Update the status 
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleAllergyQueryChange = this.handleAllergyQueryChange.bind(this)
        this.handleAttributeQueryChange = this.handleAttributeQueryChange.bind(this)
        this.handleCaloriesChange = this.handleCaloriesChange.bind(this)
        this.handleProteinChange = this.handleProteinChange.bind(this)
        this.handlefavorFoodQueryChange = this.handlefavorFoodQueryChange.bind(this)
        this.handleAttributeNumChange = this.handleAttributeNumChange.bind(this)
        this.handleProgressChange = this.handleProgressChange.bind(this)
    }

    // Update attribute change
    handleAttributeQueryChange(event) {
        this.setState({ AttributeQuery: event.target.value })
    }

    // Update state variables(allergy)
    handleAllergyQueryChange(event) {
        this.setState({ allergyFd: event.target.value })
    }
    // Update state variables(favorite food)
    handlefavorFoodQueryChange(event) {
        this.setState({ favoriteFd: event.target.value })
    }

    // Update state variables(calories)
    handleCaloriesChange(value) {
        this.setState({ caloriesLow: value[0] })
        this.setState({ caloriesHigh: value[1] })
    }

    // Update state variables(protein)
    handleProteinChange(value) {
        this.setState({ proteinLow: value[0] })
        this.setState({ proteinHigh: value[1] })
    }

    // Update state variables(num)
    handleAttributeNumChange(event) {
        this.setState({ attributeNum: event.target.value })
    }

    // Update page as user navigates through the results
    handleChange = value => {
        if (value <= 1) {
            this.setState({
                minValue: 0,
                maxValue: 8
            });
        }
        else {
            this.setState({
                minValue: (value - 1) * 8,
                maxValue: value * 8
            });
        }
    }

    updateSearchResults() {
        
        // Call getNutrition and update RecipesResults in state
        getNutrition(this.state.caloriesLow, this.state.caloriesHigh, this.state.proteinLow, this.state.proteinHigh, this.state.attributeNum, this.state.AttributeQuery, this.state.allergyFd, this.state.favoriteFd).then(res => {
            this.setState({ RecipesResults: res.results })
            
            // Change the progress bar status to 100
            this.handleProgressChange(100)
        })

        // Change the progress bar status to 50
        this.handleProgressChange(50)
    }

    // Update the progress bar to reflect that the data is loading
    handleProgressChange(event) {
        this.setState({ progress: event })
    }

    render() {
        return (
            <div>
                <MenuBar />
                {/** Title */}
                <div className="name-container" style={{ height: "2%" }}>
                    <h1 style={{ fontSize: "30px", padding: "1%", color: "black" }}>Search Recipes</h1>
                </div>
                {/* Instruction on how to use this advance search feature */}
                <div>
                    <h3> Here you can search your favorite recipes based on your own perference. Enter any food allergy you have and we'll make sure to exclude that ingredient from your result. 
                         Have a favorite food? No problem, enter your favorite food and we'll make sure to show you recipe similar to your favorite food. 
                         Have any special dietary needs? Just modify the nutrition criteria below and we will show you recipes that best fit your need. 
                    </h3>
                </div>
                {/* User can fill in their criteria here */}
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Allergy Food</label>
                            <FormInput placeholder="Allergy? Type 'none' if not allergic to any food" value={this.state.allergyFd} onChange={this.handleAllergyQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Favorite Food</label>
                            <FormInput placeholder="Favorite?" value={this.state.favoriteFd} onChange={this.handlefavorFoodQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Input for Custom Select--{'>'} (% Daily Value) </label>
                            <FormInput placeholder="Nutrition Value" value={this.state.attributeNum} onChange={this.handleAttributeNumChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Custom Select</label>
                            <br></br>
                            <select value={this.state.AttributeQuery} onChange={this.handleAttributeQueryChange}>
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Calories (% Daily Value) </label>
                            <Slider range max={10000} defaultValue={[50, 2000]} onChange={this.handleCaloriesChange} />
                        </FormGroup></Col>
                        {/* Create a column with a label and slider in a FormGroup item for filtering by protein value */}
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Protein (% Daily Value) </label>
                            <Slider range max={2600} defaultValue={[0, 500]} onChange={this.handleProteinChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh', background: "#00B4CC", borderColor: "#00B4CC" }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>
                    {/* Progress bar to show that the result is loading */}
                    <Progress percent={this.state.progress} status="active" strokeColor="#00B4CC" style={{ width: "100%" }} />
                </Form>

                {/* Display the result in card form */}
                <Divider />
                <div className="d-flex flex-row align-items-center">
                    <h2>
                        <strong className="text-secondary">{this.state.RecipesResults.length}</strong>{" "}
                        &nbsp;&nbsp;Results for Search Keyword: {this.state.RecipesResults.name}
                    </h2>
                </div>
                <div className="pagination">
                    <Pagination
                        defaultCurrent={1}
                        defaultPageSize={numEachPage}
                        onChange={this.handleChange}
                        total={this.state.RecipesResults.length}
                        showQuickJumper={true}
                        showSizeChanger={false}
                    />
                </div>

                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <div className="cardgrid" >
                        {this.state.RecipesResults.slice(this.state.minValue, this.state.maxValue).map(function (nutritionItem, i) {
                            return (
                                <NutritionCard key={nutritionItem} item={nutritionItem}></NutritionCard>
                            )

                        })}
                    </div>
                    <div style={{ marginTop: '10vh' }}>

                    </div>
                </div>

                <div className="title">
                    <h3 style={{ fontSize: '65px', padding: "100px 150px 25px" }}> </h3>
                </div>
            </div>
        )
    }
}
export default NutritionPage