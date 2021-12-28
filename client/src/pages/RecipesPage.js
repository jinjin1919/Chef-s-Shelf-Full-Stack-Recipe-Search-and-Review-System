import React from 'react';
import "./styles.css"
import MenuBar from '../components/MenuBar';
import PopularSearches from '../components/PopularSearches'
import { Row, Col } from 'antd'

// Default image for the Popular Searches
const user = [
    { imageName: "Gingerbread ", imageURL: "images/ginger-bread.jpg", keyword: "gingerbread" },
    { imageName: "Banana bread ", imageURL: "images/banana-bread.jpg", keyword: "banana bread" },
    { imageName: "Thanksgiving Leftover ", imageURL: "images/after-thanksgiving2.jpg", keyword: "after thanksgiving" },
    { imageName: "Christmas ", imageURL: "images/christmas.jpg", keyword: "christmas" }
]
class RecipesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div class="navbar1">
                    <MenuBar />
                </div>

                <div className="title">
                    <h3 style={{ fontSize: '65px', padding: "300px 300px 75px" }}> Search Recipes </h3>
                </div>
                {/* Search bar */}
                <div className="searchDIV">
                    <form className="searchForm" action="/getRecipeCards" method="get">
                        <label htmlFor="header-search">
                            <span className="visually-hidden"></span>
                        </label>
                        <input
                            type="text"
                            id="header-search"
                            placeholder="Search Recipes"
                            name="name"
                            class="searchText"
                        />
                        <button type="submit" class="searchButton">
                            GO
                        </button>
                    </form>
                </div>

                {/* Popular Searches */}
                <div>
                    <Row>
                        <h3 style={{ fontSize: "30px", padding: "1%", color: "#adadad" }}>Popular Searches</h3>
                    </Row>

                    <Row gutter='30' align='middle' justify='center'>
                        <Col>

                            <PopularSearches key={1} item={user[0]} />
                        </Col>
                        <Col>

                            <PopularSearches key={1} item={user[1]} />
                        </Col>
                        <Col>

                            <PopularSearches key={1} item={user[2]} />
                        </Col>
                        <Col>

                            <PopularSearches key={1} item={user[3]} />
                        </Col>
                    </Row>
                </div>
                <div className="title">
                    <h3 style={{ fontSize: '65px', padding: "300px 300px 75px" }}> </h3>
                </div>
            </div>
        )
    }
}

export default RecipesPage