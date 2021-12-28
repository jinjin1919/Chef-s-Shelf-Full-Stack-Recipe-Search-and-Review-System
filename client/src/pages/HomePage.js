import React from 'react';
import './styles.css'
import { Row, Col, BackTop } from 'antd'
import HeroPart from '../components/HeroPart';
import MenuBar from '../components/MenuBar';
import { generateRecipe } from '../fetcher';
import RandomRecipe from '../components/RandomRecipe'
import { Button } from "shards-react";


class HomePage extends React.Component {
  constructor(props) {
    super(props)

    // Initialize initial states
    this.state = {
      recipe1: [],
      recipe2: [],
      recipe3: [],

      recipeName1: "",
      imageURL1: "",
      keyword1: "",

      recipeName2: "",
      imageURL2: "",
      keyword2: "",

      recipeName3: "",
      imageURL3: "",
      keyword3: "",
    }
  }

  // Get the 3 recipes and store their information in the states defined in the constructor
  componentDidMount() {
    generateRecipe().then(res => {

      this.setState({ recipeName1: res.results[0].name })
      this.setState({ imageURL1: res.results[0].imageName })
      this.setState({ keyword1: res.results[0].id })
      this.setState({ recipe1: { imageName: this.state.recipeName1, imageURL: this.state.imageURL1, keyword: this.state.keyword1 } })

      this.setState({ recipeName2: res.results[1].name })
      this.setState({ imageURL2: res.results[1].imageName })
      this.setState({ keyword2: res.results[1].id })
      this.setState({ recipe2: { imageName: this.state.recipeName2, imageURL: this.state.imageURL2, keyword: this.state.keyword2 } })

      this.setState({ recipeName3: res.results[2].name })
      this.setState({ imageURL3: res.results[2].imageName })
      this.setState({ keyword3: res.results[2].id })
      this.setState({ recipe3: { imageName: this.state.recipeName3, imageURL: this.state.imageURL3, keyword: this.state.keyword3 } })
    })
  }

  render() {
    return (

      <div>
        <MenuBar />
        {/* Video for the Homepage */}
        <HeroPart />
        {/* Placement for 3 Recipe of the Day */}
        <div>
          <Row>
            <h3 style={{ fontSize: "30px", padding: "1%", color: "#adadad" }}>Recipes You May Like</h3>
          </Row>
          <Row gutter='30' align='middle' justify='center'>
            <Col>

              <RandomRecipe key={1} item={this.state.recipe1} />
            </Col>
            <Col>

              <RandomRecipe key={1} item={this.state.recipe2} />
            </Col>
            <Col>

              <RandomRecipe key={1} item={this.state.recipe3} />
            </Col>
          </Row>
          <BackTop>
            <div>
              <Button style={{ background: "#00B4CC", borderColor: "#00B4CC" }}> UP </Button>
            </div>
          </BackTop>
        </div>

        {/* Placement for Easy and Fast Recipes */}
        <div className="head-text">
          <div className="easyAndFastRecipe">
            <a target='_blank' rel="noreferrer" href={`/EasyRecipe`}>
              <img src={'images/easy.png'} alt="easyAndFastRecipe"
                style={{ width: '40vw' }} />
            </a>
            <a target='_blank' rel="noreferrer" href={`/FastRecipe`}>
              <img src={'images/fast.png'} alt="easyAndFastRecipe"
                style={{ width: '40vw', marginLeft: '5vw' }} />
            </a>
          </div>
          <div className="shelf">
            <img src={'shelf.jpg'} alt="shelf"
              style={{ width: '40vw', marginLeft: '0vw' }} />
            <img src={'shelf.jpg'} alt="shelf"
              style={{ width: '40vw', marginLeft: '5vw' }} />
          </div>
        </div>

        {/* Placement for Healthy Recipes */}
        <div className="head-text">
          <div className="healthyRecipe">
            <a target='_blank' rel="noreferrer" href={`/LowFatRecipe`}>
              <img src={'images/lowfat.png'} alt="healthyRecipe"
                style={{ width: '40vw'}} />
            </a>
            <a target='_blank' rel="noreferrer" href={`/ProteinRecipe`}>
              <img src={'images/protein.png'} alt="healthyRecipe"
                style={{ width: '40vw', marginLeft: '5vw' }} />
            </a>
          </div>
          <div className="shelf">
            <img src={'shelf.jpg'} alt="shelf"
              style={{ width: '40vw', marginLeft: '0vw' }} />
            <img src={'shelf.jpg'} alt="shelf"
              style={{ width: '40vw', marginLeft: '5vw' }} />
          </div>
        </div>
      </div>

    )
  }
}

export default HomePage

