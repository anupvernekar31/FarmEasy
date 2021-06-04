import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './App.css';
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/fontawesome-all.min.css';
import AdminPage from "./pages/adminpage/AdminPage";
import FarmerPage from "./pages/farmerpage/FarmerPage";
import LoginPage from './components/login/login';
import BuyerPage from './pages/buyerpage/BuyerPage';
import { getAuthToken, getUserId, getUserType } from './utils/Authorization';



class App extends React.Component{
  

  constructor(props){
    super(props);
    this.state = {
      authToken : '',
      id: '',
      type: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

}

  componentDidMount()
  {
    let authTokenSaved = getAuthToken();
    let type = getUserType();
    let idSaved = getUserId();
    if(authTokenSaved && idSaved && type){
       this.setState({id:idSaved,authToken:authTokenSaved,type:type});
    }
    else
      localStorage.clear();
    
  }

  handleLogout()
  {
    this.setState({
      authToken : '',
      id: ''
    });
  }

  handleLogin(id,authToken,type)
  {
    this.setState({id:id,authToken:authToken,type:type});
  }

  render(){
    return (
      <Switch>
            <Route exact path = '/' 
            render={()=>(this.state.authToken && this.state.authToken.length>0)?(this.state.type==="admin")?(<Redirect to='/admin' />):(this.state.type==="farmer")?(<Redirect to='/farmer' />):(this.state.type==="buyer")?(<Redirect to='/buyer' />):(<LoginPage handleLogin={this.handleLogin}/>):(<LoginPage handleLogin={this.handleLogin}/>)}/>
            <Route exact path = '/admin' render={()=>(<AdminPage handleLogout={this.handleLogout}/>)}/>
            <Route exact path = '/farmer' render={()=>(<FarmerPage handleLogout={this.handleLogout}/>)}/>
            <Route exact path = '/buyer' render={()=>(<BuyerPage handleLogout={this.handleLogout}/>)}/>
            
       </Switch>
    );
  }
};

export default App;
