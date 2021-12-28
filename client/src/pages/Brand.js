import React from 'react';
import "./styles.css"
import "./recipe.css"
import { Divider, BackTop } from 'antd'
import { Button } from "shards-react";

import MenuBar from '../components/MenuBar';
import { getBrandSearch, searchWiki } from '../fetcher';

class Brand extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: window.location.search ? window.location.search.substring(1).split('=')[1].replaceAll("%20", " ") : "",
            brandResult: [],
            image: " ",
            mapResult: [],
            url: "",
            wiki: "",
            shopurl:''
        }
    }

    componentDidMount() {

        // Get the information on the Brand based on the brand name and get the Google Map location and Wikipedia information based on the brand name
        getBrandSearch(this.state.name).then(res => {
            
            this.setState({ brandResult: res.results[0] })
            
            if(this.state.brandResult.length !== 0 && this.state.brandResult.length !== 0 && this.state.brandResult !== 0) {
                this.setState({
                    url: "https://www.google.com/maps/embed/v1/search?key=AIzaSyAl09A4ykorC3o7DkZThPueYIjPFPs_jUQ&q=" +
                        this.state.brandResult.address + this.state.brandResult.manufacturer + this.state.brandResult.brand
                })
                this.setState({
                    shopurl:"https://www.kroger.com/search?query="+ this.state.name +"&searchType=default_search&fulfillment=all"
                })
            }

            searchWiki(this.state.name).then(res => {
                if (res === '') {
                    this.setState({ error: "did not find wiki information" })
                    this.setState({ wiki: "https://en.wikipedia.org/wiki/List_of_food_companies#United_States" })
                } else {
                    this.setState({ wiki: res })
                }
            })

        })
    }

    render() {
        return (
            <div>
                <div style={{ height: '400vh', padding: 6 }}>
                    {/* Menu Bar */}
                    <MenuBar />

                    {/* Title */}
                    <div className="name-container" style={{ height: "2%" }}>
                        <h1 style={{ fontSize: "30px", padding: "1%", color: "black" }}>{this.state.name}</h1>
                    </div>

                    {/* Brand Info and Location Map */}

                    {/* Brand Info */}
                    <div id="brandInfo" style={{ backgroundColor: "white", height: "30%", width: "30%", float: "left", marginTop: "2%" }}>
                        {/** Brand Info */}
                        <div class="brand-info-columns" style={{ width: "90%" }}>
                            <ul class="brand">
                                <li class="brand-header">Brand Info</li>
                                <li class="brand-name">Brand Name: {this.state.brandResult.brand}</li>
                                <li>Number of Product: {this.state.brandResult.no_of_item}</li>
                                <li>Manufacturer: {this.state.brandResult.manufacturer}</li>
                                <li>Address: {this.state.brandResult.address} </li>
                                <li>Website: {this.state.brandResult.website} </li>
                                <li>
                                    {/* manufacturer's map location */}
                                    <div class="mapcontainer" style={{ backgroundColor: "transparent", width: "100%", height: "20%", float: "right", top:"1%"}}> 
                                      <iframe title="brand-frame" src={this.state.url} className="responsive-iframe" title="map" width="100%" height="100%" frameBorder="0" />
                                    </div>
                                </li>
                                <li class="brand-name"></li>
                                <li class="brand-name"></li>
                                <li class="brand-name"> <a href={this.state.shopurl} class="button">Buy {this.state.brandResult.brand} Product In Kroger</a> </li>
                                <li class="brand-name" style={{height:"60%"}}>    
                                    <img src={"https://static01.nyt.com/images/2016/08/11/well/well_nutritionforrunners_gif/well_nutritionforrunners_gif-jumbo-v5.gif"} alt="Food-gif" width="60%" height="100%"></img>
                                </li>
                                
                            </ul>
                        </div>

                    </div>

                    {/* showcase the different products for this brand in Kroger supermarket  */}
                    <div id="ProdcutInfo" style={{ backgroundColor: "white", height: "30%", width: "70%", float: "right" , marginTop: "1.5%"}}>
                        <div class="mapcontainer" style={{ backgroundColor: "white", width: "100%", height: "100%", float: "right" }}>
                            {/* Location Map  iframe src={this.state.url} */}
                            < iframe src={this.state.shopurl}
                                className="responsive-iframe"
                                title="productinfo"
                                frameBorder="0"
                                style={{ border: 20 }}
                                allowfullscreen=""
                                aria-hidden="false"
                                height="100%"
                                tabIndex="0"
                                loading="lazy"></iframe>
                        </div>
                    </div>

                    <Divider />

                    {/* Wiki page */}
                    <div className="wiki" style={{ height: "55%", width: "100%" }}>
                        <div className="brand-name-contianer" style={{ marginTop: "2%", marginBottom: "2%", height: "3%" }}>
                            <h3 style={{ fontSize: "30px", padding: "1%", color: "black" }}>Learn More About this Brand</h3>
                        </div>
                        <iframe id="wiki"
                            title="This ingredient's Wikipedia page"
                            width="100%"
                            height="60%"
                            src={this.state.wiki}>
                        </iframe>
                    </div>


                    {/* Button to back to the top page */}
                    <BackTop>
                        <div>
                            <Button style={{ background: "#00B4CC", borderColor: "#00B4CC" }}> UP </Button>
                        </div>
                    </BackTop>

                </div>
            </div>
        )
    }
}
export default Brand
