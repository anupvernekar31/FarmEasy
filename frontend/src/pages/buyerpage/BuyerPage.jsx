import React from 'react';
import AdminHeader from "../../components/admin-header/AdminHeader";
import NavigationSideBar from '../../components/navigation/Navigation';
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import BidProduct from '../../components/bid-product/BidProduct';
import MyBids from '../../components/my-bids/MyBids';

class BuyerPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nav : [{key:"1",active:true, name:'New Bid'},{key:"2",active:false, name:'My Biddings'}],
            currentPage:"1",
            user:'',
            products:[],
            bids:[],
        }
        this.logout = this.logout.bind(this);
        this.getBids = this.getBids.bind(this);
       
    }

    getBids()
    {
        let authToken = getAuthToken();
        let id = getUserId();
        axios.post("http://localhost:3030/api/buyer/getBids",{id},getAuthHeader(authToken)).then(res => {
            this.setState({bids:res.data});
           }).catch(e=>{
              console.log(e);
           });
    }

    getProducts()
    {
        let authToken = getAuthToken();
        let id = getUserId();
        axios.post("http://localhost:3030/api/buyer/getAllProducts",{id},getAuthHeader(authToken)).then(res => {
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
             axios.post("http://localhost:3030/api/buyer/getUser",{id},getAuthHeader(authToken)).then(res => {
                this.setState({user:res.data});
              }).catch(e=>{
                  localStorage.clear();
                  this.props.handleLogout();
                history.push('/');
              });
              this.getProducts();
              this.getBids();
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
                    (
                        <BidProduct products={this.state.products} bidsChanged={this.getBids}/>
                    )
                    :(
                        <MyBids bids={this.state.bids} bidsChanged={this.getBids}/>
                    )
                }
                
              
            </div>
           
        </div>
        );
    }
};

export default withRouter(BuyerPage);