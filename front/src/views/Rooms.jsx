import React from 'react';
import axios from 'axios';

import {
	Card,
	CardHeader,
	CardTitle,
	CardBody,
	Table,
	Row,
	Col,
	Button
} from 'reactstrap';

class Rooms extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			allRooms : []
		};
		this.renderTableData = this.renderTableData.bind(this);
	}
	componentDidMount(){
		axios({
			method : 'get',
			url : `/roominfo/allRooms/${this.props.hotelId}`,
			respnseType : 'json'
		}).then((response)=>{
			console.log(response.data);
			if (response.status === 200 && response.data.success === true){
				this.setState({
					allRooms : response.data["allRoom"]
				});
			}
		}).catch((err)=>{
			console.log("Error");
		});
	}
	renderTableData(){
		let tableElements = [];
		if (this.state.allRooms){
			for (let ob of this.state.allRooms){
				let availColor = ob.available ? 'success' : 'danger';
				let availText = ob.available ? 'Book' : 'Not Available';
				tableElements.push(
					<tr>
			          <td>{ob.roomNumber}</td>
			          <td>{ob.suiteType}</td>
			          <td><Button color={availColor} disabled={ob.available ? false : true}>{availText}</Button></td>
			        </tr>
				);
			}
		}
		return tableElements;
	}
	render(){
		return(
			<div className="content all-room-wrapper">
				<Row>
	                <Col md={{ size : 6, offset : 3}}>
	                  <Card>
	                    <CardHeader>
	                      <CardTitle tag="h4">All Rooms</CardTitle>
	                    </CardHeader>
	                    <CardBody>
	                      <Table responsive>
	                        <thead className="text-primary">
	                          <tr>
	                            <th>Room</th>
	                            <th>Suite</th>
	                            <th>Availability</th>
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

export default Rooms;