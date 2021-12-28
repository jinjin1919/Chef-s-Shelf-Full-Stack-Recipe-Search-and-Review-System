import React from 'react';
import { Button, Card } from "shards-react";
import Axios from 'axios';
import 'react-slideshow-image/dist/styles.css'
import './styles.css'
import { Table } from 'antd'

import MenuBar from '../components/MenuBar';
import { getAccountInformation, getFavoriteRecipe } from '../fetcher';
const { Column } = Table;

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: window.location.search ? window.location.search.substring(1).split('=')[1] : "",
      password: '',
      firstname: '',
      lastname: '',
      favoriteRecipe: [],
      favoriteIngredient: '',
      favoriteGroceryBrand: '',
      Login: false
    }
  }

  // Once user click on logout, it will kill the session and the user will no longer be logged in
  handleLogout(event) {
    Axios.get("http://localhost:8080/logOut").then((res) => {
      if (res.data.loggedIn === false) {
        window.location = `/login`
      }
    });
  }

  // Go to the following page after user click on the recipe
  goToMatch(id) {
    window.location = `/Recipe?id=${id}`
  }


  componentDidMount() {

    // Check if the user is logged in, if user is keep the user logged in, and get all the user information/favorite recipe
    Axios.get("http://localhost:8080/login").then((res) => {

      if (res.data.loggedIn === true) {
        this.setState({ username: res.data.user })
      }
    });

    if (this.state.username.length > 0) {
      this.setState({ Login: true })
      getAccountInformation(this.state.username).then(res => {
        this.setState({ password: res.results[0].password })
        this.setState({ firstname: res.results[0].firstname })
        this.setState({ lastname: res.results[0].lastname })
      })
      getFavoriteRecipe(this.state.username).then(res => {
        this.setState({ favoriteRecipe: res.results })
      })
    }

  }

  render() {
    return (

      <div>
        <MenuBar />
        {/* Title of webpage */}
        <div className="login-wrapper">
          <Card style={{ width: '90vw', margin: '0 auto', marginTop: '2vh' }}>
            {this.state.Login &&
              <div>
                <h1> Welcome To {this.state.firstname}'s Shelf !</h1>
              </div>
            }
          </Card>
          <Card style={{ width: '90vw', margin: '0 auto', marginTop: '2vh' }}>

            {/* List of user's favorite recipe */}
            <div>
              <div style={{ width: '60vw', margin: '0 auto', marginTop: '2vh' }}>
                <h2>What's On My Shelf</h2>
                <Table onRow={(record, rowIndex) => {
                  return {
                    onClick: event => { this.goToMatch(record.id) },
                  };
                }} dataSource={this.state.favoriteRecipe} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                  <Column title="Recipe ID" dataIndex="id" key="id" />
                  <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => a.name.localeCompare(b.name)} />
                </Table>
              </div>
            </div>
          </Card>

          {/* Button to back to the top page */}
          <Button style={{ marginTop: 20, marginRight: 5, background: "#00B4CC", borderColor: "#00B4CC" }} onClick={event => { this.handleLogout() }}>
            Log Out
          </Button>
        </div>
      </div>
    )
  }
}

export default Account

