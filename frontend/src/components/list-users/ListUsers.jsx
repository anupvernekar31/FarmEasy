import React from 'react';
import { Container, Row, Col , Button, Spinner} from 'reactstrap';
import ListUsersItem from "../list-users-item/ListUsersItem";
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';
import './ListUsers.css';
import axios from 'axios';


class ListUsers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userType : "admin",
            id : '',
        }
        this.deleteU = this.deleteU.bind(this);

    }

    deleteU(userId)
    {
     
            let authToken = getAuthToken();
            let id = getUserId();
            let type = this.state.userType;
            axios.post("http://localhost:3030/api/admin/deleteUser",{id,userType:type,userId:userId},getAuthHeader(authToken)).then(res => {
                this.props.adminChange();
               }).catch(e=>{
                  console.log(e);
               });

    }

    handleUserChange = event => {
        event.preventDefault();
        this.setState({userType:event.target.id});
    }


    render(){
        return(
            <Container className="bg-white p-3 shadow-lg">
                <Container className="container-fluid">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-dark mb-0">Users</h3>
                    </div>
                </Container>
                <Container className="container-fluid mb-5 ">
                <Row className="mb-2">
                    <Col>
                    <Button outline={this.state.userType!=="admin"} onClick={this.handleUserChange} id="admin" className="btn-name" color="danger">Admins</Button>
                    </Col>
                    <Col>
                    <Button outline={this.state.userType!=="farmer"} onClick={this.handleUserChange} id="farmer" className="btn-name" color="danger">Farmers</Button>
                    </Col>
                    <Col>
                    <Button outline={this.state.userType!=="buyer"} onClick={this.handleUserChange} id="buyer" className="btn-name" color="danger">Buyers</Button>
                    </Col>
                </Row>
                <div>
                {
                    this.state.userType==="admin"?
                        this.props.admins.length?
                            this.props.admins.map(user=>(
                                (<ListUsersItem user={user} deleteU={this.deleteU}/>)
                        ))
                        :
                            (<Spinner color="primary"></Spinner>)
                    :this.state.userType === "farmer"?
                        this.props.farmers.length?
                        this.props.farmers.map(user=>(
                            (<ListUsersItem user={user} deleteU={this.deleteU}/>)
                        ))
                        :
                            (<Spinner color="primary"></Spinner>)  
                    :   this.props.buyers?
                        this.props.buyers.map(user=>(
                            (<ListUsersItem user={user} deleteU={this.deleteU}/>)
                        ))
                        :
                            (<Spinner color="primary"></Spinner>)  
                }
                </div>
                </Container>
            </Container>
        );
    }
};

export default ListUsers;