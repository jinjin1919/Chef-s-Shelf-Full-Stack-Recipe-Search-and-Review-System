import React from 'react';
import { Card, CardBody, Button } from "shards-react";
import { Row, BackTop } from 'antd'
import MenuBar from '../components/MenuBar';
import { getRatingsAndReviews, getRecipe } from '../fetcher'


class RecommendationPage extends React.Component {
  constructor(props) {
    super(props)
    // Set the initial states of the recipes (the ids are chosen by the creator)
    this.state = {
      id1: 7899,
      name1: "",
      review1: [],
      recipe1: [],

      id2: 7912,
      name2: "",
      review2: [],
      recipe2: [],

      id3: 8021,
      name3: "",
      review3: [],
      recipe3: [],

      id4: 8039,
      name4: "",
      review4: [],
      recipe4: [],
    }
  }


  componentDidMount() {

    // Get the recipe information based on the recipe ids 
    getRecipe(this.state.id1).then(res => {
      this.setState({ recipe1: res.results[0] })
      const id = this.state.recipe1.id
      getRatingsAndReviews(id).then(res => {
        this.setState({ review1: res.results[0] })
      })
      this.setState({ name1: res.results[0].recipeName })
    })

    getRecipe(this.state.id2).then(res => {
      this.setState({ recipe2: res.results[0] })
      const id = this.state.recipe2.id
      getRatingsAndReviews(id).then(res => {
        this.setState({ review2: res.results[0] })
      })
      this.setState({ name2: res.results[0].recipeName })
    })

    getRecipe(this.state.id3).then(res => {
      this.setState({ recipe3: res.results[0] })
      const id = this.state.recipe3.id
      getRatingsAndReviews(id).then(res => {
        this.setState({ review3: res.results[0] })
      })
      this.setState({ name3: res.results[0].recipeName })
    })

    getRecipe(this.state.id4).then(res => {
      this.setState({ recipe4: res.results[0] })
      const id = this.state.recipe4.id
      getRatingsAndReviews(id).then(res => {
        this.setState({ review4: res.results[0] })
      })
      this.setState({ name4: res.results[0].recipeName })
    })


  }

  render() {
    return (
      <div>
        <MenuBar />
        {/* Title */}
        <div className="title">
          <h3 style={{ fontSize: '55px', padding: "100px 100px 10px" }}> WHAT'S ON THE SHELF </h3>
        </div>
        <div className="shelf">
          <img src={'shelf.jpg'} alt="shelf"
            style={{ width: 500 }} />
        </div>
        {/* Cindy's recipe in a card template  */}
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Card style={{ margin: 50 }}>
              <CardBody>
                <Row gutter='30' align='middle' justify='center'>
                  <h1> Cindy's Pick </h1>
                  <h2> {this.state.name1} </h2>
                </Row>
                <Row gutter='30' align='middle' justify='center'>
                  <img
                    src={this.state.recipe1.imageName}
                    referrerpolicy="no-referrer" alt="Recipe" style={{ width: "400px" }} />
                </Row>
                <Row>
                  <h2 style={{ width: 500, wordWrap: 'break-word' }}>Description</h2>
                  <h3 style={{ width: 500, wordWrap: 'break-word' }}>{this.state.recipe1.description}</h3>
                </Row>
                <Row>
                  <h2 style={{ width: 500, wordWrap: 'break-word' }}>Other's Review</h2>
                  <h3 style={{ width: 500, wordWrap: 'break-word' }}>{this.state.review1.review}</h3>
                </Row>
              </CardBody>
            </Card>

            {/* Andy's recipe in a card template  */}
            <Card style={{ margin: 50 }}>
              <CardBody>
                <Row gutter='30' align='middle' justify='center'>
                  <h1> Andy's Pick </h1>
                  <h2> {this.state.name2} </h2>
                </Row>
                <Row gutter='30' align='middle' justify='center'>
                  <img
                    src={this.state.recipe2.imageName}
                    referrerpolicy="no-referrer" alt="Recipe" style={{ width: "400px" }} />
                </Row>
                <Row>
                  <h2 style={{ width: 500, wordWrap: 'break-word' }}>Description</h2>
                  <h3 style={{ width: 500, wordWrap: 'break-word' }}>{this.state.recipe2.description}</h3>
                </Row>
                <Row>
                  <h2 style={{ width: 500, wordWrap: 'break-word' }}>Other's Review</h2>
                  <h3 style={{ width: 500, wordWrap: 'break-word' }}>{this.state.review2.review}</h3>
                </Row>
              </CardBody>
            </Card>

            {/* Nancy's recipe in a card template  */}
            <Card style={{ margin: 50 }}>
              <CardBody>
                <Row gutter='30' align='middle' justify='center'>
                  <h1> Nancy's Pick </h1>
                  <h2> {this.state.name3} </h2>
                </Row>
                <Row gutter='30' align='middle' justify='center'>
                  <img
                    src={this.state.recipe3.imageName}
                    referrerpolicy="no-referrer" alt="Recipe" style={{ width: "400px" }} />
                </Row>
                <Row>
                  <h2 style={{ width: 500, wordWrap: 'break-word' }}>Description</h2>
                  <h3 style={{ width: 500, wordWrap: 'break-word' }}>{this.state.recipe3.description}</h3>
                </Row>
                <Row>
                  <h2 style={{ width: 500, wordWrap: 'break-word' }}>Other's Review</h2>
                  <h3 style={{ width: 500, wordWrap: 'break-word' }}>{this.state.review3.review}</h3>
                </Row>
              </CardBody>
            </Card>

            {/* Jeanne's recipe in a card template  */}
            <Card style={{ margin: 50 }}>
              <CardBody>
                <Row gutter='30' align='middle' justify='center'>
                  <h1> Jeanne's Pick </h1>
                  <h2> {this.state.name4} </h2>
                </Row>
                <Row gutter='30' align='middle' justify='center'>
                  <img
                    src={this.state.recipe4.imageName}
                    referrerpolicy="no-referrer" alt="Recipe" style={{ width: "400px" }} />
                </Row>
                <Row>
                  <h2 style={{ width: 500, wordWrap: 'break-word' }}>Description</h2>
                  <h3 style={{ width: 500, wordWrap: 'break-word' }}>{this.state.recipe4.description}</h3>
                </Row>
                <Row>
                  <h2 style={{ width: 500, wordWrap: 'break-word' }}>Other's Review</h2>
                  <h3 style={{ width: 500, wordWrap: 'break-word' }}>{this.state.review4.review}</h3>
                </Row>
              </CardBody>
            </Card>
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

export default RecommendationPage

