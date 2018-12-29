import React from 'react';
import classes from './Order.css';

const Order = (props) => {
  const ingredient = [];
  for(let ingredientName in props.ingredient){
    ingredient.push({
      name: ingredientName,
      amount: props.ingredient[ingredientName]
    });
  }
  let ingredientOutput = ingredient.map(ig => {
    return <span
            style={{textTransform:'capitalize',
                    display: 'inline-block' ,
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'}}
            key={ig.name}>{ig.name}({ig.amount})</span>
  })
  return (<div className={classes.Order}>
    <p>Ingredient:{ingredientOutput}</p>
    <p>Price: <strong>USD{props.price.toFixed(2)}</strong></p>
  </div>
)
};

export default Order;
