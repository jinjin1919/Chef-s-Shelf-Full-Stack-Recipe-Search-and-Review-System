import React from 'react';
import { Button } from "shards-react";
import "./styles.css"
import MenuBar from '../components/MenuBar';
import { Row, Col } from 'antd'
import TopIngredient from '../components/TopIngredient'

// Default image for the Top Ingredient Cards
const ingred = [
    { imageName: "Chicken ", imageURL: "https://static01.nyt.com/images/2020/03/25/dining/18clark-roast-chicken/clark-roast-chicken-superJumbo-v4.jpg", keyword: "chicken" },
    { imageName: "Bread ", imageURL: "https://sugargeekshow.com/wp-content/uploads/2020/04/focaccia-bread-art-21.jpg", keyword: "Bread" },
    { imageName: "Fish ", imageURL: "https://insanelygoodrecipes.com/wp-content/uploads/2020/09/Baked-Salmon-Steak-with-Herbs-and-Lemons.jpg", keyword: "fish" },
    { imageName: "Lettuce ", imageURL: "https://www.thespruceeats.com/thmb/tLQ4I5bkesVgNy7Y1LM4qe2MPE8=/1333x1000/smart/filters:no_upscale()/GettyImages-175816547-iceburg-lettuce-58bdbfba5f9b58af5c0bed99.jpg", keyword: "lettuce" }
]

class IngredientPage extends React.Component {
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
                    <h3 style={{ fontSize: '65px', padding: "300px 300px 75px" }}> Search Ingredient </h3>
                </div>
                {/* Search bar */}
                <div className="searchDIV">
                    <form className="searchForm" action="/searchIngredients" method="get">
                        <label htmlFor="header-search">
                            <span className="visually-hidden"></span>
                        </label>
                        <input
                            type="text"
                            id="header-search"
                            placeholder="Search Ingredient"
                            name="name"
                            class="searchText"
                        />
                        <Button type="submit" theme="dark" >Search</Button>
                    </form>
                </div>

                {/* Top Ingredient */}
                <div>
                    <Row>
                        <h3 style={{ fontSize: "30px", padding: "1%", color: "#adadad" }}>Top Ingredient</h3>
                    </Row>

                    <Row gutter='30' align='middle' justify='center'>
                        <Col>
                            <TopIngredient key={1} item={ingred[0]} />
                        </Col>
                        <Col>
                            <TopIngredient key={1} item={ingred[1]} />
                        </Col>
                        <Col>
                            <TopIngredient key={1} item={ingred[2]} />
                        </Col>
                        <Col>
                            <TopIngredient key={1} item={ingred[3]} />
                        </Col>
                    </Row>
                </div>

                <div className="title">
                    <h3 style={{ fontSize: '65px', padding: "100px 150px 25px" }}> </h3>
                </div>
            </div>
        )
    }
}
export default IngredientPage