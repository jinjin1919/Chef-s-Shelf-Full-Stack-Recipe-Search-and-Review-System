import React from 'react';
import "../pages/styles.css"
import { Row, Col, Divider, Button } from 'antd'

// Jump to search recipe page based on the keyword
function goToMatch(name) {
  window.location = `/Ingredient?name=${name}`
}

// Default images for the ingredient card
const imageURL = "https://cdn.dribbble.com/users/1522528/screenshots/6123013/media/c00054f0ca57f76859803a7f9d7e5692.gif"

// Default image for nutrition card
const protein = "images/proteinIcon.png"
const totalFat = "images/fat.png"
const carbohydrate = "images/carb.png"



// Create a card template for Ingredient's search result
const IngredientCard = ({ item }) => {
  return (
    <body>
      <div id="container">
        <div class="card">
          <img src={imageURL} alt="Ingredient" />
          <div class="card__details">
            <div class="nameInCard">{item.ingredientDescription}</div>
            <Divider />

            <Row style={{ textAlign: 'left' }}>

              <Col flex={1} style={{ textAlign: 'center' }}>
                <img src={protein} referrerpolicy="no-referrer" alt="Ingredient" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'left' }}>
                <p>{item.protein}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={totalFat} referrerpolicy="no-referrer" alt="Ingredient" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.totalFat}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={carbohydrate} referrerpolicy="no-referrer" alt="Ingredient" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.carbohydrate}</p>
              </Col>

            </Row>

            <Row>
              <Col flex={1} style={{ textAlign: 'center' }}>Protein</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Total Fat</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Carbohydrate</Col>
            </Row>
            <Divider />

            <div className="card_readmore" >
              <Button onClick={() => goToMatch(item.ingredientDescription)}>Read More</Button>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default IngredientCard
