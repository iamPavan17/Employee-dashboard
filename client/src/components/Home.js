import React, { Component } from 'react'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon} from "mdbreact";
    import { BrowserRouter as Router } from 'react-router-dom';

export class Home extends Component {

    render() {
        let date = new Date();
        let hours = date.getHours();
        
        return (
            <Router>
                <MDBNavbar color="black" dark expand="md">
                    <MDBNavbarBrand>
                    <h3 className="white-text pl-4" style={{fontFamily: 'Libre Caslon Display'}}><span><MDBIcon icon="users" />  </span> USER's REPOSITORY</h3>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3"  navbar>
                    <MDBNavbarNav right className='pr-5'>
                        <MDBNavItem>
                        <MDBNavLink to="/home">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className='pl-2'>
                        <MDBNavLink to='/users' onClick={() => {
                            this.props.history.push('/users')
                        }}>Users</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavLink to='' style={{color: 'white'}} className='pl-3' onClick={() => {
                                localStorage.setItem('name', null);
                                this.props.history.push('/login')
                            }}><MDBIcon icon="sign-out-alt" /></MDBNavLink>
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <br></br><br></br>
                <MDBContainer className="mt-5 text-center">
                    <MDBRow>
                        <MDBCol>
                        <MDBJumbotron>
                            {hours > 0 && hours < 12? <h2 className="h1 display-3"><MDBIcon icon="sun" /> Good Morning!!!</h2>: hours >= 12 && hours <= 17 ? <h2 className="h1 display-3"><MDBIcon icon="sun" /> Good Afternoon!!!</h2>: <h2 className="h1 display-3"><MDBIcon icon="cloud-sun" /> Good Evening!!!</h2>}
                            <p className="lead">
                            Sembilan boringen welvaart er of prestige planters. Nauwelijks zit van had kongostaat verwachten beschaving ingesneden. Ter ton woud als oude dal daad.
                            </p>
                            <hr className="my-2" />
                            <p>
                            It uses utility classes for typgraphy and spacing to space content out
                            within the larger container.
                            </p>
                            <p className="lead">
                            <MDBBtn color="elegant">Learn More</MDBBtn>
                            </p>
                        </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                    <p>Built using <MDBIcon fab icon="node-js" /> <MDBIcon fab icon="react" /></p>
                </MDBContainer>
            </Router>  
        )
    }
}

export default Home
