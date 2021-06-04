import React from 'react';
import { Container, Row, Col , Card , CardBody, Form , FormGroup,Spinner} from 'reactstrap';
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';
import './AddUser.css';
import axios from 'axios';

class AddUser extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            userType: 'admin',
            contactNumber : '',
            email :'',
            id:'',
            msg:'',
            isSpinner:false,
            admin_username:'',
        }
        this.successfulAdd = this.successfulAdd.bind(this);
    }

    componentDidMount()
    {
        this.setState({id:getUserId(),admin_username:getUserId()});
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const data = this.state;
        console.log(getAuthHeader(getAuthToken()));
        this.setState({isSpinner:true});
         axios.post("http://localhost:3030/api/admin/addUser",data,getAuthHeader(getAuthToken())).then(res=>{
            if(res.status === 200) this.successfulAdd();
        }).catch(e=>{
            console.log(e);
        });
        
    }

    successfulAdd()
    {
        this.setState({
            username: '',
            password: '',
            contactNumber : '',
            email :'',
            msg:'Done',
            isSpinner:false,
        });
        this.props.adminChange();
    }


    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value});
    }

    render(){
        return(
            <div className="bg-warning p-0" >
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" lg="6" xl="6">
                            <Card className="shadow-lg o-hidden border-0 my-5">
                                <CardBody className="p-0">
                                    <Row>
                                        <Col lg="12">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h4 className="text-dark mb-4">Add New User</h4>
                                                </div>
                                                <Form className="user" onSubmit={this.handleSubmit} >
                                                    <FormGroup>
                                                        <label>User Type:</label>
                                                        <Row>
                                                            <Col>
                                                                <input
                                                                    type="radio"  
                                                                    name="userType" 
                                                                    value="admin"
                                                                    onChange={this.handleChange}
                                                                    checked={(this.state.userType==="admin")}
                                                                    required />
                                                                 <span style={{padding:'1rem'}}>Admin</span>
                                                            </Col>

                                                            <Col>
                                                                <input type="radio"  
                                                                    value="farmer"
                                                                    onChange={this.handleChange}
                                                                    name="userType" 
                                                                    checked={(this.state.userType==="farmer")}
                                                                    required />
                                                                <span style={{padding:'1rem'}}>Farmer</span>
                                                            </Col>

                                                            <Col>
                                                                <input type="radio"  
                                                                    value="buyer"
                                                                    onChange={this.handleChange}
                                                                    name="userType" 
                                                                    checked={(this.state.userType==="buyer")}
                                                                    required />
                                                                <span style={{padding:'1rem'}}>Buyer</span>
                                                            </Col>
                                                        </Row>
                                                        
                                                        
                                                       
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label>Username:</label>
                                                        <input className="form-control form-control-user" 
                                                        type="text"  
                                                        placeholder="Enter Username" 
                                                        name="username" 
                                                        onChange={this.handleChange}
                                                        value={this.state.username}
                                                        required />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label>Password:</label>
                                                        <input className="form-control form-control-user" 
                                                        type="password"
                                                        placeholder="Password" 
                                                        name="password" 
                                                        onChange={this.handleChange}
                                                        value={this.state.password}
                                                        required />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label>Email:</label>
                                                        <input className="form-control form-control-user" 
                                                        type="email"
                                                        placeholder="Email" 
                                                        name="email" 
                                                        onChange={this.handleChange}
                                                        value={this.state.email}
                                                        required />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label>Mobile No:</label>
                                                        <input className="form-control form-control-user" 
                                                        type="tel"
                                                        placeholder="Mobile Number" 
                                                        name="contactNumber" 
                                                        onChange={this.handleChange}
                                                        value={this.state.contactNumber}
                                                        required />
                                                    </FormGroup>
                                                    <button className="btn btn-primary btn-block text-white btn-user" name="sub" type="submit">Add User</button>
                                                    
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

export default AddUser;