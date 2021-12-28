import React from 'react';
import "../pages/styles.css"
import { Row, Col, Divider, Button, Rate } from 'antd'

// Go to the following page after user click on "Read More"
function goToMatch(id) {
  window.location = `/Recipe?id=${id}`
}
// Create a card template for Recipe's search result
const RecipeCard = ({ item }) => {
  return (
    <body>
      <div id="container">
        <div class="card">
          {/* Image of the recipe */}
          <img src={item.imageName} alt="Recipe" height="250" />
          <div class="card__details">
            <Row style={{ textAlign: 'left' }}>
              <Col flex={2} style={{ textAlign: 'left' }}>
                <p>by {item.authorName}</p>
              </Col>
              {/* Number of reviews and rating */}
              <Col flex={2} style={{ textAlign: 'right' }}>
                <Rate disabled defaultValue={item.rating} />
                <p>Number of Reviews({item.reviewCount})</p>
              </Col>
            </Row>
            {/* Name of recipe */}
            <div class="nameInCard">{item.name}</div>

            <Divider />

            {/* Icon along with information on number of steps, number of ingredients, and number of minutes for each recipe */}
            <Row style={{ textAlign: 'left' }}>
              <Col flex={1} style={{ textAlign: 'center' }}>
                <img src={'images/list-icon.svg'} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'left' }}>
                <p>{item.n_steps}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={'images/ingredients-icon.svg'} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.n_ingredients}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={'images/time-icon.svg'} referrerpolicy="no-referrer" alt="Recipe" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.minutes}</p>
              </Col>
            </Row>

            <Row>
              <Col flex={1} style={{ textAlign: 'center' }}>Steps</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Ingredients</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Minutes</Col>
            </Row>
            
            {/* Short description of recipe */}
            <div className="card_details">
              <p className="descriptionInCard">{item.description}</p>
            </div>

            {/* Read More button */}
            <div className="card_readmore" >
              <Button onClick={() => goToMatch(item.id)}>Read More</Button>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default RecipeCard