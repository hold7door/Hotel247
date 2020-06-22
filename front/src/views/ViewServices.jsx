import React from 'react';
import axios from 'axios';

import {
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardLink,
	CardText,
	Button
} from 'reactstrap';

class ViewServices extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			serviceData : {}
		};
		this.renderData = this.renderData.bind(this);
		this.renderSubData = this.renderSubData.bind(this);
	}
	componentDidMount(){
		axios({
			method : 'get',
			url : `/service/all/${this.props.hotelId}`,
			responseType : 'json'
		}).then((response)=>{
			if (response.status === 200 && response.data.success === true){
				let newData = {};
				newData = response.data['data'];
				this.setState({
					serviceData : newData
				});
				//console.log(this.state.serviceData);
			}
		}).catch((err)=>{
			console.log("Error retrieving data");
		});
	}
	renderItems(curItems){
		let Items = [];
		console.log(curItems);
		if (curItems){
			for (let ob of curItems){
				Items.push(
					<li class="list-group-item">
						<div className="itemwrapper">
							<span Style="float:left"><i className="nc-icon nc-check-2" /></span>
							<div Style="position:relative;margin-left:20px">
								<div>
									<b>{ob["itemName"]}</b>
									<span Style="float:right">
										<Button color="link"><i class="fa fa-trash fa-2x" aria-hidden="true" Style="color:blueviolet"></i></Button>
									</span>
								</div>
								<div>
									<span><p><em>This Item is available</em></p></span>
								</div>
								<div Style="margin-top:1px">
									<i class="fa fa-inr"></i>{ob["price"]}
								</div>
							</div>
						</div>
					</li>
				);
			}
			return Items;
		}
	}
	renderSubData(curSub){
		//console.log(curSub);
		let subCatElements = [];
		for (let obj of curSub){
			subCatElements.push(
				<div className="subcategory-wrapper">
	        		<Card>
	        			<CardBody>
	        				<CardTitle>
	        				<div>
				          		<span Style="float:left">
				          			<h5>{Object.keys(obj)[0]}</h5>
				          		</span>
				           		<span Style="float:right;position:relative;margin-right:10px">
									<Button color="link"><i class="fa fa-trash fa-2x" aria-hidden="true" Style="color:blue"></i></Button>
								</span>
							</div>
	        				</CardTitle>
	        			</CardBody>
	        			<CardBody>
	        				<ul class="list-group list-group-flush">
	        					{this.renderItems(obj[Object.keys(obj)[0]])}
							</ul>
	        			</CardBody>
	        		</Card>
	        	</div>
			);
		}
		return subCatElements;
	}
	renderData(){
		let catElements = [];
		for (let obj in this.state.serviceData){
			catElements.push(
				<div className="category-wrapper">
							<Card>
						        <CardBody>
						          <CardTitle>
						          	<div>
						          		<span Style="float:left">
						          			<h3>{obj}</h3>
						          		</span>
						           		<span Style="float:right;position:relative;margin-right:20px">
											<Button color="link"><i class="fa fa-trash fa-2x" aria-hidden="true" Style="color:red"></i></Button>
										</span>
									</div>
						          </CardTitle>
						        </CardBody>
						        <CardBody>
						        	{this.renderSubData(this.state.serviceData[obj])}
						        </CardBody>
					      	</Card>
						</div>
			);
		}
		return catElements;
	}
	render(){
		return(
			<div className="content view-service-wrapper">
				<Row>
					<Col md={{ size : 8, offset : 2 }}>
						{this.renderData()}
					</Col>
				</Row>
			</div>
		);
	}
}

export default ViewServices;