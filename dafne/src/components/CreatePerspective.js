import React from 'react';
import { Link } from "react-router-dom";
import {
        Nav,
        NavDropdown,
        Form,
        FormControl,
        Navbar,
        Button,
        Row,
        Col

} from 'react-bootstrap';
class CreatePerspective extends React.Component {
  constructor (props) {
    super(props);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  render(){
    return (
        <div className="dafne_area">
          <div className="filters_area">
          </div>
          <Row>
            <Col sm={4} className="h-100">
              <div className="widget">
                <div className="widget_title">
                  Solution Pathways
                </div>
                <div className="widget_content">
                  <div className="filters_area">
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={8}>
              <div className="widget">
                <div className="widget_title">
                  Indicators
                </div>
                <div className="widget_content">
                  <div className="filters_area">
                  </div>
                  <div className="filters_area">
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
    )
  }

}

export default CreatePerspective;
