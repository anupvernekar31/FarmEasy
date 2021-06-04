
import React from 'react';
import { Container, Spinner} from 'reactstrap';
import ListProductsItem from "../list-product-item/ListProductItem";
import axios from 'axios';
import { getAuthHeader, getAuthToken, getUserId } from '../../utils/Authorization';




class ListProducts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : ''
        }
        this.deleteU = this.deleteU.bind(this);
        this.editMsp = this.editMsp.bind(this);
    }

    deleteU(userId)
    {
        let id = getUserId();
        axios.post("http://localhost:3030/api/admin/deleteProduct",{id:id,productId:userId},getAuthHeader(getAuthToken())).then(res=>{
            this.props.productChange();
        }).catch(e=>{
            console.log(e);
        })
    }

    editMsp(userId,msp)
    {
        let id = getUserId();
        axios.post("http://localhost:3030/api/admin/editMsp",{id:id,productId:userId,msp:msp},getAuthHeader(getAuthToken())).then(res=>{
            this.props.productChange();
        }).catch(e=>{
            console.log(e);
        })
    }


    render(){
        return(
            <Container className="bg-white p-3 shadow-lg">
                <Container className="container-fluid">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-dark mb-0">Products</h3>
                    </div>
                </Container>
                <Container className="container-fluid mb-5 ">
                <div>
                {
    
                    this.props.products?
                        this.props.products.map(user=>(
                            (<ListProductsItem user={user} deleteU={this.deleteU} editMsp={this.editMsp}/>)
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

export default ListProducts;