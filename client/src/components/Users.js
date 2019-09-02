import React, { Component } from 'react'
import Form from './Form'
import BuildTable from './BuildTable'
import PickyDateTime from 'react-picky-date-time';
import axios from 'axios'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBIcon, MDBNotification } from "mdbreact";
    import { BrowserRouter as Router } from 'react-router-dom';

export class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            showPickyDateTime: true    
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3050/users')
        .then(response => {
            this.setState({ users: response.data })
            // console.log(response.data)
        })
    }

    handleSubmit(formData) {
        this.setState(prevState => ({
            users: [...prevState.users, formData]
        }))
        axios.post('http://localhost:3050/user', formData)
        .then(response => {
            console.log('Data sent!!!')
        })
    }

    handleRemove(id) {
        let filteredUsers = this.state.users.filter(user => {
            return user.id !== id;
        })
        this.setState({ users: filteredUsers })
        axios.post('http://localhost:3050/user-remove', {id})
        .then(response => {
            console.log('User removed!!')
        })
    }

    render() {
        let notification = () => {
            let name = JSON.parse(localStorage.getItem('name'))
            let count = this.state.users.filter(user => {
                return user.employeeName[0] === name[0]
            })
            return `Hi ${JSON.parse(localStorage.getItem('name'))}, your user count is ${count.length}`
        }
        return (
            <div>
                <Router>
                    <MDBNavbar color="black" dark expand="md">
                        <MDBNavbarBrand>
                        <h3 className="white-text pl-4">Welcome {JSON.parse(localStorage.getItem('name'))}!</h3>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse} />
                        <MDBCollapse id="navbarCollapse3"  navbar>
                        <MDBNavbarNav right className='pr-5'>
                            <MDBNavItem>
                            <MDBNavLink to="/home" onClick={() => {
                                this.props.history.push('/home')
                            }}>Home</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className='pl-2'>
                            <MDBNavLink to='/users' > Users</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavLink to='' style={{color: 'white'}} className='pl-3' onClick={() => {
                                localStorage.setItem('name', null);
                                this.props.history.push('/login')
                            }}><MDBIcon icon="sign-out-alt"/></MDBNavLink>
                        </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </Router>

                <MDBContainer className="mt-5 text-center">
                    <MDBRow>
                        <MDBCol md="9">
                            <Form handleSubmit={this.handleSubmit} handleRemove={this.handleRemove}/>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBNotification
                                iconClassName="text-primary"
                                show
                                fade
                                icon="bell"
                                title="Notification"
                                message={notification()}
                                text=""
                            />
                            {this.state.showPickyDateTime && <PickyDateTime
                            size="xs"
                            mode={2}
                            locale="en-us"
                            show={true}
                            onClose={() =>this.setState({ showPickyDateTime: false })}
                            onYearPicked={res => this.onYearPicked(res)}
                            onMonthPicked={res => this.onMonthPicked(res)}
                            onDatePicked={res => this.onDatePicked(res)}
                            onResetDate={res => this.onResetDate(res)}
                            onResetDefaultDate={res => this.onResetDefaultDate(res)}
                            onSecondChange={res => this.onSecondChange(res)}
                            onMinuteChange={res => this.onMinuteChange(res)}
                            onHourChange={res => this.onHourChange(res)}
                            onMeridiemChange={res => this.onMeridiemChange(res)}
                            onResetTime={res => this.onResetTime(res)}
                            onResetDefaultTime={res => this.onResetDefaultTime(res)}
                            onClearTime={res => this.onClearTime(res)}
                            />}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol className='pt-3'>
                            <h2 align='left'>List of Users</h2>
                            <MDBTable striped hover className='pt-5'>
                                <MDBTableHead color="dark" textWhite>
                                    <tr>
                                        <th>#</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Email</th>
                                        <th>Age</th>
                                        <th>Place</th>
                                        <th>Phone</th>
                                        <th></th>
                                    </tr>
                                </MDBTableHead>

                                <BuildTable users={this.state.users} handleRemove={this.handleRemove}/>

                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default Users
