import React from 'react'
import {Link} from 'react-router-dom'
import classes from './Card.module.css'

function Card(props) {
    const handleClick = () => {
        console.log(`Clicked on ${props.linkTo}`);
      };
    
      return (
        <div className='main-content'>
            <div className={classes.cardContainer}>
                <Link to={props.linkTo} className={classes.cardLink}>
                <div className={classes.card} onClick={handleClick}>
                    <img src={props.picLocation} alt="" className={classes.cardImage}/>
                    <h3 className={classes.cardName}>{props.name}</h3>
                </div>
                </Link>
            </div>
        </div>
      );
}

Card.defaultProps ={

    linkTo: "/home",
    // picLocation: "https://placehold.co/400x225",
    picLocation: "https://i.postimg.cc/XYL1F4r7/girl-smile-glasses-1082169-1600x1200.jpg",
    name: "No name"
}

export default Card
