import React from 'react';
import { Card, CardBody, CardImg, CardTitle } from "shards-react";
import "../pages/styles.css"

// Jump to search recipe page based on the keyword
function goToMatch(keyword) {
    window.location = `/getRecipeCards?name=${keyword}`
}


// Card type that has image of the recipe and recipe name
const PopularSearches = (props) => {
    return (
        <div onClick={() => goToMatch(props.item.keyword)}>
            <Card style={{ marginTop: '2vh', maxWidth: "300px" }}>
                <CardImg top src={props.item.imageURL} referrerpolicy="no-referrer" alt={null} style={{ width: "300px", height: "200px" }} />
                <CardBody>
                    <CardTitle>{props.item.imageName}</CardTitle>
                </CardBody>
            </Card>
        </div>
    )
}
export default PopularSearches