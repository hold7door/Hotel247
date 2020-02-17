/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { createRef } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// core components
import {
  
} from "variables/charts.jsx";
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownOpen : false,
      //state variables for form data
      firstName : null,
      lastName : null,
      idType : null,
      idNumber : null,
      contactNumber : null,
      city : null,
      country : null,
      address : null,
      roomNumber : null,
      suite : null,
      durationOfStay : null
    };
    this.idTypeRef = createRef();
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this);
  }
  handleGuestSubmit(event){
    //To prevent the default form submit event
    event.preventDefault();                 
    //console.log(this.state);
    if (this.state.idType === null){
      //console.log(this.idTypeRef.current);
      this.idTypeRef.current.style.visibility = "visible";
    }
    else{
      axios({
        method : 'post',
        url : '/api/updateGuest/' + this.props.hotelId,
        data : {
          //Please add validation function for each of these fields before sending the data
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        idType : this.state.idType,
        idNumber : this.state.idNumber,
        contactNumber : this.state.contactNumber,
        city : this.state.city,
        country : this.state.country,
        address : this.state.address,
        roomNumber : this.state.roomNumber,
        durationOfStay : this.state.durationOfStay
        }
      }).then((response) => {
        if (response.status == 200){
          console.log("Guest updated successfullt");
        }
      }).catch((err) => {
        console.log("Error sending guest data to server");
        console.log(err);
      });
    }
  }
  onInputChange(event){
    //console.log(this.state);
    this.setState({
      [event.target.name] : event.target.value
    });
  }
  dropdownToggle(){
    this.setState({
      dropdownOpen  : !this.state.dropdownOpen
    });
  }
  changeValue(e){
    e.preventDefault();
    //console.log(e.currentTarget.getAttribute("dropdownvalue"));
    this.setState({
      idType : e.currentTarget.getAttribute("dropdownvalue")
    });
  }
  render() {
    //console.log(this.props);
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="6" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Room Available</p>
                        <CardTitle tag="p">150</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Revenue</p>
                        <CardTitle tag="p">$ 1,345</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Last day
                  </div>
                </CardFooter>
              </Card>
            </Col>
            
            
          </Row>
          <Row>
          <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Add New Guest</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleGuestSubmit}>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Hotel Name</label>
                          <Input
                            defaultValue={this.props.hotelName}
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            placeholder="First Name"
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input 
                            placeholder="Last Name"
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup >
                          <label>ID Type</label>
                          <Dropdown
                            isOpen={this.state.dropdownOpen}
                            toggle={e => this.dropdownToggle(e)}
                            direction="right"
                          >
                            <DropdownToggle caret color="white">
                              {this.state.idType != null ? this.state.idType : "ID Type"}
                            </DropdownToggle>
                            <DropdownMenu >
                              <DropdownItem onClick={this.changeValue} dropdownvalue="type 1">type 1</DropdownItem>
                              <DropdownItem onClick={this.changeValue} dropdownvalue="type 2">type 2</DropdownItem>
                              <DropdownItem onClick={this.changeValue} dropdownvalue="type 3">type 3</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                          <span id="idInvalid" style={{color:"red", visibility:"hidden"}} ref={this.idTypeRef}>Please select an ID Type</span>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>ID Number</label>
                          <Input placeholder="ID Number" type="text" name="idNumber" value={this.state.idNumber} onChange={this.onInputChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Contact Number</label>
                          <Input
                            placeholder="Contact Number"
                            type="text"
                            name="contactNumber"
                            value={this.state.contactName}
                            onChange={this.onInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            placeholder="City"
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.onInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Country</label>
                          <Input placeholder="Country" type="text" name="country" value={this.state.country} onChange={this.onInputChange} required/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Address</label>
                          <Input placeholder="Address" type="text" name="address" value={this.state.address} onChange={this.onInputChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Room Number</label>
                          <Input placeholder="Room Number" type="text" name="roomNumber" value={this.state.roomNumber} onChange={this.onInputChange} required/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Suite</label>
                          <Input placeholder="Suite" type="text" name="suite" value={this.state.suite} onChange={this.onInputChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Duration of Stay</label>
                          <Input placeholder="Duration of Stay" type="text" name="durationOfStay" value={this.state.durationOfStay} onChange={this.onInputChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Update
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
