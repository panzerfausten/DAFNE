import React from 'react';
import "../../style/style.scss";
import {
        Nav,
        NavDropdown,
        Navbar,
} from 'react-bootstrap';
import DafneApi from '../../api/DafneApi.js';
import DafneLogo from "../../img/dafne_logo.png";
import CreatePerspective from '../../components/CreatePerspective';
import ComparePerspective from '../../components/ComparePerspective';
import CommentsModal from '../../components/CommentsModal';


class DafneView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex:0,
      authorized:false,
      initials:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.changeIndex  = this.changeIndex.bind(this);
    this.getInitials  = this.getInitials.bind(this);

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
  getInitials(user){
    if(user.hasOwnProperty('name')){
      let initials = `${user.name[0]}`;

      if(user.hasOwnProperty('last_name')){
        initials = `${initials}${user.last_name[0]}`;
      }
      this.setState({initials:initials.toUpperCase()})
    }
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  changeIndex(i){
    this.setState({selectedIndex:i})
  }
  renderContent(){
    if(this.state.selectedIndex === 0){
      return(<CreatePerspective perspectiveId={this.props.match.params.id}></CreatePerspective>);
    }else{
      return(<ComparePerspective perspectiveId={this.props.match.params.id}></ComparePerspective>);

    }
  }
  redirectHome(){
    this.props.history.push('/');
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
            <Navbar.Brand href="#home"><img src={DafneLogo} alt=""></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link  onClick={() => this.changeIndex(0)} className={this.state.selectedIndex === 0 ? 'navbar-selected' : null}>Create your perspective</Nav.Link>
                <Nav.Link  onClick={() => this.changeIndex(1)} className={this.state.selectedIndex === 1 ? 'navbar-selected' : null}>Compare perspectives</Nav.Link>
              </Nav>

              <NavDropdown alignRight className="circle_menu_btn" title={this.state.initials} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => this.logout()}>Log out</NavDropdown.Item>
              </NavDropdown>


            </Navbar.Collapse>
          </Navbar>
          {this.renderContent()}
          <CommentsModal></CommentsModal>

        </div>
      )
    }else{
      return null;
    }

  }

}

export default DafneView;
