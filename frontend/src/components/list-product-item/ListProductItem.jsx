
import React from 'react';
import { Card, CardHeader , CardBody, Form , FormGroup} from 'reactstrap';

import './ListProductsItem.css';



class ListProductsItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           newmsp:''
        }
       
    }
    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value});
    }
    handleDelete = event =>
    {
        event.preventDefault();
        this.props.deleteU(this.props.user._id);
    }
    handleMspChange= event=>
    {
        let msp = this.state.newmsp;
        event.preventDefault();
        this.props.editMsp(this.props.user._id,msp);
    }
    render(){
        console.log("here");
        return(
            <Card className="shadow-lg mb-4">
                
                    <CardHeader className=" d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">{this.props.user.productname}</h6>
                        <a href="" className="btn btn-danger btn-circle ml-1" onClick={this.handleDelete} role="button">
                            <i className="fas fa-trash text-white"></i>
                        </a>
                    </CardHeader>
                    <CardBody>
                        <p className="m-0">MSP : {this.props.user.msp}</p>
                        <Form className="user" onSubmit={this.handleMspChange}>
                            <FormGroup>
                                <input className="form-control form-control-user" 
                                type="number"  
                                step="0.01"
                                min="0"
                                placeholder="Enter New MSP" 
                                name="newmsp" 
                                onChange={this.handleChange}
                                value={this.state.newmsp}
                                required />
                            </FormGroup>
                            <button className="btn btn-primary btn-block text-white btn-user" name="sub" type="submit">Change MSP</button>
                            
                        </Form>
                    </CardBody>
             
            </Card>
        );
    }
};

export default ListProductsItem;