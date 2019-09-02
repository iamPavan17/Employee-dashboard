import React, { Component } from 'react'
import { MDBBtn, MDBRow, MDBCol, MDBInput, MDBJumbotron} from "mdbreact";

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            email: '',
            place: '',
            phone: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            place: this.state.place,
            employeeName: JSON.parse(localStorage.getItem('name'))
        }
        this.props.handleSubmit(formData)
    }


    render() {
        return (
            <div>
                <MDBJumbotron>
                    <h5 className="h5 display-4">Add User</h5>
                    <form className='pl-4 pr-4' onSubmit={this.handleSubmit}>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBInput label="Enter first name" type='text' name='firstName' outline background size="sm" onChange={this.handleChange}/>
                                <MDBInput label="Enter last name" type='text' name='lastName' outline background size="sm" onChange={this.handleChange}/>
                                <MDBInput label="Enter age" name='age' type='number' min='0' outline background size="sm" onChange={this.handleChange}/>
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBInput label="Enter email" name='email' type='email' outline background size="sm" onChange={this.handleChange}/>
                                <MDBInput label="Enter phone number" name='phone' type='text' outline background size="sm" onChange={this.handleChange}/>
                                <MDBInput label="Enter place" name='place' type='text' outline background size="sm" onChange={this.handleChange}/>
                            </MDBCol>
                            <MDBCol md="">
                                <MDBBtn color='dark' type='submit'>Submit</MDBBtn>
                                <MDBBtn type="reset" color='dark' >Reset</MDBBtn>
                            </MDBCol>
                        </MDBRow>     
                    </form>
                </MDBJumbotron>
            </div>
        )
    }
}

export default Form
