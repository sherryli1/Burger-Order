import React from 'react';
import Aux from'../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredient)
    .map(igKey => {
      return <li><span style={{textTranform:'capitalize'}}>{igKey}</span>:{props.ingredient[igKey]}</li>
    });
  return (
    <Aux>
      <h3>Your Order: </h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.orderCancel}>Cancel</Button>
      <Button btnType='Success' clicked={props.orderContinue}>Continue</Button>
    </Aux>

  );
};

export default orderSummary;
