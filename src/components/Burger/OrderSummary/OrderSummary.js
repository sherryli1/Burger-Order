import React,{ Component }from 'react';
import Aux from'../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
  //This could be a functional component, doesn't have to be a class
  //To check whether the component was updated when need
  // componentWillUpdate(){
  //   console.log('[OrderSummary will update]')
  // }
  render () {
    const ingredientSummary = Object.keys(this.props.ingredient)
      .map(igKey => {
        return <li key={igKey}><span style={{textTranform:'capitalize'}}>{igKey}</span>:{this.props.ingredient[igKey]}</li>
      });
    return(
      <Aux>
        <h3>Your Order: </h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.orderCancel}>Cancel</Button>
        <Button btnType='Success' clicked={this.props.orderContinue}>Continue</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
