
import React from 'react';
import { Row,Col,Card, CardHeader , CardBody,Form,FormGroup} from 'reactstrap';
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';
import { withRouter } from 'react-router-dom';

import axios from 'axios';


class BidListingItem extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            bidAmount : '',
        }
    }
    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value});
    }

    handleBid = event =>{
        event.preventDefault();
        let authToken = getAuthToken();
        let id = getUserId();
        axios.post("http://localhost:3030/api/buyer/addBid",{id,bid_amount:this.state.bidAmount,status:"waiting",buyer_id:id,prod_listing_id:this.props.user._id},getAuthHeader(authToken)).then(res => {
            this.props.bidsChanged();
            this.props.clearListing();
            }).catch(e=>{
                console.log(e);
            });
    }

    getProductName(id)
    {
        let prod = this.props.products.filter(value => value._id===id);
        if(prod.length>0)
            return prod[0].productname;
        return "";
    }

    render(){

        return(
            
            <Card className="shadow-lg mb-4">
                
                    <CardHeader className=" d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">Listing Id: {this.props.user._id}</h6>
                       
                        
                    </CardHeader>
                    <CardBody>
                        <p className="m-0">Status : <span className={this.props.user.status==="open"?"green":"red"}>{this.props.user.status}</span></p>
                        <p className="m-0">Product Name : {this.getProductName(this.props.user.product_id)}</p>
                        <p className="m-0">Minimum Price : {this.props.user.min_price}</p>
                        <p className="m-0">Quantity : {this.props.user.quantity}</p>
                        
                        <Form className="user" onSubmit={this.handleBid}>
                            <Row>
                                <Col>
                                    <FormGroup>
                        
                                    <input className="form-control form-control-user" 
                                    type="number"  
                                    step="0.01"
                                    min={this.props.user.min_price}
                                    placeholder="Enter Bidding Price" 
                                    name="bidAmount" 
                                    onChange={this.handleChange}
                                    value={this.state.bidAmount}
                                    required />
                                </FormGroup>
                                </Col>
                                <Col>
                                <button className="btn btn-success btn-block text-white btn-user" name="sub" type="submit">Place Bid</button>
                                </Col>
                                
                            </Row>
                            
                            
                        </Form>
                    </CardBody>
             
            </Card>
        );
    }
};

export default withRouter(BidListingItem);