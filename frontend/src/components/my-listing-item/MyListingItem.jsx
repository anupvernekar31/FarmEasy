
import React from 'react';
import { Card, CardHeader , CardBody,Container} from 'reactstrap';
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';

import axios from 'axios';

import './MyListingItem.css';
import ListingBidsItem from '../listing-bids-item/ListingBidsItem';

class MyListingItem extends React.Component{
    handleDelete = event =>
    {
        event.preventDefault();
        this.deleteListing(this.props.user._id);
        this.getBids = this.getBids.bind(this);
    
        
    }

    getBids(id)
    {
        let prod = this.props.myBids.filter(value => value.prod_listing_id===id);
        return prod;
    }

    getProductName(id)
    {
        let prod = this.props.products.filter(value => value._id===id);
        if(prod.length>0)
            return prod[0].productname;
        return "";
    }
    deleteListing(listingId)
    {
        let authToken = getAuthToken();
        let id = getUserId();
        axios.post("http://localhost:3030/api/farmer/deleteListing",{id,listingId},getAuthHeader(authToken)).then(res => {
                this.props.listingChanged();
            }).catch(e=>{
                console.log(e);
            });
    }



    render(){

        return(
            
            <Card className="shadow-lg mb-4">
                
                    <CardHeader className=" d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">Listing Id: {this.props.user._id}</h6>
                        {
                            this.props.user.status==="open"?
                            (
                                <a href="" className="btn btn-danger btn-circle ml-1" onClick={this.handleDelete} role="button">
                                <i className="fas fa-trash text-white"></i>
                            </a>
                            ):null
                        }
                        
                    </CardHeader>
                    <CardBody>
                        <p className="m-0">Status : <span className={this.props.user.status==="open"?"green":"red"}>{this.props.user.status}</span></p>
                        <p className="m-0">Product Name : {this.getProductName(this.props.user.product_id)}</p>
                        <p className="m-0">Minimum Price : {this.props.user.min_price}</p>
                        <p className="m-0">Quantity : {this.props.user.quantity}</p>
                        <Container className="bg-info p-3 shadow-lg">
                            <Container className="container-fluid">
                                <div className="d-sm-flex justify-content-between align-items-center mb-4">
                                    <h3 className="text-light mb-0">Bids</h3>
                                </div>
                            </Container>
                            <Container className="container-fluid mb-5 ">
                            <div>
                            {
                                this.getBids(this.props.user._id).length>0?
                                this.getBids(this.props.user._id).map(listing=>(
                                <ListingBidsItem key={listing._id} user={listing} bidsChanged={this.props.bidsChanged}/>
                            ))
                            :
                                        (<div className="text-center">No Bids</div>)  
                            }
                            </div>
                            </Container>
                        </Container>
                    </CardBody>
             
            </Card>
        );
    }
};

export default MyListingItem;