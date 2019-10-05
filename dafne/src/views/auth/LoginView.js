import React from 'react';
import { Link } from "react-router-dom";
import "../../style/style.scss";
import Button from 'react-bootstrap/Button';
import DafneApi from '../../api/DafneApi.js';

class LoginView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email:'',
      password:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  onLoginClick(){
    DafneApi.login(this.state.email, this.state.password).then(res => {

    }).catch(err => {

    })

  }
  render(){
    return (
        <div className="dafne_content">
          <div className="dafne_form">
            <div className="form">
              <div className="spacer"></div>
              <div className="inputLabel">Username</div>
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange}>
              </input>
              <div className="inputLabel" >Password</div>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange}>
              </input>
              <br></br>
              <row className="login_buttons">
                <Button size="sm" onClick={() => this.onLoginClick()}>Login</Button>
              </row>
              <div className="spacer"></div>
            </div>
          </div>
        </div>
    )
  }

}

export default LoginView;
