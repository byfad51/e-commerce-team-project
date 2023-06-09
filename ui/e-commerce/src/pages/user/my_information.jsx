import {Segment, Table} from 'semantic-ui-react'
import {useEffect, useState} from "react";
import './sidebar_design.css';
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

return (  <Segment> <Table color={"teal"} key={"teal"} style={{borderWidth: 0}}>


    <Table.Body>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>First name</Table.Cell>
            <Table.Cell>{user.firstname}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Last Name</Table.Cell>
            <Table.Cell>{user.lastname}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Active</Table.Cell>
            <Table.Cell>{user.active ? "On":"Off"}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Username</Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Email</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Number of Reviews</Table.Cell>
            <Table.Cell>{user.numberOfReviews}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Phone Number</Table.Cell>
            <Table.Cell>{user.phone}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Role</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Question for saving your account</Table.Cell>
            <Table.Cell>{user.question}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell style={{fontWeight:'bold'}}>Registration Date</Table.Cell>
            <Table.Cell>{user.registrationDate}
            </Table.Cell>
        </Table.Row>
    </Table.Body>
</Table></Segment>);
}
export default MyInformation

/*


 */