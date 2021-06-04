import React from 'react';
import { Container, Row, Col , Card , CardBody, Form , FormGroup,Spinner} from 'reactstrap';
import { getUserId ,getAuthHeader,getAuthToken} from '../../utils/Authorization';
import './BidProduct.css';
import axios from 'axios';
import BidListingItem from '../bid-listing-item/BidListingItem';

class BidProduct extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isSpinner:false,
            id:'',
            productname:'',
            listings:[],
            msg:''
        }

        this.getListings = this.getListings.bind(this);
        this.clearListing = this.clearListing.bind(this);
    }



    handleSubmit = async event =>{
        event.preventDefault();
        if(this.props.products.length>0 && this.state.productname==="")
            this.setState({productname:this.props.products[0]._id},()=>{
                this.getListings();
            });
        else
        {
            this.getListings();
        }
        
    }

    clearListing()
    {
        this.setState({listings:[],msg:"Bid Placed"})
    }

    getListings(){
        let authToken = getAuthToken();
        let id = getUserId();
        this.setState({isSpinner:true});
        axios.post("http://localhost:3030/api/buyer/getListings",
        {id:id,
        productId:this.state.productname},
        getAuthHeader(authToken)).then(res => {
            this.setState({isSpinner:false,listings:res.data})
           }).catch(e=>{
              console.log(e);
              this.setState({isSpinner:false});
           });
    }
    componentDidMount()
    {
        this.setState({id:getUserId()});
        if(this.props.products.length>0)
            this.setState({productname:this.props.products[0]._id});
       
    }



    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value},this.getMsp);
    }
   

    render(){
        return(
            <div className="bg-danger fullPage" >
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" lg="6" xl="6">
                            <Card className="shadow-lg o-hidden border-0 my-5">
                                <CardBody className="p-0">
                                    <Row>
                                        <Col lg="12">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h4 className="text-dark mb-4">Search Listings</h4>
                                                </div>
                                                <Form className="user" onSubmit={this.handleSubmit} >
                                                    <FormGroup>
                                                        <label>Select Product:</label>
                                                        <select className="form-control" name="productname" value={this.state.productname} onChange={this.handleChange}>
                                                            {
                                                                this.props.products.map(product => (
                                                                    <option value={product._id}>{product.productname} at MSP of Rs.{product.msp}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </FormGroup>
                                                    
                                                   
                                                    <button className="btn btn-primary btn-block text-white btn-user" name="sub" type="submit">Search Listings</button>
                                                    
                                                </Form>
                                                <div className="text-center" color='red'></div>
                                                <div className="text-center" style={{color:"green"}}>{(this.state.msg)}</div>
                                                {
                                                this.state.isSpinner?
                                                (<div className="text-center mt-1" ><Spinner color="primary" /></div>):null
                                            }
                                            </div>

                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    {
                        this.state.listings.length>0?
                        (
                                            <Container className="bg-info p-3 shadow-lg">
                                <Container className="container-fluid">
                                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                                        <h3 className="text-light mb-0">Listings Available</h3>
                                    </div>
                                </Container>
                                <Container className="container-fluid mb-5 ">
                                <div>
                                {
                                    this.state.listings.length>0?
                                this.state.listings.map(listing=>(
                                    <BidListingItem user={listing} clearListing={this.clearListing} products={this.props.products} bidsChanged={this.props.bidsChanged}/>
                                ))
                                :
                                            (<div className="text-center"><Spinner color="primary"></Spinner></div>)  
                                }
                                </div>
                                </Container>
                            </Container>
                        ):null
                    }

                </Container>
            </div>
            );
        }
    };

export default BidProduct;