import React, {createRef} from "react";
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Table, Button } from 'reactstrap';
import sock from './socket';

class Orders extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			allOrders : []
		};
		this.handleNewOrder = this.handleNewOrder.bind(this);
		this.approveOrder = this.approveOrder.bind(this);
		this.handleDelivery = this.handleDelivery.bind(this);
	}
	componentDidMount(){
		sock.emit('joinManager', {hotel: this.props.hotelId});
        sock.on('sendOrder', (data)=>{
            this.handleNewOrder(data);
        });
        sock.on('delivered', (data)=>{
        	this.handleDelivery(data);
        });
	}
	handleDelivery(data){
		let newOrders = [...this.state.allOrders];
		let OrderId = data.orderDetails.ItemId + ":" + data.orderDetails.roomNum;
		let i = 0;
		for (; i<newOrders.length; i++){
			if (newOrders[i].OrderId === OrderId)
				break;
		}
		if (i<newOrders.length){
			newOrders.splice(i, 1);
		}
		// console.log("yes");
		this.setState({
			allOrders : newOrders
		});
	}
	handleNewOrder(data){
		// console.log(data);
		let newOrders = [...this.state.allOrders];
		let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/");
		let [hour, minute, second] = ( new Date() ).toLocaleTimeString().slice(0,7).split(":");
		let orderItem = {
			Room : data.from,
			Item : data.orderDetails.Item,
			Category : data.orderDetails.Category,
			SubCategory : data.orderDetails.SubCategory,
			Quantity : data.orderDetails.Quantity,
			OrderId : data.orderDetails.ItemId + ":" + data.from,
			Time : `${hour}:${minute}:${second} ${date}/${month}/${year}`
		};
		newOrders.push(orderItem);
		this.setState({
			allOrders : newOrders
		});
	}
	approveOrder(e){
		e.target.className = "btn btn-warning";
		e.target.innerHTML = "In Process";
		e.target.disabled = true;
		// console.log(e.target);
		let [ItemId, RoomNum] = e.target.value.split(":");
		let destination = this.props.hotelId + RoomNum;
		sock.emit('approveOrder', {to : destination, OrderId : e.target.value});
	}
	renderTableData(){
		let tdata = [];
		for (let ordr of this.state.allOrders){
			tdata.push(
				<tr>
					<td>{ordr.Room}</td>
					<td>{ordr.Item}</td>
					<td>{ordr.Category}</td>
					<td>{ordr.SubCategory}</td>
					<td>{ordr.Quantity}</td>
					<td>{ordr.Time}</td>
					<td><Button color="danger" value={ordr.OrderId} onClick={this.approveOrder}>Approve</Button></td>
				</tr>
			);
		}
		return tdata;
	}
	render(){
		return (
            <div className="content">
              <Row >
                <Col md="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">All Orders</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Room</th>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Quantity</th>
                            <th>Time</th>
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

export default Orders;