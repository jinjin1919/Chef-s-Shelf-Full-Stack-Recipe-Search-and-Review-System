import React from 'react';
import { Button, Card, CardBody } from "shards-react";
import MenuBar from '../components/MenuBar';
import { setLogin } from '../fetcher'

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      submitted: false,
      firstnameError: false,
      lastnameError: false,
      usernameError: false,
      passwordError: false
    };

    // Set the first name, last name, username, and password for the account
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Set first name
  handleFirstName(event) {
    this.setState({ firstName: event.target.value })
  }

  // Set last name
  handleLastName(event) {
    this.setState({ lastName: event.target.value })
  }

  // Set username
  handleUserName(event) {
    this.setState({ username: event.target.value })
  }

  // Set password
  handlePassword(event) {
    this.setState({ password: event.target.value })
  }

  // On submit check if all the field is filled out, if not throw an error, if all filled out show that the user register successfully
  handleSubmit(event) {

    if (this.state.firstName.length === 0) {
      this.setState({ firstnameError: true })
    }
    else {
      this.setState({ firstnameError: false })
    }

    if (this.state.lastName.length === 0) {
      this.setState({ lastnameError: true })
    }
    else {
      this.setState({ lastnameError: false })
    }

    if (this.state.username.length === 0) {
      this.setState({ usernameError: true })
    }
    else {
      this.setState({ usernameError: false })
    }

    if (this.state.password.length === 0) {
      this.setState({ passwordError: true })
    }
    else {
      this.setState({ passwordError: false })
    }

    if (this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.username.length > 0 && this.state.password.length > 0) {
      this.setState({ submitted: true })
      console.log(this.state.firstName, this.state.lastName, this.state.username, this.state.password)
      setLogin(this.state.firstName, this.state.lastName, this.state.username, this.state.password);

      window.location = `/registerSuccess`
    }

  }

  render() {
    return (
      <div>
        <MenuBar />
        {/* Title  */}
        <h2>Register</h2>
        {/* Form for the user to fill out their information, throw an error message in red if user forgot to fill out something*/}
        <Card style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <CardBody>
            <form>
              <div>
                <label>First Name</label>
                <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleFirstName} />
                {this.state.firstnameError && <div style={{ color: 'red' }}>First Name is required</div>}
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handleLastName} />
                {this.state.lastnameError && <div style={{ color: 'red' }}>Last Name is required</div>}
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleUserName} />
                {this.state.usernameError && <div style={{ color: 'red' }}>Username is required</div>}
              </div>
              <div className={'form-group' + (this.state.submitted && !this.state.password ? ' has-error' : '')}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handlePassword} />
                {this.state.passwordError && <div style={{ color: 'red' }}>Password is required</div>}
              </div>
              <div>
                <Button style={{ background: "#00B4CC", borderColor: "#00B4CC" }} onClick={this.handleSubmit}>Register</Button>
                {this.state.submitted && !this.state.firstName && !this.state.lastName && !this.state.username && !this.state.password &&
                  <div style={{ color: 'red' }}>Please fill in everything</div>
                }
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

export default Register

