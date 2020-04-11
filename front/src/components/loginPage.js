import React, { createRef } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'; 

class NavBar extends React.Component{
    render(){
        return (
            <div className = "nav-container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Hotel247</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Mission</a>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                </nav>
            </div>
        );
    }
}
class LoginBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : null,
            password : null,
            redirectTo : null
        };
        this.errRef = createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        axios({
            method : 'post',
            url : "/auth/login",
            responseType : 'json',
            data : {
                username : this.state.username,
                password : this.state.password,
            }
        }).then((response) => {
            if (response.status === 200){
                console.log('Received');
                this.setState({
                    redirectTo : '/'
                });
                this.props.afterLogIn();
            }
        }).catch(err => {
            console.log("login error");
            this.errRef.current.style.visibility = "visible";
            console.log(err);
        });
    }
    render(){
  /*       if (this.state.redirectTo){
            this.props.afterLogIn();
        }
        else{ */
            return (
                <div className="login-box">
                    <h1>Login</h1>
                    <form className="login-form">
                        <div className="textbox">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} required/>
                        </div>

                        <div className="textbox">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} req/>
                        </div>
                        <div className="error-ref" >
                            <span ref={this.errRef}>Incorrect Username/Password</span>
                        </div>
                        <button className="btn-sign" type="submit" onClick={this.handleSubmit}>SignIn</button>
                    </form>
                    <div className="text-center">
                        <span className="txt1">
                            Forgot
                        </span>

                        <a href="#" className="txt2 hov1">
                             Username / Password?
                        </a>
                    </div>

                    <div className="text-center">
                        <span className="txt1">
                             Create an account?
                        </span>

                        <a href="/signup" className="txt2 hov1">
                             Sign up
                        </a>
                    </div>
                </div>
            );
        //}
    }
}
class LoginMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : false,
            username : null
        };
        this.onLogin = this.onLogin.bind(this);
    }
    onLogin(){
        this.props.redirectAfterLogin();
    }
    render() {
        return (
            <div className="login-page">
                <NavBar />

                <LoginBox afterLogIn={this.onLogin}/>
            </div>
        );
    }
}

export {
    LoginMain,
    NavBar
};