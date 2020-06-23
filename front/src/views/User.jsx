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
import React from "react";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
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
import { createRef } from "react";

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dropdownOpen : false,
      // Form data
      roomNum : null, // Cant Update. To Change Room User needs to checkout from current Room first.
      email : null,
      contact : null,
      suite : null,   // Can't update
      first : null,   //Can't update
      last : null,    //Can't Update
      idtype : null,  
      idNumber : null,
      address : null,
      city : null,
      country : null,
      zipCode : null,
      date : null,
      time : null,
      billId : null,
      guestId : null,
      duration : 2,
      // Map of fields that were changed
      updatedFields : new Set()
    };
    this.notificationAlert = createRef();
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount(){
    axios({
      method : 'get',
      url : '/roominfo/getRoomInfo/' + this.props.roomId,
      responseType : 'json'
    }).then((response)=>{
      if (response.status === 200){
        if (response.data.isroom === true){
          var dt = response.data.roomdetails.BookingDateTime.split('T');
          this.setState({
            roomNum : response.data.roomdetails.RoomNumber,
            email : response.data.roomdetails.email,
            contact : response.data.roomdetails.contact,
            suite : response.data.roomdetails.suite,
            first : response.data.roomdetails.FirstName,
            last : response.data.roomdetails.LastName,
            idtype : response.data.roomdetails.IdType,
            idNumber : response.data.roomdetails.IdNumber,
            address : response.data.roomdetails.Address,
            city : response.data.roomdetails.city,
            country : response.data.roomdetails.country,
            zipCode : response.data.roomdetails.zipCode,
            date : dt[0],
            time : dt[1].slice(0, -5),
            billId : response.data.roomdetails.BillId,
            guestId : response.data.roomdetails.GuestId
          });
        }  
        else{
          console.log("Room Error");
        }
      }
    }).catch((err)=>{
      console.log(err);
      console.log("Error receiving profile data");
    });
  }
  handleEdit(){
    if (this.state.updatedFields.size === 0){
      var message = "Nothing to update";
      var type = "success";
      this.notify(type, message);
    }
    else{
      var fieldValue = new Map();
      var toUpdate = this.state.updatedFields;
      toUpdate.forEach((field)=>{
        fieldValue.set(field, this.state[field]);
      });
      axios({
        method : 'post',
        url : '/roominfo/editInfo/' + this.state.guestId,
        responseType : 'json',
        data : {
          updatedData : [...fieldValue]
        }
      }).then((response)=>{
        if (response.status === 200){
          if (response.data.success === true){
            var type = "success";
            var message = "Guest Details Updated Successfully";
            this.notify(type, message);
            var emptyMap = new Map();
            this.setState({
              updatedFields : emptyMap
            });
          }
        }
      }).catch((err)=>{
        if (err) throw err;
        var type = "danger";
        var message = "Some error occurred. Check fields and try again";
        this.notify(type, message);
      });
    }
  }
  notify(type, alertMessage){
    console.log("Notify");
    var options = {};
    options = {
      place: 'tr',
      message: (
        <div>
          <div>
            {alertMessage}
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    this.notificationAlert.current.notificationAlert(options);
  }
  dropdownToggle(e){
    this.setState({
      dropdownOpen : !this.state.dropdownOpen
    });
  }
  changeValue(e){
    e.preventDefault();
    var {updatedFields} = this.state.updatedFields;
    updatedFields.add('idType');
    this.setState({
      idType : e.currentTarget.getAttribute("dropdownvalue"),
      updatedFields : updatedFields
    });
  }
  onInputChange(e){
    var {updatedFields} = this.state;
    var updatedSet = new Set([...updatedFields]);
    updatedSet.add(e.target.name);
    this.setState({
      [e.target.name] : e.target.value,
      updatedFields : updatedSet 
    });
  }
  render() {
    return (
        <div className="content">
        <NotificationAlert ref={this.notificationAlert} />
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/damir-bosnjak.jpg")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/mike.jpg")}
                      />
                      <h5 className="title">{this.state.first +" " + this.state.last}</h5>
                    </a>
                  </div>
                    <p className="description text-center" style={{ marginLeft : "10%"}}>
                      Contact : <strong>{this.state.contact}</strong>
                    </p>
                    <p className="description text-center" style={{ marginLeft : "10%" }}>
                      Duration of stay : <strong>{this.state.duration} day(s)</strong>
                    </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h6>
                          {this.state.date} <br />
                          <small>Date of Arrival</small>
                        </h6>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          {this.state.roomNum} <br />
                          <small>Room</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h6>
                          {this.state.time} <br />
                          <small>Time of Arrival</small>
                        </h6>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Members</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          DJ Khaled <br />
                          <span className="text-success">
                            <small>Available</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/joe-gardner-2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          Creative Tim <br />
                          <span className="text-success">
                            <small>Available</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col className="col-ms-7" xs="7">
                          Flume <br />
                          <span className="text-success"> 
                            <small>Available</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Room Number</label>
                          <Input
                            placeholder="Room Number"
                            type="text"
                            value={this.state.roomNum}
                            name = "roomNum"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            placeholder="Username"
                            type="text"
                            name="username"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email Address
                          </label>
                          <Input placeholder="Email" type="email" name ="email" onChange={this.onInputChange} value={this.state.email}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Contact</label>
                            <Input
                              placeholder="Contact"
                              type="text"
                              name="contact"
                              onChange={this.onInputChange}
                              value={this.state.contact}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Suite</label>
                            <Input placeholder="Suite" type="text" name="suite" value={this.state.suite} disabled/>
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
                            name="first"
                            value={this.state.first}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            name="last"
                            value={this.state.last}
                            disabled
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
                              {this.state.idtype}
                            </DropdownToggle>
                            <DropdownMenu >
                              <DropdownItem onClick={this.changeValue} dropdownvalue="type 1">type 1</DropdownItem>
                              <DropdownItem onClick={this.changeValue} dropdownvalue="type 2">type 2</DropdownItem>
                              <DropdownItem onClick={this.changeValue} dropdownvalue="type 3">type 3</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                          <span id="idInvalid" style={{color:"red", visibility:"hidden"}}>Please select an ID Type</span>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>ID Number</label>
                          <Input placeholder="ID Number" type="text" name="idNumber" onChange={this.onInputChange} value={this.state.idNumber} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            placeholder="Home Address"
                            type="text"
                            name="address"
                            onChange={this.onInputChange}
                            value={this.state.address}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            placeholder="City"
                            type="text"
                            name="city"
                            onChange={this.onInputChange}
                            value={this.state.city}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            placeholder="Country"
                            type="text"
                            name="country"
                            onChange={this.onInputChange}
                            value={this.state.country}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="text" name="zipCode" onChange={this.onInputChange} value={this.state.zipCode} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          onClick={this.handleEdit}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default User;
