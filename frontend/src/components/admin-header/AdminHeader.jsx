import React from 'react';
import { Navbar , Container,Nav,NavItem} from 'reactstrap';
import './AdminHeader.css';

class AdminHeader extends React.Component{
  

    render(){
        return(
            <Navbar className="navbar-light navbar-expand bg-white shadow mb-0 topbar static-top">
                
                    <Container className="container-fluid">
                        <Nav className=" navbar-nav flex-nowrap ml-auto">
                            <div className="d-none d-sm-block topbar-divider" />
                           <NavItem role="presentation">
                               <a className="navbar-brand">{this.props.userName} </a>
                            </NavItem>
                            
                            <NavItem role="presentation">
                                <a className="btn btn-primary btn-icon-split"  onClick={this.props.handleLogout} role="button"><span class="text-white-50 icon"><i class="fas fa-lock"></i></span><span class="text-white text">Logout</span></a>
                            </NavItem>
                        </Nav>
                    </Container>
                </Navbar>
        );
    }
};

export default AdminHeader;
                