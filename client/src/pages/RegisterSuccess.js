import React from 'react';
import { Button, Card, CardBody } from "shards-react";
import MenuBar from '../components/MenuBar';

class RegisterSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // Go to Login page
  handleLogin() {
    window.location = `/login`
  }

  render() {
    return (
      <div>
        <MenuBar />
        {/* Shows that the user registered successfully */}
        <Card style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <CardBody>
            <form onSubmit={this.handleSubmit}>
              <h1> Thank you for registering!</h1>
              <h2> Please click the Login button to login </h2>
              <div className='shelf'>
                <Button style={{ background: "#00B4CC", borderColor: "#00B4CC" }} onClick={this.handleLogin}>Login</Button>
              </div>
            </form>
          </CardBody>
        </Card>
        <div className="shelf">
          <img src={'shelf.jpg'} alt="shelf" style={{ width: 500, paddingTop: "50px" }} />
        </div>
      </div>
    );
  }
}

export default RegisterSuccess

