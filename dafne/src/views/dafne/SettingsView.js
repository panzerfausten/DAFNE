import React from 'react';
import "../../style/style.scss";
import {
        Button,
        Nav,
        NavDropdown,
        Navbar,
} from 'react-bootstrap';
import DafneApi from '../../api/DafneApi.js';
import DafneLogo from "../../img/dafne_logo.png";
import CreatePerspective from '../../components/CreatePerspective';
import ComparePerspective from '../../components/ComparePerspective';
import CommentsModal from '../../components/CommentsModal';
import HelpModal from "../../components/HelpModal";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'


class SettingsView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex:0,
      authorized:false,
      initials:'',
      pwd_1:'',
      pwd_2:'',
    }
    this.onChange     = this.onChange.bind(this);
    this.getInitials  = this.getInitials.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);

  }
  componentDidMount(){
    DafneApi.getMe().then( (res) => {
      if(!res.valid_token){ //redirect to profile if user is logged in
        this.redirectHome();
      }else{
        this.setState({
          authorized:true
        })
        if(res.hasOwnProperty('user')){
          this.getInitials(res.user);
        }
      }
    });
  }
  _handleKeyDown(e){
      if (e.key === 'Enter') {
          this.changePassword();
      }
  }
  getInitials(user){
    if(user.hasOwnProperty('name')){
      let initials = `${user.name[0]}`;

      if(user.hasOwnProperty('last_name')){
        initials = `${initials}${user.last_name[0]}`;
      }
      this.setState({initials:initials.toUpperCase()})
    }
  }
  onChange(target){
    this.setState({[target.name] : target.value });
  }
  changePassword(){
    let pwd1 = this.state.pwd_1.trim();
    let pwd2 = this.state.pwd_2.trim();

    if(pwd1.length < 7){
        Swal.fire('Password too short', 'Your password must be at least 7 characters long.', 'error')
        return null;
    }
    if(pwd2.length < 7){
        Swal.fire('Password too short', 'Your password must be at least 7 characters long.', 'error')
        return null;
    }
    if(pwd2 !== pwd1){
      Swal.fire('Passwords does not match', 'Your passwords does not match.', 'error')
      return null;
    }
    //update password
    DafneApi.changePassword(pwd1).then( (r)=>{
      Swal.fire('Success', 'Your password has been updated.', 'success')
    }).catch((err) =>{
      Swal.fire('Error', 'There was an error while trying to change your password.', 'error')

    })
  }
  renderContent(){
    return(
      <div style={{backgroundColor:'#F1F1F1',display:'flex',flex:1,flexDirection:'column'}}>
        <h4>Change your password</h4>
        <div style={{width:300,marginLeft:30,}}>
          <label className='txt_bold m-t-20'>Type your new password</label>
          <input type='password'
                 name='pwd_1'
                 value={this.state.pwd_1}
                 className='width100 p-l-5'
                 placeholder='Type your new password'
                 onKeyDown={this._handleKeyDown}
                 onChange={(e) => this.onChange(e.target)}>
          </input>
          <label className='txt_bold m-t-20 '>Repeat you password</label>
          <input type='password'
                 name='pwd_2'
                 value={this.state.pwd_2}
                 className='width100 p-l-5'
                 placeholder='Repeat your password'
                 onKeyDown={this._handleKeyDown}
                 onChange={(e) => this.onChange(e.target)}>
          </input>
          <Button className='btn_modal m-t-20' block onClick={() => this.changePassword()}>Save password</Button>

        </div>

      </div>
    );
  }
  redirectHome(){
    this.props.history.push('/');
  }
  goToSettings(){
    this.props.history.push('/app/settings');
  }
  logout(){
    DafneApi.logout().then((res) => {
      if(res.success){
        this.redirectHome();
      }else{
        alert('There was a problem trying to log you out')
      }
    });
  }
  render(){
    if(this.state.authorized){
      return (
        <div className="container-fluid flex">
          <Navbar expand="lg">
            <Navbar.Brand href="/app"><img src={DafneLogo} alt=""></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              </Nav>


              <NavDropdown alignRight className="circle_menu_btn m-l-10" title={this.state.initials} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => this.goToSettings()}>Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.logout()}>Log out</NavDropdown.Item>
              </NavDropdown>


            </Navbar.Collapse>
          </Navbar>
          {this.renderContent()}
        </div>
      )
    }else{
      return null;
    }

  }

}

export default SettingsView;
