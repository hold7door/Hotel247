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
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

class Tables extends React.Component {
  constructor(props){
    super(props);
    this.renderTableData = this.renderTableData.bind(this);
    this.state = {
      tableRows : new Array()
    };
  }

  componentDidMount(){
    var forTableData = new Array();
    axios({
      method : 'get',
      url : '/roominfo/bookedRooms/' + this.props.hotelId,
      responseType : 'json'
    }).then((response)=>{
      if (response.status === 200){
        //console.log(response);
        response.data.bookedrooms.forEach((entry)=>{
          forTableData.push({
            room : entry.guestRoomNumber.roomNumber,
            suite : entry.guestRoomNumber.suiteType,
            firstname : entry.guestFirstName,
            lastname : entry.guestLastName,
            contact : entry.contactNumber,
            bookedOn : entry.checkInDateTime,
            duration : entry.durationOfStay,
            roomId : entry.guestRoomNumber._id
          });
        });
        this.setState({tableRows : forTableData});
        //return tableData;
      }
    }).catch((err)=>{
      console.log(err);
    });
  }
  renderTableData(){
    const {tableRows} = this.state;
    var tableData = new Array();
    var rowinfo;
    for(rowinfo of tableRows){
      var dt = rowinfo.bookedOn.split('T');
      var dateTimeBook = dt[0] + " " +  dt[1];
      tableData.push(
        <tr>
          <td>{rowinfo.room}</td>
          <td>{rowinfo.suite}</td>
          <td>{rowinfo.firstname}</td>
          <td>{rowinfo.lastname}</td>
          <td>{rowinfo.contact}</td>
          <td>{dateTimeBook}</td>
          <td className="text-center">{rowinfo.duration} day(s)</td>
          <td><Button color="info">View</Button></td>
        </tr>
      );
    }
    return tableData;
  }
  render() {
    return (
        <div className="content">
          <Row >
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Booked Room Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Room</th>
                        <th>Suite</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Booking Date/Time</th>
                        <th>Duration of Stay</th>
                        <th>View Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderTableData()}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
    );
  }
}

export default Tables;
