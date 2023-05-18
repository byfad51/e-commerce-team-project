import {useEffect, useState} from "react";
import {Button, List} from "semantic-ui-react";

function MyReviews() {
    const [userReviews, setUserReviews] = useState([])
    const [showHowManyReview, setShowHowManyReview] = useState(10)

    useEffect(() => {
        const getReviews = async () => {
            await fetch('http://localhost:8080/reviews/getUserReviews/' + localStorage.getItem("currentUser"),{
                headers: {
                    Authorization: localStorage.getItem("tokenKey")
                }
            })
                .then(response => response.json())
                .then(data => setUserReviews(data))
                .catch(error => console.error(error));
        }
        getReviews()

    }, []);
console.log(userReviews)
const listItem = (item) => {
   return ( <List.Item>
       <List.Icon name='github' size='large' verticalAlign='middle' />
       <List.Content>
           <List.Header as='a'><a href={"detail?id="+item.id}>{item.content}</a></List.Header>
           <List.Description as='a'><a href={"detail?id="+item.id}>{item.createdDate}</a></List.Description>
       </List.Content>
   </List.Item>)
}
return (<List divided relaxed>
    <>{userReviews.slice(0,showHowManyReview).map((item)=> (
        listItem(item)
    ))}<>{showHowManyReview < userReviews.length ? <Button onClick={()=>setShowHowManyReview(showHowManyReview+5)}>Show More</Button>:null}</></>
</List>);
}
export default MyReviews;