import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
          cheese: 1,
          meat: 0
        },
        totalPrice: 4
      };
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
            <Burger ingredient= {this.state.ingredient}/>
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              price={this.state.totalPrice}/>
          </Aux>
      );
    }

}

export default BurgerBuilder;
