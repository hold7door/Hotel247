import React from 'react';
import {NavBar} from './loginPage';

class SignUpBox extends React.Component{
    render(){
        return (
            <div className="sign-up-box">
                <h1>Sign Up</h1>
                
                <div class="textbox">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <input type="text" class="form-control" placeholder="Name" name="" value="" style={{color:'black'}} />
                </div>
                <div class="textbox">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <input type="text" class="form-control" placeholder="E-mail" name="" value="" style={{color:'black'}} />
                </div>

                <div class="textbox">
                    <i class="fa fa-registered" aria-hidden="true"></i>
                    <input type="text" class="form-control" placeholder="Registration Certificate Number" name="" value="" style={{color: 'black'}} />
                </div>
                <div class="textbox">
                    <i class="fa fa-square" aria-hidden="true"></i>
                    <input type="text" class="form-control" placeholder="Hotel Name" name="" value="" style={{color: 'black'}} />
                </div>
                <div class="textbox">
                    <i class="fa fa-address-book-o" aria-hidden="true"></i>
                    <input type="text" class="form-control" placeholder="Full Address" name="" value="" style={{color: 'black'}} /> 
                </div>
                <div class="textbox">
                    <i class="fa fa-address-book" aria-hidden="true"></i>
                    <input type="text" class="form-control" placeholder="City/State" name="" value="" style={{color: 'black'}} />		
                </div>

                <input class="btn-sign" type="button" name="" value="Register" />

	        </div>
        );
    }
}

class SignUpMain extends React.Component{
    render(){
        return(
            <div className="sign-up-main">
                <NavBar />
                <SignUpBox />
            </div>
        );
    }
}

export default SignUpMain;