import React from 'react';
import { getProteinRecipe } from '../fetcher'
import MenuBar from '../components/MenuBar';
import { Divider, BackTop } from 'antd'
import RecipeCard from '../components/RecipeCard'
import { Button } from "shards-react";

class ProteinRecipe extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nameQuery: window.location.search ? window.location.search.substring(1).split('=')[1] : "",
            recipesResults: [],
            minValue: 0,
            maxValue: 10,
        }

    }

    // Set the maximum number of result displayed on the page 
    handleChange = value => {
        if (value <= 1) {
            this.setState({
                minValue: 0,
                maxValue: 10
            });
        }
        else {
            this.setState({
                minValue: (value - 1) * 10,
                maxValue: value * 10
            });
        }
    }

    // Go to the following page after user click on recipe 
    goToMatch(matchName) {
        window.location = `/Recipe?name=${matchName}`
    }

    // Get the 10 recipe result 
    componentDidMount() {
        getProteinRecipe().then(res => {
            console.log(res)
            this.setState({ recipesResults: res.results })
        })

    }

    render() {
        return (
            <div>
                <MenuBar />
                <Divider />
                {/* Title */}
                <div>
                    <h1> High Protein Recipes </h1>
                </div>
                
                {/* Used the Recipe Card template to display the result  */}
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <div className="cardgrid" >
                        {this.state.recipesResults.slice(this.state.minValue, this.state.maxValue).map(function (recipeItem, i) {
                            return (
                                <RecipeCard key={recipeItem.id} item={recipeItem}></RecipeCard>
                            )

                        })}
                    </div>
                    <div style={{ marginTop: '10vh' }}>

                    </div>
                </div>

                {/* Button to back to the top page */}
                <BackTop>
                    <div>
                        <Button style={{ background: "#00B4CC", borderColor: "#00B4CC" }}> UP </Button>
                    </div>
                </BackTop>
            </div>
        );
    }
}

export default ProteinRecipe