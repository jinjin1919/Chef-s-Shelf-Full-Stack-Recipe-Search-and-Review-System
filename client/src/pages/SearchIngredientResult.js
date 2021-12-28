import React from 'react';
import { getIngredientsSearch } from '../fetcher'
import MenuBar from '../components/MenuBar';
import './RecipesPage'
import { Pagination, Divider } from 'antd'
import IngredientCard from '../components/IngredientCard'
const numEachPage = 8;

class SearchIngredientResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: window.location.search ? window.location.search.substring(1).split('=')[1] : "",
            ingredientsResults: [],
            minValue: 0,
            maxValue: 8
        }

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

    // Go to the following page after user click on "Read More"
    goToMatch(matchName) {
        window.location = `/Ingredient?name=${matchName}`
    }

    // Get all the results 
    componentDidMount() {
        getIngredientsSearch(this.state.nameQuery).then(res => {
            this.setState({ ingredientsResults: res.results })
        })

    }

    render() {
        return (
            <div>
                <MenuBar />
                <Divider />
                {/* Display the number of recipe result */}
                <div className="d-flex flex-row align-items-center">
                    <h2>
                        <strong className="text-secondary">{this.state.ingredientsResults.length}</strong>{" "}
                        &nbsp;&nbsp;Results for Search Keyword: {this.state.nameQuery}
                    </h2>
                </div>
                <div className="pagination">
                    <Pagination
                        defaultCurrent={1}
                        defaultPageSize={numEachPage}
                        onChange={this.handleChange}
                        total={this.state.ingredientsResults.length}
                        showQuickJumper={true}
                        showSizeChanger={false}
                    />
                </div>

                {/* Show the result in card template along with all the basic information */}
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <div className="cardgrid" >
                        {this.state.ingredientsResults.slice(this.state.minValue, this.state.maxValue).map(function (ingredItem, i) {
                            return (
                                <IngredientCard key={ingredItem.ingredientCode} item={ingredItem}></IngredientCard>
                            )

                        })}
                    </div>
                    <div style={{ marginTop: '10vh' }}>

                    </div>
                </div>
            </div>
        );
    }
}

export default SearchIngredientResult