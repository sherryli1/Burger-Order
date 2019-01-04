import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

//Establish a new arrar for looping
const control = [
  {label: 'Salad', type: 'salad'},
  {label: 'Meat', type: 'meat'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'}
];
const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {control.map(contr => {
        return <BuildControl
                  key={contr.label}
                  label={contr.label}
                  added={() => props.ingredientAdded(contr.type)}
                  removed={() => props.ingredientRemoved(contr.type)}
                  disabled={props.disabled[contr.type]}/>
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'Sign In To Order'}</button>
    </div>
  );
};

export default buildControls;
