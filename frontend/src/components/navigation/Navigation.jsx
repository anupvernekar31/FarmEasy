import React from 'react';
import { NavItem,Navbar,Container} from 'reactstrap';
import './navigation.scss';


class NavigationSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftOpen: false
    }
  }

  toggleSidebar = (event) => {
    let key = `${event.currentTarget.parentNode.id}Open`;
    this.setState({ [key]: !this.state[key] });
  }

  closeSidebar = (event) =>
  {
    this.setState({leftOpen: false});
  }

  render() {
    let leftOpen = this.state.leftOpen ? 'open' : 'closed';
 

    return (
      <div id='layout' onScroll={this.closeSidebar}>

          <div id='left' className={leftOpen} >
              <div className='icon'
                   onClick={this.toggleSidebar} >
                   &equiv;
              </div>
              <div className={`sidebar ${leftOpen}`} >
                  <div className='header'>
                    <h3 className='title'>
                      {this.props.navtitle}
                    </h3>
                  </div>
                  <div className='content' >
                  <Navbar class="navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
                    <Container class="container-fluid d-flex flex-column p-0">
                        <ul class="nav navbar-nav text-light" id="accordionSidebar">
                            {
                                this.props.navitems.map(navitem=>(
                                    <NavItem role="presentation"><a class={(navitem.key===this.props.currentPage)? "nav-link active":"nav-link"} href="" id={navitem.key} onClick={this.props.handleMenuClick}><i class={navitem.icon} id={navitem.key}></i><span id={navitem.key}>{navitem.name}</span></a></NavItem>
                                ))
                            }
                            {/* icon format */}
                            {/* "fas fa-envelope-open-text" */}
                        </ul>
                    </Container>
                </Navbar>
                  </div>
              </div>
          </div>

          

      </div>
    );
  }
}

export default NavigationSideBar;