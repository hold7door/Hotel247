import React from 'react';
import axios from 'axios';
import {NavBar} from './loginPage';
import {
    Row,
    Col
} from 'reactstrap';

class SignUpBox extends React.Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleRegister(event){
        event.preventDefault();
        axios({
            method : 'post',
            url : '/newreq',
            responseType : 'json',
            data : {
                Email : this.refs.emailInput.value,
                Cert : this.refs.certInput.value,
                HotelName : this.refs.hotelNameInput.value,
                Address : this.refs.addressInput.value,
                City : this.refs.cityInput.value,
                State : this.refs.stateInput.value,
                Pin : this.refs.pinInput.value,
            }
        }).then((response) => {
            if (response.status === 200){
                console.log("Register request sent");
                //console.log(response.data);
                this.props.redirectSuccessHandler();
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    render(){
        return (
            <div className="sign-up-box border-left border-right rounded">
                <Row>
                    <Col md={{ size : 6, offset : 3 }}>
                        
                    <div Style="width:50%;margin-left:30%">
                                <h1>Sign Up</h1>
                            </div>
                        <form className="reg-form" method="post" onSubmit={this.handleRegister}>
                            <div class="textbox">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                                <input type="text" ref="emailInput" class="form-control" placeholder="E-mail" name="email"  style={{color:'black'}} required/>
                            </div>

                            <div class="textbox">
                                <i class="fa fa-registered" aria-hidden="true"></i>
                                <input type="text" ref="certInput" class="form-control" placeholder="Registration Certificate Number" name="cert" style={{color: 'black'}} required/>
                            </div>
                            <div class="textbox">
                                <i class="fa fa-square" aria-hidden="true"></i>
                                <input type="text" ref="hotelNameInput" class="form-control" placeholder="Hotel Name" name="hotelName" style={{color: 'black'}} required/>
                            </div>
                            <div class="textbox">
                                <i class="fa fa-address-book-o" aria-hidden="true"></i>
                                <input type="text" ref="addressInput" class="form-control" placeholder="Full Address" name="address"  style={{color: 'black'}} required/> 
                            </div>
                            <div class="textbox">
                                <i class="fa fa-address-book" aria-hidden="true"></i>
                                <input type="text" ref="cityInput" class="form-control" placeholder="City" name="city"  style={{color: 'black'}} required/>		
                            </div>
                            <div class="textbox">
                                <i class="fa fa-address-book" aria-hidden="true"></i>
                                <input type="text" ref="stateInput" class="form-control" placeholder="State" name="state"  style={{color: 'black'}} required/>		
                            </div>
                            <div class="textbox">
                                <i class="fa fa-address-book" aria-hidden="true"></i>
                                <input type="text" ref="pinInput" class="form-control" placeholder="Pin Code" name="pin"  style={{color: 'black'}} required/>		
                            </div>
                            <div Style="width:20%;margin-left:40%">
                                <input class="btn-sign" type="submit" name="" value="Register" />
                            </div>
                        </form>
                    </Col>
                </Row>

	        </div>
        );
    }
}

class SignUpMain extends React.Component{
    constructor(props){
        super(props);
        this.redirectHandler = this.redirectHandler.bind(this);
    }
    redirectHandler(){
        this.props.redirectSuccess();
    }
    render(){
        return(
            <div className="sign-up-main">
                <NavBar />
                <SignUpBox redirectSuccessHandler={this.redirectHandler} />
            </div>
        );
    }
}

export default SignUpMain;