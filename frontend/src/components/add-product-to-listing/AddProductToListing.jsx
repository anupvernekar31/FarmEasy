import React from 'react';
import { Container, Row, Col , Card , CardBody, Form , FormGroup,Spinner} from 'reactstrap';
import { getUserId ,getAuthHeader,getAuthToken} from '../../utils/Authorization';
import './AddProductToListing.css';
import axios from 'axios';

class AddProductToListing extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isSpinner:false,
            id:'',
            productname:'',
            quantity: '',
            curMsp:0,
            minPrice:'',
            msg:''
        }
    }



    handleSubmit = async event =>{
        event.preventDefault();
        let authToken = getAuthToken();
        let id = getUserId();
        this.setState({isSpinner:true});
        axios.post("http://localhost:3030/api/farmer/addListing",
        {id:id,
        product_id:this.state.productname,
        status:'open',
        min_price:this.state.minPrice,
        farmer_id:id,
        quantity:this.state.quantity},
        getAuthHeader(authToken)).then(res => {
            this.setState({isSpinner:false,msg:'Listed Successfully'})
           }).catch(e=>{
              
              console.log(e.response);

              this.setState({isSpinner:false});
           });
    }
    componentDidMount()
    {
        this.setState({id:getUserId()});
       
    }



    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value},this.getMsp);
    }
   
    

    getMsp()
    {
        let cur = this.state.productname;
        let msps = this.props.products.filter(value => value._id===cur);
        if(msps.length>0)
            this.setState({curMsp:msps[0].msp});
        else
            this.setState({curMsp:0});
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
                                                    <h4 className="text-dark mb-4">List product</h4>
                                                </div>
                                                <Form className="user" onSubmit={this.handleSubmit} >
                                                    <FormGroup>
                                                        <label>Select Product:</label>
                                                        <select className="form-control" name="productname" value={this.state.productname} onChange={this.handleChange}>
                                                            {
                                                                this.props.products.map(product => (
                                                                    <option value={product._id} key={product._id}>{product.productname} at MSP of Rs.{product.msp}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label>Quantity :</label>
                                                        <input className="form-control form-control-user" 
                                                        type="number"
                                                        min="0"
                                                        placeholder="Quantity in Kgs" 
                                                        name="quantity" 
                                                        onChange={this.handleChange}
                                                        value={this.state.quantity}
                                                        required />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label>Minimum Price :</label>
                                                        <input className="form-control form-control-user" 
                                                        type="number"
                                                        min={this.state.curMsp}
                                                        placeholder="Enter minimum price expected (Greater than or equal to msp)" 
                                                        name="minPrice" 
                                                        onChange={this.handleChange}
                                                        value={this.state.minPrice}
                                                        required />
                                                    </FormGroup>
                                                   
                                                    <button className="btn btn-primary btn-block text-white btn-user" name="sub" type="submit">Add Product</button>
                                                    
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
            </div>
            );
        }
    };

export default AddProductToListing;