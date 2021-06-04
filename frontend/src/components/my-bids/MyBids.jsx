import React from 'react';
import { Container,  Spinner} from 'reactstrap';
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';

import axios from 'axios';
import MyBidsItem from "../my-bids-item/MyBidsItem";

class MyBids extends React.Component{
    constructor(props){
        super(props);
      
        this.deleteBid = this.deleteBid.bind(this);
       
    }

    

    deleteBid(bidId)
    {
        let authToken = getAuthToken();
        let id = getUserId();
        axios.post("http://localhost:3030/api/buyer/deleteBid",{id,bidId},getAuthHeader(authToken)).then(res => {
                this.props.bidsChanged();
              }).catch(e=>{
                console.log(e);
              });
        
    }


    render(){
        return(
            <Container className="bg-info p-3 shadow-lg">
                <Container className="container-fluid">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-light mb-0">My Bids</h3>
                    </div>
                </Container>
                <Container className="container-fluid mb-5 ">
                <div>
                {
                    this.props.bids.length>0?
                   this.props.bids.map(listing=>(
                    <MyBidsItem user={listing} deleteBid={this.deleteBid}/>
                   ))
                   :
                            (<div className="text-center"><Spinner color="primary"></Spinner></div>)  
                }
                </div>
                </Container>
            </Container>
        );
    }
};

export default MyBids;