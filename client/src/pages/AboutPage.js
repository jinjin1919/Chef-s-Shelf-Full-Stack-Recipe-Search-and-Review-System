import React from 'react';
import { Button, Card, CardBody } from "shards-react";
import "./styles.css"
import MenuBar from '../components/MenuBar';
import { BackTop } from 'antd'

class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <MenuBar />
                {/* Title of the page*/}
                <div className="title">
                    <h3 style={{ fontSize: '55px', padding: "100px 100px 10px" }}> ABOUT CHEF'S SHELF </h3>
                </div>
                {/* Image of the shelf and a cute image of a cartoon chef */}
                <div className="shelf">
                    <img src={'shelf.jpg'} alt="shelf"
                        style={{ width: 500 }} />
                </div>
                <CardBody>
                    <Card style={{ width: '45vw', margin: '0 auto', marginTop: '2vh', marginBottom: '2vh', float: "left" }}>
                        <img src={'images/chef.png'} alt="chef" style={{ width: "40vw", margin: 50 }} />
                    </Card>
                    {/* About Paragraph */}
                    <Card style={{ width: '45vw', margin: '0 auto', marginTop: '2vh', marginBottom: '2vh', float: "right" }}>
                        <h4 style={{ width: "40vw", margin: 50 }}> Inspired by other recipe websites such as Food.com and Allrecipes.com, we wanted to create an interactive recipe website that has more to offer.
                            There are tens of thousands of different recipes available all around the world. We want to organize those recipes into one place.
                            Our website is designed to help users find food recipes based on search criteria
                            such as rating, preparation time, preparation steps, nutrition, ingredients,
                            and others.
                        </h4>
                    </Card>
                    <Card style={{ width: '45vw', margin: '0 auto', marginTop: '2vh', marginBottom: '2vh', float: "right" }}>
                        <h4 style={{ margin: 20 }}> Creators: </h4>
                        <h5 style={{ margin: 20 }}> (To learn more about each creators please click on their name to visit their GitHub Page) </h5>
                        <h3> <a href="https://github.com/linyuyuan630" class="button">Andy Lin</a> </h3>
                        <h3> </h3>
                        <h3 > <a href="https://github.com/cindy8tao" class="button">Cindy Tao</a> </h3>
                        <h3> </h3>
                        <h3 > <a href="https://github.com/jinjin1919" class="button">Jeanne Xu</a> </h3>
                        <h3> </h3>
                        <h3> <a href="https://github.com/qh219" class="button">Nancy Huang</a> </h3>

                    </Card>

                    {/* Google Map of where UPenn is located */}
                        <Card style={{ width: '95vw', margin: '0 auto'}}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.534838923626!2d-75.19314148461815!3d39.951793379421865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c65a9476a0b9%3A0x84bdb6989903b692!2sSchool%20of%20Engineering%20and%20Applied%20Science!5e0!3m2!1sen!2sus!4v1636452400725!5m2!1sen!2sus"
                                width="2000vw"
                                height="1000vh"
                                title="map"
                                frameBorder="0"
                                style={{ margin: '0 auto', marginTop: '2vh', marginBottom: '2vh' }}
                                allowfullscreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                margin='5'
                                loading="lazy"></iframe>
                        </Card>

                </CardBody>



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

export default AboutPage