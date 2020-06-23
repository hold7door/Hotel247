import React, { createRef } from 'react';
import axios from 'axios';
import NotificationAlert from "react-notification-alert";

import {
	Card,
	Button,
	CardTitle,
	CardText,
	DropdownItem,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	Row,
	Col,
	Input
} from 'reactstrap';

class Services extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dropdownOpen1 : false,
			dropdownOpen2 : false,
			dropdownOpen3 : false,
			CategoryText : null,
			subCategoryText : null,
			CategorySel1 : null,
			ItemText : null,
			ItemPrice : null,
			CategorySel2 : null,
			subCategorySel : null,
			allCategories : [],
			allSubCategories : [],
			roomnum : null,
			suite : null
		};
		this.dropdownToggle1 = this.dropdownToggle1.bind(this);
		this.dropdownToggle2 = this.dropdownToggle2.bind(this);
		this.dropdownToggle3 = this.dropdownToggle3.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.renderCategoryDropdown = this.renderCategoryDropdown.bind(this);
		this.renderSubCategoryDropdown = this.renderSubCategoryDropdown.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.addSubCategory = this.addSubCategory.bind(this);
		this.addItem = this.addItem.bind(this);
		this.notificationAlert = React.createRef();
		this.notify = this.notify.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.addRoom = this.addRoom.bind(this);
	}	
	componentDidMount(){
		this.fetchData();
	}
	fetchData(){
		let hotelId = this.props.hotelId;
		axios({
			method : "get",
			url : `/service/allcat/${hotelId}`,
			responseType : 'json',
		}).then((response)=>{
			//console.log("Sent");
			if (response.status === 200 && response.data.success === true){
				let updatedCategory = [];
				let updatedSubCategory = [];
				for (let ob of response.data["allCategory"]){
					updatedCategory.push(ob["categoryName"]);
				}
				for (let ob of response.data["allSubCategory"]){
					updatedSubCategory.push(ob["subCategoryName"]);
				}
				this.setState({
					allCategories : updatedCategory,
					allSubCategories : updatedSubCategory
				});
			}
		}).catch((err)=>{
			console.log(err);
		});
	}
	addRoom(){
		if (this.state.roomnum && this.state.suite && this.props.hotelId){
			axios({
				method : 'post',
				url : `/api/addRoom/${this.props.hotelId}`,
				responseType : 'json',
				data : {
					"roomnum" : this.state.roomnum,
	    			"suite" : this.state.suite
				}
			}).then((response)=>{
				if (response.status === 200 && response.data.success === true){
					this.notify("success", `Room Added : ${this.state.roomnum} ${this.state.suite}`);
				}
				else {
					this.notify("danger", "Some Error Occured. Maybe the room already exists.");
				}
			}).catch((err)=>{
				console.log(err);
				this.notify("danger", "Some Error Occured.");
			});
		}
		else {
			this.notify("danger", "Error! Missing Fields");
		}
	}
	addItem(){
		if (this.state.ItemText && this.state.ItemPrice && this.state.CategorySel2 && this.state.subCategorySel && this.props.hotelId){
			axios({
				method : 'post',
				contentType : "application/json",
				responseType : 'json',
				url : "/service/add/item",
				data : {
					"itemName" : this.state.ItemText,
				    "price" : this.state.ItemPrice,
				    "catName" : this.state.CategorySel2,
				    "subCatName" : this.state.subCategorySel,
				    "hotelId" : this.props.hotelId
				}
			}).then((response)=>{
				console.log(response.data);
				if (response.status === 200 && response.data.success === true){
					console.log("Success");
					this.notify("success", "Operation Success");
				}
			}).catch((err)=>{
				console.log(err);
				this.notify("danger", "Some Error Occured.");
			});
		}
		else{
			this.notify("danger", "Missing Fields");
		}
	}
	addSubCategory(){
		if (this.state.subCategoryText && this.state.CategorySel1 && this.props.hotelId){
			axios({
				method : 'post',
				contentType : "application/json",
				responseType : 'json',
				url : "/service/add/subcategory",
				data : {
					"subCatName" : this.state.subCategoryText,
				    "catName" : this.state.CategorySel1,
				    "hotelId" : this.props.hotelId
				}
			}).then((response)=>{
				console.log(response.data);
				if (response.status === 200 && response.data.success === true){
					console.log("Success");
					this.notify("success", "Operation Success");
					this.fetchData();
				}
			}).catch((err)=>{
				console.log(err);
				this.notify("danger", "Some Error Occured.");
			});
		}
		else{
			this.notify("danger", "Missing Fields");
		}
	}
	addCategory(){
		//console.log(this.CategoryText);
		if (this.state.CategoryText && this.props.hotelId){
			axios({
				method : 'post',
				contentType : "application/json",
				responseType : 'json',
				url : "/service/add/category",
				data : {
					"newCatName" : this.state.CategoryText,
   					"hotelId" : this.props.hotelId
				}
			}).then((response)=>{
				console.log(response.data);
				if (response.status === 200 && response.data.success === true){
					console.log("Success");
					this.notify("success", "Operation Success");
					this.fetchData();
				}
			}).catch((err)=>{
				console.log(err);
				this.notify("danger", "Some Error Occured.");
			});
		}
		else{
			this.notify("danger", "Missing Fields.");
		}
	}
	renderCategoryDropdown(i){
		let items = [];
		let forName = `CategorySel${i}`;
		for (let d of this.state.allCategories){
			items.push(
					<DropdownItem onClick={this.changeValue} dropdownfor={forName} dropdownvalue={d}>{d}</DropdownItem>
			);
		}
		return items;
	}
	renderSubCategoryDropdown(){
		let items = [];
		for (let d of this.state.allSubCategories){
			items.push(
				<DropdownItem onClick={this.changeValue} dropdownfor="subCategorySel" dropdownvalue={d}>{d}</DropdownItem>
			);
		}
		return items;
	}
    dropdownToggle1(e) {
	  	  this.setState({
	      	dropdownOpen1: !this.state.dropdownOpen1
	    });
    }
    dropdownToggle2(e) {
	  	  this.setState({
	      	dropdownOpen2: !this.state.dropdownOpen2
	    });
    }
    dropdownToggle3(e) {
	  	  this.setState({
	      	dropdownOpen3: !this.state.dropdownOpen3
	    });
    }
 	onInputChange(event){
	    //console.log(this.state);
	    this.setState({
	      [event.target.name] : event.target.value
	    });
  	}
  	changeValue(e){
  		let dName =  e.currentTarget.getAttribute("dropdownfor");
  		let dVal = e.currentTarget.getAttribute("dropdownvalue");
  		this.setState({
  			[dName] : dVal
  		});
  	}
  	notify(type, alertMessage){
	    let options = {};
	    options = {
	      place: 'tc',
	      message: (
	        <div>
	          <div>
	            {alertMessage}
	          </div>
	        </div>
	      ),
	      type: type,
	      icon: "nc-icon nc-bell-55",
	      autoDismiss: 8
    };
    this.notificationAlert.current.notificationAlert(options);
  }
	render(){
		return (
			<div className="content wrapper-customize">
			<NotificationAlert ref={this.notificationAlert} />
				<Card body>
			        <CardTitle><h4>Add Room</h4></CardTitle>
			        <CardText><h6>Add Room to Hotel</h6></CardText>
			        <Row>
			        	<Col md="2">
			        		<div Style="padding:10px">
			        		 	<Input type="text" name="roomnum" placeholder="Room Number" value={this.state.roomnum} onChange={this.onInputChange}/>
			        		</div>
			        	</Col>
			        	<Col md="2">
			        		<div Style="padding:10px">
			        		 	<Input type="text" name="suite" placeholder="Suite" value={this.state.suite} onChange={this.onInputChange}/>
			        		</div>
			        	</Col>
			        	<Col>
			        		<Button onClick={this.addRoom}>Add</Button>
			        	</Col>
			        </Row>
		     	</Card>
		      	<Card body>
			        <CardTitle><h4>Create Service Category</h4></CardTitle>
			        <CardText><h6>Create Category for your Services</h6></CardText>
			        <Row>
			        	<Col md="4">
			        		<div Style="padding:10px">
			        		 	<Input type="text" name="CategoryText" placeholder="Enter Category Name" value={this.state.CategoryText} onChange={this.onInputChange}/>
			        		</div>
			        	</Col>
			        	<Col>
			        		<Button onClick={this.addCategory}>Add</Button>
			        	</Col>
			        </Row>
		     	</Card>
		      	<Card body>
			        <CardTitle><h4>Create Service Sub Category</h4></CardTitle>
			        <CardText><h6>Create Subcategory for a Service Category</h6></CardText>
			        <Row>
			        	<Col md="4">
			        		<div Style="padding:10px">
			        			<Input type="text" name="subCategoryText" placeholder="Enter Sub Category Name" value={this.state.subCategoryText} onChange={this.onInputChange}/>
			        		</div>
			        	</Col>
			        	<Col md="6">
				        		<Dropdown isOpen={this.state.dropdownOpen1} toggle={e => this.dropdownToggle1(e)}>
				        			<DropdownToggle caret>
				        				{this.state.CategorySel1 != null ? this.state.CategorySel1 : "Select Category"}
				        			</DropdownToggle>
				        			<DropdownMenu>
				        				{this.renderCategoryDropdown(1)}
				        			</DropdownMenu>
				        		</Dropdown>
			        	</Col>
			        	<Col>
			        		<Button onClick={this.addSubCategory}>Add</Button>
			        	</Col>
			        </Row>
		     	</Card>
		      	<Card body>
			        <CardTitle><h4>Add Item</h4></CardTitle>
			        <CardText><h6>Add Item to a Subcategory</h6></CardText>
			        <Row>
			        	<Col md="2">
			        		<div Style="padding:10px">
			        			<Input type="text" name="ItemText" placeholder="Item Name" value={this.state.ItemText} onChange={this.onInputChange}/>
			        		</div>
			        	</Col>
			        	<Col md="2">
			        		<div Style="padding:10px">
			        			<Input type="text" name="ItemPrice" placeholder="Item Price" value={this.state.ItemPrice} onChange={this.onInputChange}/>
			        		</div>
			        	</Col>
			        	<Col md="3">
			        		<Dropdown isOpen={this.state.dropdownOpen2} toggle={e => this.dropdownToggle2(e)}>
			        			<DropdownToggle caret>			 
			        				{this.state.CategorySel2 != null ? this.state.CategorySel2 : "Select Category"}
			        			</DropdownToggle>
			        			<DropdownMenu>
			        				{this.renderCategoryDropdown(2)}
			        			</DropdownMenu>
			        		</Dropdown>
			        	</Col>
			        	<Col md="3">
			        		<Dropdown isOpen={this.state.dropdownOpen3} toggle={e => this.dropdownToggle3(e)}>
			        			<DropdownToggle caret>
			        				{this.state.subCategorySel != null ? this.state.subCategorySel : "Select subCategory"}
			        			</DropdownToggle>
			        			<DropdownMenu>
			        				{this.renderSubCategoryDropdown()}
			        			</DropdownMenu>
			        		</Dropdown>
			        	</Col>
			        	<Col>
			        		<Button onClick={this.addItem}>Add</Button>
			        	</Col>
			        </Row>
		     	</Card>
			</div>
		);
	}
}

export default Services;