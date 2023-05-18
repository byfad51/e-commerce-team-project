import { Table } from 'semantic-ui-react'
import {useEffect, useState} from "react";

function MyInformation() {
    const [user, setUser] = useState([])

    const username = localStorage.getItem("username");

    useEffect(() => {
        const getUserInfo = async () => {
            await fetch('http://localhost:8080/users/getUserByUsername?username=' + username)
                .then(response => response.json())
                .then(data => {
                    setUser(data)
                })
                .catch(error => console.error(error));
        }
        getUserInfo()

    }, []);
   console.log(user)

return (   <Table color={"teal"} key={"teal"} style={{borderWidth: 0}}>


    <Table.Body>
        <Table.Row>
            <Table.Cell>First name</Table.Cell>
            <Table.Cell>{user.firstname}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Last Name</Table.Cell>
            <Table.Cell>{user.lastname}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell>{user.active ? "On":"Off"}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Username</Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Address</Table.Cell>
            <Table.Cell>{user.address}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Number of Reviews</Table.Cell>
            <Table.Cell>{user.numberOfReviews}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Phone Number</Table.Cell>
            <Table.Cell>{user.phone}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Question for saving your account</Table.Cell>
            <Table.Cell>{user.question}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Registration Date</Table.Cell>
            <Table.Cell>{user.registrationDate}
            </Table.Cell>
        </Table.Row>
    </Table.Body>
    <label><h3>You are our number {user.id} member on our website. Thank you to you are with us.</h3></label>
</Table>);
}
export default MyInformation

/*


 */