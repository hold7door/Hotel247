import React from 'react';
import {LoginMain} from './components/loginPage';
import SignUpMain from './components/signup';
import axios from 'axios';

import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/css/paper-dashboard.css";
import "assets/css/newstyles.css";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";

const history = createBrowserHistory();

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated : false,
            managerId : null,
            managerOfHotel : null,
            userLoggedIn : false
        };
        this.redirectLogin = this.redirectLogin.bind(this);
        this.deauthenticate = this.deauthenticate.bind(this);
        this.checkAuth = this.checkAuth.bind(this);   
    }
    componentDidMount(){
        this.checkAuth();
    }
    checkAuth(){
        axios({
            method : 'get',
            url : '/isAuth',
            responseType : 'json'
        }).then((response) => {
            //console.log(response);
            if (response.data.user){
                console.log('User logged in');
                this.setState({ 
                    isAuthenticated : true, 
                    managerId : response.data.user._id, 
                    managerOfHotel : response.data.user.managerOfHotel, 
                    userLoggedIn : true
                });
            }
            else{
                this.setState({
                    isAuthenticated : false,
                    managerId : null,
                    managerOfHotel : null,
                    userLoggedIn : false
                });
            }
        });
    }
    redirectLogin(){
        this.checkAuth();
    }
    deauthenticate(){
        this.setState({
            isAuthenticated : false,
            managerId : null,
            managerOfHotel : null
        });
    }
    render(){
        if (this.state.isAuthenticated){
            return (
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path='/' render={
                                    (props)=> 
                                <Dashboard {...props} logoutDeauthenticate={this.deauthenticate} managerId={this.state.managerId} hotelId={this.state.managerOfHotel}
                                />
                                }
                            />
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
                            <Route path='/admin' render={
                                (props)=> 
                                <Dashboard {...props} logoutDeauthenticate={this.deauthenticate} managerId={this.state.managerId} hotelId={this.state.managerOfHotel}
                                />
                                }
                            />
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
                        <Route exact path='/login' render={
                                (props)=> 
                                <Login {...props} redirectLogin={this.redirectLogin}/>
                        }/>
                        <Route exact path='/signup' component={SignUpPage} />
                        <Route path='/admin'>
                                <Redirect to={{
                                    pathname:"/"
                                }}/>
                            </Route>
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
    }
    render(){
        return (
            <div className="login-page-main">
                <LoginMain redirectAfterLogin={this.props.redirectLogin}/>
            </div>
        );
    }
}

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.logoutRedirect = this.logoutRedirect.bind(this);
    }
    logoutRedirect(){
        this.props.logoutDeauthenticate();
    }
    render(){
        //console.log(this.props);
        return (
            <div className="dashboard-main">
                <Router history={history}>
                    <Switch>
                    <Route path="/admin" render={props => <AdminLayout {...props} {...this.props} logoutRedirectFunction={this.logoutRedirect}/>} />
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