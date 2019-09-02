import React from 'react'
import { MDBTableBody, MDBIcon } from 'mdbreact'

export default function BuildTable(props) {
    let handleRemove = (id) => {
        props.handleRemove(id)
    }
    return (
            <MDBTableBody>
                {props.users.map((user, index) => {
                    return (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.place}</td>
                        <td>{user.phone}</td>
                        <td><a href="#!" className="trash-alt mr-3" onClick={() => {
                                handleRemove(user.id)
                            }}>
                            <MDBIcon  icon="trash-alt"/>
                            </a></td>
                    </tr>
                        )
                })}
            </MDBTableBody>
    )
}
