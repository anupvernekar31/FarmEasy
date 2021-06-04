
import React from 'react';
import { Card, CardHeader , CardBody,Row,Col} from 'reactstrap';
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';

import axios from 'axios';
import './ListingBidsItem.css';

class ListingBidsItem extends React.Component{

    handleReject = event =>
    {
        event.preventDefault();
        let authToken = getAuthToken();
        let id = getUserId();
        let bidId = this.props.user._id;
        axios.post("http://localhost:3030/api/farmer/rejectBid",{id,bidId},getAuthHeader(authToken)).then(res => {
                this.props.bidsChanged();
            }).catch(e=>{
                console.log(e);
            });

    }

    handleAccept =async event =>
    {
        event.preventDefault();
        let authToken = getAuthToken();
        let id = getUserId();
        let bidId = this.props.user._id;
        const ded = this;
        
        axios.post("http://localhost:3030/api/farmer/acceptBid",{id,bidId},getAuthHeader(authToken)).then(res => {
           ded.props.bidsChanged();    
            }).catch(e=>{
                console.log(e);
            });

    }

    render(){
        return(
            
            <Card className="shadow-lg mb-4">
                
                    <CardHeader className=" d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">Bid Id: {this.props.user._id}</h6>
                        
                    </CardHeader>
                    <CardBody>
                        <p className="m-0">Status : <span className={this.props.user.status==="accepted"?"green":this.props.user.status==="waiting"?"yellow":"red"}>{this.props.user.status}</span></p>
                        <p className="m-0">Bid Amount : {this.props.user.bid_amount}</p>
                        <p className="m-0">Listing Id : {this.props.user.prod_listing_id}</p>
                        {
                            this.props.user.status!=="accepted"?
                            (
                                <Row>
                                    <Col>
                                        <button className="btn btn-success btn-block text-white btn-user" onClick={this.handleAccept}>Accept Bid</button>
                                    </Col>
                                    <Col>
                                        <button className="btn btn-danger btn-block text-white btn-user" onClick={this.handleReject}>Reject Bid</button>
                                    </Col>
                                </Row>
                            ):null
                        }
                        
                    </CardBody>
             
            </Card>
        );
    }
};

export default ListingBidsItem;