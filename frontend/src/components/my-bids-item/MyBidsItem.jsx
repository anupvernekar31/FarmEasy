
import React from 'react';
import { Card, CardHeader , CardBody} from 'reactstrap';

import './MyBidsItem.css';

class MyListingItem extends React.Component{
    handleDelete = event =>
    {
        event.preventDefault();
        this.props.deleteBid(this.props.user._id);
    }

  
    render(){

        return(
            
            <Card className="shadow-lg mb-4">
                
                    <CardHeader className=" d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">Bid Id: {this.props.user._id}</h6>
                        {
                            this.props.user.status==="waiting"?
                            (
                                <a href="" className="btn btn-danger btn-circle ml-1" onClick={this.handleDelete} role="button">
                                <i className="fas fa-trash text-white"></i>
                            </a>
                            ):null
                        }
                        
                    </CardHeader>
                    <CardBody>
                        <p className="m-0">Status : <span className={this.props.user.status==="accepted"?"green":this.props.user.status==="waiting"?"yellow":"red"}>{this.props.user.status}</span></p>
                        <p className="m-0">Bid Amount : {this.props.user.bid_amount}</p>
                        <p className="m-0">Listing Id : {this.props.user.prod_listing_id}</p>
                    </CardBody>
             
            </Card>
        );
    }
};

export default MyListingItem;