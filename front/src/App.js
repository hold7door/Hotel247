import React from 'react';
import {LoginMain} from './components/loginPage';
import SignUpMain from './components/signup';
import axios from 'axios';

import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/css/paper-dashboard.css";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";

const hist = createBrowserHistory();

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated : false,
            username : null
        };
    }
    componentDidMount(){
        axios({
            method : 'get',
            url : '/isAuth',
            responseType : 'json'
        }).then((response) => {
            console.log(response);
            if (response.data.user){
                console.log('User logged in');
                this.setState({ isAuthenticated : true, username : response.data.user.username});
            }
            else{
                this.setState({
                    isAuthenticated : false,
                    username : null
                });
            }
        });
    }
    render(){
        if (this.state.isAuthenticated){
            return (
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path='/' component={Dashboard}/>
                            <Route exact path='/login'>
                                <Redirect to={{
                                    pathname:"/"
                                }}/>
                            </Route>
                            <Route exact path='/signup'>
                                <Redirect to={{
                                    pathname:"/"
                                }}/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            );
        }
        else{
            return (
                <Router>
                    <div className="App">
                        <Switch>
                        <Route exact path='/' >
                        <Redirect to={{
                                pathname:"/login",
                                //state : {from : }
                            }}/>
                        </Route>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/signup' component={SignUpPage} />
                        </Switch>
                    </div>
                </ Router>
            );
        }
    }
}

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userLoggedIn : false
        };
        this.redirectLogin = this.redirectLogin.bind(this);
    }
    redirectLogin(){
        this.setState({
            userLoggedIn : true
        });
    }
    render(){
        if (this.state.userLoggedIn){
            //console.log("this was called");
            return <Dashboard />
        }
        else{
            return (
                <div className="login-page-main">
                    <LoginMain redirectAfterLogin={this.redirectLogin}/>
                </div>
            );
        }
    }
}

class Dashboard extends React.Component{
    render(){
        return (
            <div className="dashboard-main">
                <Router history={hist}>
                    <Switch>
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                    <Redirect to="/admin/dashboard" />
                    </Switch>
                </Router>,
            </div>
        );
    }
}

class SignUpPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requestSuccess : false
        };
        this.redirectAfterRequest = this.redirectAfterRequest.bind(this);
    }
    redirectAfterRequest(){
        this.setState({
            requestSuccess : true
        });
    }
    render(){
        if (this.state.requestSuccess){
            return (<Redirect to = {'/'} />);
        }
        else {
            return (
                <div className="sign-up-page" >
                    <SignUpMain redirectSuccess={this.redirectAfterRequest}/>
                </div>
            );
        }
    }
}

export default App;