import React from 'react';
import "../../style/style.scss";
import Button from 'react-bootstrap/Button';
import DafneApi from '../../api/DafneApi.js';
import DafneLogo from "../../img/dafne_logo.png";
import EU_logo from "../../img/EU_note.png";

class LoginView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email:'',
      password:''
    }
    this.handleChange   = this.handleChange.bind(this);
    this.onLoginClick   = this.onLoginClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }
  redirectToApp(){
    this.props.history.push('/app')
  }
  _handleKeyDown(e){
      if (e.key === 'Enter') {
          this.onLoginClick();
      }
  }
  componentDidMount(){
    DafneApi.getMe().then( (res) => {
      if(res.valid_token){ //redirect to profile if user is logged in
        this.redirectToApp();
      }
    });
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  onLoginClick(){
    DafneApi.login(this.state.email, this.state.password).then(res => {
      if(res.hasOwnProperty("success")){
      //GO
        if(res.success){
          this.redirectToApp();
        }else{
          alert("Wrong username / password");
        }
      }else{
        alert("Connection error");
      }

    }).catch(err => {
      alert("Connection error");
    })

  }


  render(){
    return (
      <div className="d-flex h100">
          <div className="f100 bg_a">
            <div className="bg_text">Create your perspective on the Water, Food and Energy issues in the basin decide on best course of action</div>
          </div>
          <div className="f100 welcome_center_area">
            <div className="fcenter">
              <img className="lg_logo" src={DafneLogo} alt=""></img>
            </div>
            <div className="dafne_form">
              <div className="form">
                <div className="spacer"></div>
                <div className="inputLabel">Username</div>
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} onKeyDown={this._handleKeyDown}>
                </input>
                <div className="inputLabel" >Password</div>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} onKeyDown={this._handleKeyDown} >
                </input>
                <br></br>
                <row className="login_buttons">
                  <Button size="sm" onClick={() => this.onLoginClick()}>Login</Button>
                </row>
                <div className="spacer"></div>
              </div>
            </div>
            <div className="fcenter">
              <img className="eu_logo" src={EU_logo} alt=""></img>
            </div>
          </div>
          <div className="f100 bg_b" >
            <div className="bg_text">Compare and discuss your perspective with stakeholders from various industries and negotiate on best courses of action</div>
          </div>
      </div>

    )
  }

}

export default LoginView;
