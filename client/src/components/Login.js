import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'
import { MDBInput, MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import SweetAlert from 'react-bootstrap-sweetalert'

import axios from 'axios';

export class Login extends Component {
    constructor() {
        super() 
        this.state = {
            username: '',
            password: '',
            isLogin: false,
            error: '',
            hideAlert: false        
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost:3050/login';
        axios.post(url, this.state)
        .then(response => {
            this.setState({ isLogin: response.data.isLogin, error: response.data.error});
            if(this.state.error) {
                this.setState({hideAlert: true})
            }
            let name = JSON.parse(localStorage.getItem('name')) || []
            name[0] = (response.data.name);
            localStorage.setItem('name', JSON.stringify(name));
        })
    }

    render() {
        return (
            <MDBContainer className='text-center container pt-5' style={{marginTop:'8%'}}>
                <MDBRow>
                    <MDBCol md="4">
                    {this.state.hideAlert && <SweetAlert danger confirmBtnBsStyle='dark' title="Username/Password is incorrect!!" onConfirm={() => {
                        this.setState({hideAlert: false})
                    }} />}
                    </MDBCol>
                    <MDBCol md="4">
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <MDBInput label='Username' type='text' name='username' placeholder='username' onChange={this.handleChange} background size="lg" required/>
                            <MDBInput label='Password' type='password' name='password' placeholder='password' onChange={this.handleChange} background size="lg" required/>
                            <MDBBtn type='submit' color='dark'> LOGIN </MDBBtn>
                        </form>

                        {this.state.isLogin ? <Redirect to='/home'/> : <p></p>}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Login
