import React from 'react';
import { Button } from "shards-react";
import "./styles.css"
import MenuBar from '../components/MenuBar';
import { Row, Col } from 'antd'
import TopBrand from '../components/TopBrand'

// Default image for the Top Brand Cards
const brand = [
    { imageName: "Kraft ", imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Kraft_logo_2012.svg/1280px-Kraft_logo_2012.svg.png", keyword: "kraft" },
    { imageName: "Ahold ", imageURL: "https://cdn.freebiesupply.com/logos/large/2x/ahold-01-logo-png-transparent.png", keyword: "ahold" },
    { imageName: "Hodgson Mill ", imageURL: "https://cdn.shopify.com/s/files/1/2522/4972/files/Logo_new_280x@2x.png?v=1518501311", keyword: "hodgson Mill" },
    { imageName: "Turkey Hill ", imageURL: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Turkey_Hill_Dairy_logo.svg/1200px-Turkey_Hill_Dairy_logo.svg.png", keyword: "turkey Hill" }
]

class BrandPage extends React.Component {
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
                    <h3 style={{ fontSize: '65px', padding: "300px 300px 75px" }}> Search Brands </h3>
                </div>
                {/* Search bar */}
                <div className="searchDIV">
                    <form className="searchForm" action="/SearchBrand" method="get">
                        <label htmlFor="header-search">
                            <span className="visually-hidden"></span>
                        </label>
                        <input
                            type="text"
                            id="header-search"
                            placeholder="Search Brands"
                            name="name"
                            class="searchText"
                        />
                        <Button type="submit" theme="dark" >Search</Button>
                    </form>
                </div>
                
                {/* Top Brands */}
                <div>
                    <Row>
                        <h3 style={{ fontSize: "30px", padding: "1%", color: "#adadad" }}>Top Brands</h3>
                    </Row>

                    <Row gutter='30' align='middle' justify='center'>
                        <Col>
                            <TopBrand key={1} item={brand[0]} />
                        </Col>
                        <Col>
                            <TopBrand key={1} item={brand[1]} />
                        </Col>
                        <Col>
                            <TopBrand key={1} item={brand[2]} />
                        </Col>
                        <Col>
                            <TopBrand key={1} item={brand[3]} />
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

export default BrandPage