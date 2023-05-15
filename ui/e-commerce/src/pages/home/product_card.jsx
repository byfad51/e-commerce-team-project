import React, {useState} from 'react';
import {Button, Card, Icon, Image, Message} from "semantic-ui-react";

function HomeProductCard(props) {
   // const item =props.item
    return (
        <>
            <Card key={props.item.productName} >

                {props.item.imageUrl!== ""? <a href={"/detail?id="+ props.item.id}><Image  height="240" width="100%" src={props.item.imageUrl} /></a>:
                    <a href={"/detail?id="+ props.item.id}><Image  height="400"  width="100%" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}/></a>
                }

                    <Card.Content style={{

                        height: 80
                    }}>


                        <Card.Header><a href={"/detail?id="+ props.item.id} ><p style={{
                            lineHeight: "1.2",
                            maxHeight: "2.4em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",

                        }}>{props.item.productName}</p>
                        </a></Card.Header>
                        <Card.Meta>{props.item.authorName}</Card.Meta>

                    </Card.Content>

                <Card.Content extra>
                    <center>
                        <div>
                            <Icon fitted name='comment outline' size='large'/>
                            <span style={{ marginLeft: '5px' }}>{props.item.numberOfReviews}</span>
                            <span style={{ marginLeft: '10px' }} />
                            {(props.item.averageRating=== null || props.item.averageRating=== 0) ? null:
                                <><Icon fitted color='yellow' name='star' size='large' disabled/><span style={{ marginLeft: '5px' }}>{props.item.averageRating}</span></>}

                        </div>



                    </center>



                </Card.Content>

            </Card>
        </>
    );
}

export default HomeProductCard;
