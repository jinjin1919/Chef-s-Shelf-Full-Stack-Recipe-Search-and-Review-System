import React from 'react';
import Axios from 'axios';
import './styles.css'
import MenuBar from '../components/MenuBar';
import { Button } from "shards-react";

Axios.defaults.withCredentials = true

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginStatus: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Set the username
  handleUsername(event) {
    this.setState({ username: event.target.value })
  }

  // Set the password
  handlePassword(event) {
    this.setState({ password: event.target.value })
  }

  // Check if the user filled in all the information correctly, if so log in to the Account Page, if not throw an error message
  handleSubmit(event) {
    Axios.post("http://localhost:8080/login", {
      username: this.state.username,
      password: this.state.password,
    }).then((res) => {
      console.log(res.data.results)
      if (res.data.results === '0') {
        this.setState({ loginStatus: "Wrong Username/Password Combinations!" });
        console.log("Wrong Username/Password Combinations!")
      }
      else if (res.data.results === '1') {
        this.setState({ loginStatus: "User Does Not Exist" });
        console.log("User Does Not Exist")
      }
      else {
        Axios.get("http://localhost:8080/login").then(res => {
          window.location = `/account?username=${this.state.username}`
        })
      }
    })
  }

  // Go to Register Page if user click on the Register button
  handleRegister() {
    window.location = `/register`
  }

  componentDidMount() {

    // Check if an user session already exist, if so automatically log in
    Axios.get("http://localhost:8080/login").then((res) => {
      if (res.data.loggedIn === true) {
        window.location = `/account?username=${res.data.user}`
      }
    });
  }

  render() {
    return (
      <div>
        <MenuBar />
        {/* Form area for user to type in username/password */}
        <div className="login-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleUsername} required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="text" className="form-control" name="password" value={this.state.password} onChange={this.handlePassword} required />
            </div>
          </form>

          {/* Button for Login and Register */}
          <div>
            <Button theme="dark" style={{ marginTop: 20, marginRight: 5, background: "#00B4CC", borderColor: "#00B4CC" }} onClick={event => { this.handleSubmit() }} >Login</Button>
            <Button theme="primary" style={{ marginTop: 20, marginLeft: 5, background: "#00B4CC", borderColor: "#00B4CC" }} onClick={event => { this.handleRegister() }}>Register</Button>
          </div>
        </div>
        <h3>{this.state.loginStatus}</h3>
        <div className="shelf">
          <img src={'shelf.jpg'} alt="shelf" style={{ width: 300, paddingTop: "20px" }} />
        </div>
      </div>
    )
  }
}

export default Login