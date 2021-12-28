import React from 'react';
import { Card, CardBody, Button } from "shards-react";
import "./styles.css"
import MenuBar from '../components/MenuBar';
import { Table, Row, Col, Divider, BackTop } from 'antd'
import { getIngredientsSearch, getRecommendationList, getIngredInfo, searchWiki } from '../fetcher'
import { Pie } from '@ant-design/charts';

const { Column } = Table;

class Ingredient extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: window.location.search ? window.location.search.substring(1).split('=')[1].replaceAll("%20", " ") : "",
      ingredientResult: [],
      image: "",
      ingredient: [],
      subsitutes: [],
      recommendation: [],
      nameQuery: this.props.nameQuery,
      wiki: '',
      ingredientInfo: [],
      youtube: ""
    }
  }
  
  // Go to the following page after user click on recipe
  goToMatch(id) {
    window.location = `/Recipe?id=${id}`
  }

  // Go to the following page after user click on ingredient
  goToMatchIngred(matchName) {
    window.location = `/Ingredient?name=${matchName}`
  }

  componentDidMount() {

    // Get the information on the Ingredient based on the ingredient name and get the Wikipedia information based on the ingredient
    getIngredientsSearch(this.state.name).then(res => {
      this.setState({ ingredientResult: res.results[0] })
      this.setState({ ingredient: this.state.ingredientResult.ingredientDescription.split(",") })


      getRecommendationList(this.state.name.split(",")[0].split(' ')[0]).then(res => {
        this.setState({ recommendation: res.results })
      })

      searchWiki(this.state.name.split(",")[0]).then(res => {
        if (res === '') {
          this.setState({ error: "Did not find wiki information" })
          this.setState({ wiki: "https://en.wikipedia.org/wiki/Category:Food_ingredients" })
        } else {
          this.setState({ wiki: res })
        }
      })

      getIngredientsSearch(this.state.name.split(",")[0]).then(res => {
        this.setState({ subsitutes: res.results })
      })

      // Edaman api to get ingredient info and image 
      getIngredInfo(this.state.name.split(",")[0]).then(res => {
        if (res.length === 0) {
          this.setState({ error: "Did not find ingredient information" })
        } else {
          this.setState({ ingredientInfo: res.results })
          this.setState({ image: res.hints[0].food.image })
        }
      })
    })
  }

  render() {

    const data = [
      {
        type: 'protein',
        value: this.state.ingredientResult.protein,
      },
      {
        type: 'totalFat',
        value: this.state.ingredientResult.totalFat,
      },
      {
        type: 'carbohydrate',
        value: this.state.ingredientResult.carbohydrate,
      },
      {
        type: 'energy',
        value: this.state.ingredientResult.energy,
      },
      {
        type: 'sugar',
        value: this.state.ingredientResult.sugar,
      },
      {
        type: 'calcium',
        value: this.state.ingredientResult.calcium,
      },
      {
        type: 'Iron',
        value: this.state.ingredientResult.iron,
      },
      {
        type: 'Potassium',
        value: this.state.ingredientResult.potassium,
      },
      {
        type: 'Sodium',
        value: this.state.ingredientResult.sodium,
      },

      {
        type: 'VitaminC',
        value: this.state.ingredientResult.vitaminC,
      },

      {
        type: 'Cholesterol',
        value: this.state.ingredientResult.cholesterol,
      }

    ];


    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      innerRadius: 0.64,
      label: {
        type: 'inner',
        offset: '-50%',
        style: {
          fill: '#fff',
          fontSize: 14,
          textAlign: 'center',
        },
      },
      statistic: null,
      annotations: [
        {
          type: 'image',
          position: ['50%', '50%'],
          style: {
            width: 50,
            height: 50,
          },
          offsetX: -25,
          offsetY: 40,
        },
      ],
    };

    return (
      <div>
        {/* Menu Bar */}
        <MenuBar />

        {/* Title */}
        <div className="name-container" style={{ height: "2%" }}>
                    <h1 style={{ fontSize: "30px", padding: "1%", color: "black" }}>{this.state.name}</h1>
        </div>

        {/* Ingredient Picture */}
        <Card style={{ width: '50vw', margin: '0 auto', marginTop: '2%' }}>
          <CardBody>
            <Row gutter='30' align='middle' justify='center'>
              <img src={this.state.image} referrerpolicy="no-referrer" alt="Ingredient" style={{ width: "60%" }} />
            </Row>
            <Row gutter='30' align='middle' justify='center'>
              <img src={'shelf.jpg'} alt="shelf" style={{ width: '40vw' }} />
            </Row>

          </CardBody>
        </Card>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Row className="info">
            {/* Subsititute Information */}
            <Col className="NutriCol">
              <Card style={{ width: '40vw', margin: '0 auto', marginTop: '4vh', marginLeft: '5vw' }}>
                <h2>Subsitute Ingredients</h2>

                <Table style={{ width: '38vw', marginLeft: '1vw'}} onRow={(record, rowIndex) => {
                  return {
                    onClick: event => { this.goToMatchIngred(record.ingredientDescription) },
                  };
                }} dataSource={this.state.subsitutes} pagination={{ pageSizeOptions: [1, 5], defaultPageSize: 4, showQuickJumper: true }}>

                  <Column title="Subsitute Information" dataIndex="ingredientDescription" key="ingredientDescription" sorter={(a, b) => a.ingredientDescription.localeCompare(b.ingredientDescription)} />

                </Table>
              </Card>
            </Col>
            <Col className="map">
              <Card className="location" style={{ width: "45vw", margin: '0 auto', marginTop: '4vh', marginLeft: '5vw' }} >
                <h2>Nutrition Information</h2>
                <Pie {...config} />
              </Card>
            </Col>
          </Row>
        </div>



        {/* Find related food recipe */}
        <Card style={{ width: '90vw', margin: '0 auto', marginTop: '4vh', height: '100vw' }}>

          <div>
            <div style={{ width: '75vw', margin: '0 auto', marginTop: '2vh' }}>
              <h2>Related Food Recipe</h2>
              <Table onRow={(record, rowIndex) => {
                return {
                  onClick: event => { this.goToMatch(record.id) },
                };
              }} dataSource={this.state.recommendation} pagination={{ pageSizeOptions: [5, 6], defaultPageSize: 5, showQuickJumper: true }}>
                <Column title="Recipe ID" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => a.name.localeCompare(b.name)} />
                <Column title="Ingredients" dataIndex="ingredients" key="ingredients" sorter={(a, b) => a.ingredients.localeCompare(b.ingredients)} />
              </Table>
            </div>
          </div>

          {/* Wiki page */}
          <Divider />
          <div className="brand-name-contianer" style={{ marginTop: "2%", marginBottom: "2%", height: "3%" }}>
            <h3 style={{ fontSize: "30px", padding: "1%", color: "black" }}>Learn More About this ingredient</h3>
          </div>

          {/*Learn More About this ingredient */}

          <iframe id="wiki"
            title="This ingredient's Wikipedia page"
            width="100%"
            height="60%"
            src={this.state.wiki}>
          </iframe>
        </Card>
        
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
export default Ingredient