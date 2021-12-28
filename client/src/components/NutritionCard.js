import React from 'react';
import "../pages/styles.css"
import {
  Row, Col, Divider, Button
} from 'antd'

// Jump to search recipe page based on the keyword
function goToMatch(id) {
  window.location = `/Recipe?id=${id}`
}

// Default image for nutrition card
const protein = "images/proteinIcon.png"
const calories = "images/calories.png"
const sugar = "images/sugar.png"
const sodium = "images/sodium.png"
const totalFat = "images/fat.png"
const totalCarb = "images/carb.png"

// Create a card template for Nutrition's search result
const NutritionCard = ({ item }) => {
  return (
    <body>
      <div id="container">
        <div class="card">
          <img src={item.imageName} alt="Recipe"/>
          <div class="card__details">
            <div class="nameInCard">{item.name}</div>
            <Divider />

            <Row style={{ textAlign: 'left' }}>

              <Col flex={1} style={{ textAlign: 'center' }}>
                <img src={protein} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'left' }}>
                <p>{item.protein}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={calories} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.calories}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={sugar} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.sugar}</p>
              </Col>

            </Row>

            <Row>
              <Col flex={1} style={{ textAlign: 'center' }}>Protein</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Calorie</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Sugar</Col>
            </Row>

            <Row style={{ textAlign: 'left' }}>

              <Col flex={1} style={{ textAlign: 'center' }}>
                <img src={sodium} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'left' }}>
                <p>{item.sodium}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={totalFat} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.totalFat}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={totalCarb} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.totalCarb}</p>
              </Col>

            </Row>

            <Row>
              <Col flex={1} style={{ textAlign: 'center' }}>Sodium</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Total Fat</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Total Carb</Col>
            </Row>
            <Divider />

            <div className="card_readmore" >
              <Button onClick={() => goToMatch(item.id)}>Read More</Button>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default NutritionCard