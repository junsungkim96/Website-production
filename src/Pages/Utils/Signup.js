import React from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import logo from '../../img/qblackai_logo.png';
import { Link } from 'react-router-dom';


class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  }

  render() {
    return (
      <>
        <Link to="/" style={{ marginTop: '10vh', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <img
            src={logo}
            alt="QblackAI Logo"
            style={{ width: '250px', cursor: 'pointer' }}
          />
        </Link>

        <Card style = {{padding: '10px', marginTop: '1vh', marginLeft: '43vw', marginRight: '43vw'}}>
          <form onSubmit={this.handleSubmit} style = {{display: 'flex', flexDirection: 'column'}}>
            <div style = {{fontSize: '3.3vh', fontWeight: 'bold', marginBottom: '2vh', display: 'flex', justifyContent: 'center'}}>
              Welcome
            </div>

            <label style = {{display:'flex', flexDirection: 'column'}}>
              <div>
                First Name
              </div>
              <InputGroup className="mb-1">
                <Form.Control autocomplete = "off" type="text" name="firstName" onChange={this.handleInputChange}/>
              </InputGroup>
            </label>
            
            <label style = {{display:'flex', flexDirection: 'column'}}>
              <div>
                Last Name
              </div>
              <InputGroup className = "mb-1">
                <Form.Control autocomplete = "off" type="text" name="lastName" onChange={this.handleInputChange}/>
              </InputGroup>
            </label>

            <label style = {{display:'flex', flexDirection: 'column'}}>
              <div>
                Email Address
              </div>
              <InputGroup className="mb-1">
                <Form.Control autocomplete = "off" type="email" name="emailAddress" onChange={this.handleInputChange}/>
              </InputGroup>
            </label>
            
            <label style = {{display:'flex', flexDirection: 'column'}}>
              <div>
                Password
              </div>
              <InputGroup className="mb-1">
                <Form.Control autocomplete = "off" type="password" name="password" onChange={this.handleInputChange}/>
              </InputGroup>
            </label>
            
            <div className="form-group" style = {{display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px'}}>
              <button type="submit" className="btn btn-primary mr-2">Sign Up</button>
            </div>
          </form>
        </Card>
      </>
    );
  }
}

export default Signup;