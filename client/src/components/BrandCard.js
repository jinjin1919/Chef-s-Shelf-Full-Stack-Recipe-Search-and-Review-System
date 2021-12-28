import React from 'react';
import "../pages/styles.css"
import { Row, Col, Divider, Button } from 'antd'


// Jump to search recipe page based on the keyword
function goToMatch(name) {
  window.location = `/Brand?name=${name}`
}

// Default images for the brand card
const imageURL = "https://i.pinimg.com/originals/d8/8d/6b/d88d6b32de09e42818a4d80bb7917820.gif"
const no_of_item = "https://cdn.iconscout.com/icon/premium/png-256-thumb/food-tracking-1506317-1275651.png"
const manufacturer = "https://bodyxpress.fit/wp-content/uploads/2016/04/nutrition-icon-1.png"

// Create a card template for Brand's search result
const BrandCard = ({ item }) => {
  return (
    <body>
      <div id="container">
        <div class="card">
          <img src={imageURL} alt="brand" />
          <div class="card__details">
            <div class="nameInCard" style={{ textAlign: 'center' }}>{item.brand}</div>
            <Divider />
            <Row style={{ textAlign: 'left' }}>
              <Col flex={1} style={{ textAlign: 'center' }}>
                <img src={no_of_item} referrerpolicy="no-referrer" alt="brand" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'left' }}>
                <p>{item.no_of_item}</p>
              </Col>

              <Col flex={1} style={{ textAlign: 'right' }}>
                <img src={manufacturer} referrerpolicy="no-referrer" alt="brand" width="30" height="30" />
              </Col>

              <Col flex={2} style={{ textAlign: 'center' }}>
                <p>{item.manufacturer}</p>
              </Col>
            </Row>

            <Row>
              <Col flex={1} style={{ textAlign: 'center' }}>Num_of_item</Col>
              <Col flex={1} style={{ textAlign: 'center' }}>Manufacturer</Col>
            </Row>
            <Divider />

            <div className="card_readmore" >
              <Button onClick={() => goToMatch(item.brand)}>Read More</Button>
            </div>

          </div>
        </div>
      </div>
    </body>
  )
}

export default BrandCard