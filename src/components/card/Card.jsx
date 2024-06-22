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
                <div className={classes.card}>
                    <img src={props.picLocation} alt="" className={classes.cardImage}/>
                    <div className={classes.cardName}>
                        <div className={classes.row1}>
                            <div className={classes.name}>
                                <h3>{props.name}</h3>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
                        </div>
                        <div>
                            <Link to={props.linkTo} className={classes.cardLink} target="_blank" rel="noopener noreferrer">
                                <button onClick={handleClick}>Visit Here</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

Card.defaultProps ={

    linkTo: "https://github.com/Nieru24",
    // picLocation: "https://placehold.co/400x225",
    picLocation: "https://i.postimg.cc/XYL1F4r7/girl-smile-glasses-1082169-1600x1200.jpg",
    description: "- Pellentesque habitant morbi tristique senectus <br/>- et netus et malesuada fames ac turpis egestas. <br/>- No description",
    name: "No name"
}

export default Card
