import React from 'react';
import { Container, Row, Col , Card , CardBody, Form , FormGroup,Spinner} from 'reactstrap';
import { getUserId ,getAuthHeader,getAuthToken} from '../../utils/Authorization';
import './AddProduct.css';
import axios from 'axios';

class AddProduct extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            productname: '',
            isSpinner:false,
            msp : '',
            id:''
        }
    }



    handleSubmit = async event =>{
        event.preventDefault();
        const data = this.state;
        this.setState({isSpinner:true});
         axios.post("http://localhost:3030/api/admin/addProduct",data,getAuthHeader(getAuthToken())).then(res=>{
            if(res.status === 200) this.successfulAdd();
        }).catch(e=>{
            console.log(e);
        });
    }
    componentDidMount()
    {
        this.setState({id:getUserId()});
    }

    successfulAdd()
    {
        this.setState({isSpinner:false});
        this.props.productChange();
    }


    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value});
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
                                                    <h4 className="text-dark mb-4">Add New Product</h4>
                                                </div>
                                                <Form className="user" onSubmit={this.handleSubmit} >
                                                    <FormGroup>
                                                        <label>Product Name:</label>
                                                        <input className="form-control form-control-user" 
                                                        type="text"  
                                                        placeholder="Enter Product Name" 
                                                        name="productname" 
                                                        onChange={this.handleChange}
                                                        value={this.state.productname}
                                                        required />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label>MSP:</label>
                                                        <input className="form-control form-control-user" 
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        placeholder="MSP" 
                                                        name="msp" 
                                                        onChange={this.handleChange}
                                                        value={this.state.msp}
                                                        required />
                                                    </FormGroup>
                                                    <button className="btn btn-primary btn-block text-white btn-user" name="sub" type="submit">Add Product</button>
                                                    
                                                </Form>
                                                <div className="text-center" color='red'></div>
                                                <div className="text-center" color='green'></div>
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

export default AddProduct;