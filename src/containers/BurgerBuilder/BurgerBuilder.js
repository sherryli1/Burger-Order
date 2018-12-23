import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component{
    constructor (props) {
      super(props);
      this.state = {
        ingredient: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
      };
    }

    updatePurchaseState (ingredient) {
      const sum = Object.keys(ingredient)
        .map(igKey => {
          return ingredient[igKey];
        })
        .reduce((sum,el) => {
          return sum + el;
        },0);
        console.log(sum)
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
      const oldCount = this.state.ingredient[type];
      const updatedCount = oldCount + 1;
      //state should be updated in an immutable way
      const updatedIngredient = {
        ...this.state.ingredient
      };
      updatedIngredient[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredient: updatedIngredient});
      this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredient[type];
      if(oldCount <= 0){
        return;
      }
      const updatedCount = oldCount - 1;
      //state should be updated in an immutable way
      const updatedIngredient = {
        ...this.state.ingredient
      };
      updatedIngredient[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({totalPrice: newPrice, ingredient: updatedIngredient});
      this.updatePurchaseState(updatedIngredient);
    }

    //Because the use of 'this' here so we have to use arrow function
    orderHandler = () => {
      this.setState({purchasing: true});
    }

    orderCancelHandler = () => {
      this.setState({purchasing: false});
    }
    orderContinueHandler = () => {
      alert('You Continue!');
    }

    render () {
      const disabledInfo = {
        ...this.state.ingredient
      };
      for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
      }
      return (
          <Aux>
            <Modal show={this.state.purchasing} modalclosed={this.orderCancelHandler}>
              <OrderSummary
                price={this.state.totalPrice}
                ingredient= {this.state.ingredient}
                orderCancel={this.orderCancelHandler}
                orderContinue={this.orderContinueHandler} />
            </Modal>
            <Burger ingredient= {this.state.ingredient}/>
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              ordered={this.orderHandler}
              purchasable={this.state.purchasable}
              price={this.state.totalPrice}/>
          </Aux>
      );
    }

}

export default BurgerBuilder;
