import React from 'react';
import AdminHeader from "../../components/admin-header/AdminHeader";
import NavigationSideBar from '../../components/navigation/Navigation';
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import AddProductToListing from '../../components/add-product-to-listing/AddProductToListing';
import MyListing from '../../components/my-listings/MyListings';

class FarmerPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nav : [{key:"1",active:true, name:'List a Product'},{key:"2",active:false, name:'My Listings'}],
            currentPage:"1",
            user:'',
            products:[],
        }
        this.logout = this.logout.bind(this);
    
       
    }
    getProducts()
    {
        let authToken = getAuthToken();
        let id = getUserId();
        axios.post("http://localhost:3030/api/farmer/getAllProducts",{id},getAuthHeader(authToken)).then(res => {
            this.setState({products:res.data});
           }).catch(e=>{
              console.log(e);
           });
    }

    

    componentDidMount()
    {
        const {history} = this.props;
        let authToken = getAuthToken();
        let id = getUserId();
        if(id && authToken)
        {
             axios.post("http://localhost:3030/api/farmer/getUser",{id},getAuthHeader(authToken)).then(res => {
                this.setState({user:res.data});
              }).catch(e=>{
                  localStorage.clear();
                  this.props.handleLogout();
                history.push('/');
              });
              this.getProducts();
        }
        else
        {
            history.push('/');
        }
       
    }



  

    handleMenu = event =>{
        event.preventDefault();
        this.setState({currentPage:event.target.id});
    
    }

    logout()
    {
        const {history} = this.props;
        localStorage.clear();
        this.props.handleLogout();
      history.push('/');
    }

    render(){
        return(
        <div >
            <NavigationSideBar navitems={this.state.nav} navtitle="FarmEasy" handleMenuClick={this.handleMenu} currentPage={this.state.currentPage}/>
            <div className="d-flex flex-column" id="content-wrapper">
                <AdminHeader userName={(this.state.user)?this.state.user.username:"Loading"} handleLogout={this.logout}/>
                {
                    this.state.currentPage==="1"?
                    (<AddProductToListing products={this.state.products}/>)
                    :(<MyListing products={this.state.products}/>)
                }
                
            </div>
           
        </div>
        );
    }
};

export default withRouter(FarmerPage);