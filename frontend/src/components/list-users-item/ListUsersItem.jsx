
import React from 'react';
import { Card, CardHeader , CardBody} from 'reactstrap';



class ListUsersItem extends React.Component{
    handleDelete = event =>
    {
        event.preventDefault();
        this.props.deleteU(this.props.user._id);
    }
    render(){
        return(
            <Card className="shadow-lg mb-4">
                
                    <CardHeader className=" d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">{this.props.user.username}</h6>
                        <a href="" className="btn btn-danger btn-circle ml-1" onClick={this.handleDelete} role="button">
                            <i className="fas fa-trash text-white"></i>
                        </a>
                    </CardHeader>
                    <CardBody>
                        <p className="m-0">Email : {this.props.user.email}</p>
                    </CardBody>
             
            </Card>
        );
    }
};

export default ListUsersItem;