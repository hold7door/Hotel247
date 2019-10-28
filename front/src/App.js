import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginMain from './components/loginPage';
import DashboardMain from './components/dashboard';
import axios from 'axios';

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
            console.log("this was called");
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
                <DashboardMain />
            </div>
        );
    }
}

export default App;